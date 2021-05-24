import Express from "express";
import { getIngredients, getIngredientsCountByType, updateIngredients, updateIngredientsAfterOrder } from "../controllers/ingredients.js";
const ingredientsRouter = Express.Router();


ingredientsRouter.get('/', getIngredients);
ingredientsRouter.patch('/', updateIngredients);
ingredientsRouter.patch('/order', updateIngredientsAfterOrder);
ingredientsRouter.get('/count', getIngredientsCountByType);



export default ingredientsRouter;






