import { Product } from "../models/product.models.js";
import connectDB from "../config/db.js";
import mongoose from "mongoose";

const seedProducts = async () => {

    try{

        // step 1 - connect to db
        await connectDB();

        // step 2 - delete existing products in db
        await Product.deleteMany({});

        // step 3 - create category list
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
       
        // step 4 - pick random category from array
        // step 5 - define price range
        // step 6 - define product obj
        // step 7 - push in array

        const products = [];
        const TOTAL_PRODUCTS = 200000;
        const BATCH_SIZE = 5000;

        for(let i=1; i<=TOTAL_PRODUCTS; i++)
        {   
            const randomIndex = Math.floor(Math.random() * categories.length);
            const randomCategory = categories[randomIndex];
            const randomPrice = Math.floor(Math.random() * 100000) + 100;

            const product = {
                name : `Product ${i}`,
                category : randomCategory,
                price : randomPrice
            }

            products.push(product);

            if(products.length === BATCH_SIZE)
            {
                // insert in mongo as [] = 5000
                await Product.insertMany(products);
                console.log(`${i} products inserted...`);
                
                //clear array
                products.length = 0;
            }
        }

        // processing if prods remains in [] - final partial batch processing
        if(products.length > 0)
        {
            await Product.insertMany(products);
        }   
        
        console.log("Seeding completed successfully!");
    } 
    catch(error)
    {
        console.log(error);
        process.exit(1);
    } 
    finally 
    {
        await mongoose.disconnect();
        console.log("MongoDB disconnected.");
    }
}

seedProducts();