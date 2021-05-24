import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    custId: {
        type: String,
        required: true
    },
    toppings: {
        type: Array,

    },
    meat: {
        type: String

    },
    sauce: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        type: String,
        required: true
    }
});

export const Order = mongoose.model("Order", orderSchema);
