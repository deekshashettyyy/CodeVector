import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name : {
            type : String, 
            required : true,
            trim : true
        },
        category : {
            type : String,
            required : true,
            trim : true
        },
        price : {
            type : Number,
            required : true,
        }
    },
    {
        timestamps : true
    }
);

// w/o category
productSchema.index({
    createdAt: -1,
    _id: -1
});

// with category
productSchema.index({
    category: 1,
    createdAt: -1,
    _id: -1
});

export const Product = mongoose.model("Product", productSchema)