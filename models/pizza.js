import mongoose from "mongoose";

const pizzaSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    veg: {
        type: Boolean,
        default: false
    }
});

export const Pizza = mongoose.model("Pizza", pizzaSchema);
