import Express from "express";
import { getAvailablePizzas } from "../controllers/pizza.js";
const pizzaRouter = Express.Router();


pizzaRouter.get('/', getAvailablePizzas);

export default pizzaRouter;