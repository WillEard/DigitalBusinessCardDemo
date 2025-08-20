import { useLayoutEffect, useRef, useCallback, useState } from "react";
import Lenis from "lenis";
import "../../styles/react-bits/ScrollStack.css";

export const ScrollStackItem = ({ children, itemClassName = "", style = {}, ...props }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()} style={style}>
    {children}
  </div>
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
  rotationAmount = 0,
  blurAmount = 0,
  onStackComplete,
  style = {}
}) => {
  const [visible, setVisible] = useState(true); // 👈 controls mounting

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

      // Scale, rotation, blur, etc.
      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const scale = 1 - scaleProgress * (1 - (baseScale + i * itemScale));
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        cardsRef.current.forEach((c, j) => {
          const jTrigger = c.offsetTop - stackPos - itemStackDistance * j;
          if (scrollTop >= jTrigger) topCardIndex = j;
        });
        if (i < topCardIndex) blur = Math.max(0, (topCardIndex - i) * blurAmount);
      }

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
        translateY,
        scale,
        rotation,
        blur,
      };

      card.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale}) rotate(${rotation}deg)`;
      card.style.filter = blur > 0 ? `blur(${blur}px)` : "";

      // ✅ Trigger removal when last card lands
      if (i === cardsRef.current.length - 1) {
        const inView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (inView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
      
          // Fade out & remove
          const fadeOutDelay = 2000; // ms
          const fadeOutDuration = 500; // ms
      
          setTimeout(() => {
            if (scrollerRef.current) {
              scrollerRef.current.style.transition = `opacity ${fadeOutDuration}ms`;
              scrollerRef.current.style.opacity = 0;
      
              setTimeout(() => setVisible(false), fadeOutDuration);
            }
          }, fadeOutDelay);
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

  // 👇 remove element from DOM after 3s
  if (!visible) return null;

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef} style={style}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" style={{ height: `${spacerHeight}px` }}  />
      </div>
    </div>
  );
};

export default ScrollStack;
