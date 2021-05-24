import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        default: 0
    }
});

export const Ingredient = mongoose.model("Ingredient", ingredientSchema);
