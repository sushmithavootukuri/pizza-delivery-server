import Express from "express";
import { createOrder, getOrders, updateOrderStatus } from "../controllers/order.js";
const ordersRouter = Express.Router();


ordersRouter.post('/', createOrder);
ordersRouter.get('/', getOrders);
ordersRouter.patch('/', updateOrderStatus);

export default ordersRouter;






