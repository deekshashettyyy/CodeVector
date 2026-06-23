import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Routes
import productRouter from "./routes/product.routes.js"

app.use("/api/v1/products", productRouter);

// http://localhost:8000/api/v1/products/  --> getProducts controller run

export default app;