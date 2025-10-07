import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    connectDB();
    app.listen(port, () => console.log(`App is listening at ${port}`));
  } catch (e) {
    console.error("❌ Failed to start server:", e.message);
    process.exit(1);
  }
};

startServer();
