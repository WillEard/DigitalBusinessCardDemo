// src/config/cors.js
export const getCorsOptions = () => {
  const allowedOrigins =
    process.env.NODE_ENV === "production"
      ? ["https://www.pelagopass.com"]
      : ["http://localhost:5173", "http://localhost:3000"];

  return {
    origin: (origin, callback) => {
      // Allow requests without origin (like Postman or server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  };
};

export const getSecurityHeaders = () => {
  return {
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Embedder-Policy": "require-corp",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
  };
};
