import mongoose from "mongoose";
import { dbName } from "../constants.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONG0DB_URI}/${dbName}`);

    console.log(
      `\n MongoDB Connected!! Connection host: ${conn.connection.host}`
    );
  } catch (error) {
    console.error(`Error in connecting the database`);
    process.exit(1);
  }
};

export { connectDB };
