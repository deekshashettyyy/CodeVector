// insert 50 more products

import connectDB from "../config/db.js";
import { Product } from "../models/product.models.js";
import mongoose from "mongoose";

const addProducts = async () => {
    try {
        await connectDB();

        const categories = [
                            "Laptop",
                            "Phone",
                            "Watch",
                            "Camera",
                            "Headphones",
                            "Books",
                            "Shoes",
                            "Tablet"
                        ];

        const products = [];

        for (let i = 1; i <= 50; i++) {

            const randomCategory = categories[
                Math.floor(Math.random() * categories.length)
            ];

            products.push({
                name: `New Product ${Date.now()}-${i}`,
                category: randomCategory,
                price: Math.floor(Math.random() * 100000) + 100
            });
        }

        await Product.insertMany(products);

        console.log("50 new products inserted.");
    }
    catch (error) {
        console.log(error);
    }
    finally {
        await mongoose.disconnect();
    }
};

addProducts();