import { Product } from "../models/product.models.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
    try{
        // read cursor
        const { cursorCreatedAt, cursorId, category } = req.query;

        //create empty query obj
        let query = {};

        if (category) 
        {
            query.category = category;
        }

        if (cursorCreatedAt && cursorId) {
            query.$or = [
                        {
                            createdAt: {
                                $lt: new Date(cursorCreatedAt)
                            }
                        },
                        {
                            createdAt: new Date(cursorCreatedAt),
                            _id: {
                                $lt: new mongoose.Types.ObjectId(cursorId)
                            }
                        }
                    ]
            }

        // sort by newest first
        // Product.find({}) - return [] of all objects in db 
        // products = []

        const PAGE_SIZE = 10;

        const products = await Product.find(query)
        .sort({ 
            createdAt: -1,
            _id: -1
        })
        .limit(PAGE_SIZE + 1);

        // lastProduct of array
        const hasMore = products.length > PAGE_SIZE;

        // 11 products - 1 pop - get last 10th prod
        if (hasMore) 
        {
            products.pop();
        }

        const lastProduct = products[products.length - 1];

        const nextCursor = lastProduct
        ? {
            cursorCreatedAt: lastProduct.createdAt,
            cursorId: lastProduct._id
        }
        : null;

        res.json({
            success: true,
            products,
            nextCursor,
            hasMore
        });
    }
    catch(error)
    {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};