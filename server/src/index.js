// src/index.js
import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./config/database.js";
import { config, validateConfig } from "./config/environment.js";

const startServer = async () => {
  try {
    // Validate environment variables
    validateConfig();

    // Connect to database
    await connectDB();

    // Start server
    app.listen(config.port, () => {
      console.log(`\n✓ Server running on port ${config.port}`);
      console.log(`✓ Environment: ${config.nodeEnv}`);
      console.log(`✓ Frontend URL: ${config.frontendUrl}\n`);
    });
  } catch (error) {
    console.error("✗ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
