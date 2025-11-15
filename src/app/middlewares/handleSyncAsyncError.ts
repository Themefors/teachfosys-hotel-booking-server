import { Server } from "http";

const handleSyncAsyncError = (server: Server) => {
  server.on("error", (err) => {
    console.error("Server error:", err);
    process.exit(1);
  });

  // While normally closing the server, it will stop other services and then shut down gracefully
  process.on("SIGINT", () => {
    server.close(() => {
      console.log("Server closed gracefully.");
      process.exit(0);
    });
  });

  // Syncronous errors
  process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    process.exit(1); // exit the app with failure
  });

  // Asyncronous errors
  process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
    process.exit(1);
  });
};

export default handleSyncAsyncError;
