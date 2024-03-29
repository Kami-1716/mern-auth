import { connectDB } from "./db/index.js";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.error("Server error", err);
    });

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection error", err);
  });
