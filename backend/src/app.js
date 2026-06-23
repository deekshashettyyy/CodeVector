import express from "express";

const app = express();


// Routes
import productRouter from "./routes/product.routes.js"

app.use("/api/v1/products", productRouter);

// http://localhost:8000/api/v1/products/  --> getProducts controller run

export default app;