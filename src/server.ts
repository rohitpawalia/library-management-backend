import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import connectDB from "./config/database";

const PORT = 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`First Server running on port ${PORT}`);
});