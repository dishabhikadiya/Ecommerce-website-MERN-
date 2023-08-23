const dotenv = require("dotenv").config();
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");

connectDatabase();
// handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log("shutting down the server due to unhandled uncaught Exception");
  process.exit(1);
});

//  config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "../.env" });
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// dotenv.config({ path: "../.env" });
const app = require("./app");

const server = app.listen(process.env.PORT, () => {
  console.log(`server is working on http://localhost:${process.env.PORT}`);
});
// unhandeled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log("shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
