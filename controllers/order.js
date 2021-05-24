import { Order } from '../models/order.js';
import { TOKEN_SECRET } from "./user.js"
import jwt from "jsonwebtoken";


export const createOrder = async (req, res) => {
    console.log(req.body)
    const { custId, name, base, toppings, meat, sauce, price, status } = req.body;

    const decoded = jwt.verify(custId, TOKEN_SECRET)
    let newOrder = new Order({ custId: decoded.email, name, base, toppings, meat, sauce, price, status });

    newOrder.save()
        .then((newOrder) => {
            console.log(newOrder)
            res.send(newOrder)
        })
        .catch((err) => {
            console.log("Error in order request: ", err);
            res.status(400).json({ error: err })
        })
}


//Get all orders
export const getOrders = async (req, res) => {

    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.send(err);
    }
}

export const updateOrderStatus = async (request, response) => {

    let update = request.body;
    console.log(update)
    try {
        const order = await Order.findByIdAndUpdate({ _id: update._id }, update, { new: true })
        response.json(order);
    } catch (err) {
        response.send(err);
    }
}
