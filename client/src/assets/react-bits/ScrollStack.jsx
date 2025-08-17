import { useLayoutEffect, useRef, useCallback } from "react";
import Lenis from "lenis";
import "../../styles/react-bits/ScrollStack.css";

export const ScrollStackItem = ({ children, itemClassName = "", style = {}, ...props }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()} style={style}>{children}</div>
);

const ScrollStack = ({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "15%",
  scaleEndPosition = "5%",
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  onStackComplete,
}) => {
  const scrollerRef = useRef(null);
  const cardsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const animationFrameRef = useRef(null);
  const lenisRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const isUpdatingRef = useRef(false);

  let spacerHeight = 0;

  // Utility to convert percentage strings to pixel values
  const parsePercentage = useCallback((value, containerHeight) => {
    return typeof value === "string" && value.includes("%")
      ? (parseFloat(value) / 100) * containerHeight
      : parseFloat(value);
  }, []);

  // Returns a 0-1 progress ratio between start and end scroll positions
  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const updateCardTransforms = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;
    const scrollTop = scroller.scrollTop;
    const containerHeight = scroller.clientHeight;
    const stackPos = parsePercentage(stackPosition, containerHeight);
    const scaleEndPos = parsePercentage(scaleEndPosition, containerHeight);
    const endElement = scroller.querySelector(".scroll-stack-end");
    const endElementTop = endElement?.offsetTop || 0;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = card.offsetTop;
      const prevCard = i > 0 ? cardsRef.current[i - 1] : null;
      const prevCardEnd = prevCard
        ? prevCard.offsetTop - stackPos + prevCard.offsetHeight
        : 0;

      const triggerStart = prevCardEnd;
      const triggerEnd = cardTop - scaleEndPos;
      const pinStart = triggerStart;
      const pinEnd = endElementTop - containerHeight / 2;

      // Scale and rotation
      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const scale = 1 - scaleProgress * (1 - (baseScale + i * itemScale));
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      // Blur effect
      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        cardsRef.current.forEach((c, j) => {
          const jTrigger = c.offsetTop - stackPos - itemStackDistance * j;
          if (scrollTop >= jTrigger) topCardIndex = j;
        });
        if (i < topCardIndex) blur = Math.max(0, (topCardIndex - i) * blurAmount);
      }

      // Vertical translation
      const lastCard = cardsRef.current[cardsRef.current.length - 1];
      const lastCardBottom = lastCard.offsetTop + lastCard.offsetHeight;
      const scrollerBottom = scrollTop + containerHeight;

      let translateY = 0;
      if (scrollerBottom >= lastCardBottom) {
        translateY = lastCardBottom - cardTop - containerHeight + stackPos + itemStackDistance * i * 0.6;
      } else if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        translateY = scrollTop - cardTop + stackPos + itemStackDistance * i * 0.6;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPos + itemStackDistance * i * 0.6;
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const changed =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (changed) {
        card.style.transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        card.style.filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : "";
        lastTransformsRef.current.set(i, newTransform);
      }

      // Check for stack completion
      if (i === cardsRef.current.length - 1) {
        const inView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (inView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!inView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    calculateProgress,
    parsePercentage,
  ]);

  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const lenis = new Lenis({
      wrapper: scroller,
      content: scroller.querySelector(".scroll-stack-inner"),
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
      gestureOrientationHandler: true,
      normalizeWheel: true,
      wheelMultiplier: 1,
      touchInertiaMultiplier: 35,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: 0.075,
      touchInertia: 0.6,
    });

    lenis.on("scroll", handleScroll);

    const raf = (time) => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);

    lenisRef.current = lenis;
    return lenis;
  }, [handleScroll]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll(".scroll-stack-card"));
    cardsRef.current = cards;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) card.style.marginBottom = `${itemDistance}px`;
      Object.assign(card.style, {
        willChange: "transform, filter",
        transformOrigin: "top center",
        backfaceVisibility: "hidden",
        transform: "translateZ(0)",
        perspective: "1000px",
      });
    });

    setupLenis();
    updateCardTransforms();

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      lenisRef.current?.destroy();
      stackCompletedRef.current = false;
      cardsRef.current = [];
      lastTransformsRef.current.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    setupLenis,
    updateCardTransforms,
  ]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" style={{ height: `${spacerHeight}px` }} />
      </div>
    </div>
  );
};

export default ScrollStack;