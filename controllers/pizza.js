import { Pizza } from '../models/pizza.js';
import { Ingredient } from '../models/ingredients.js';

//Get all available pizzas
export const getAvailablePizzas = async (req, res) => {

    try {
        const ingredients = await Ingredient.aggregate([
            {
                $group: {
                    _id: "$type",
                    totalCount: {
                        $sum: "$count"
                    }
                }
            }
        ])

        const pizzas = await Pizza.find();

        res.json(pizzas);
    } catch (err) {
        res.send(err);
    }
}

