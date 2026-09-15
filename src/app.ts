import express from "express";
import bookRoutes from "./routes/bookRoutes";
import errorMiddleware from "./middleware/errorMiddleware";
import cors from 'cors';
import aiRoutes from "./routes/aiRoutes";

const app = express();
app.use(cors());

app.use(express.json());

app.use(bookRoutes);
app.use(aiRoutes);
app.use(errorMiddleware);

export default app;