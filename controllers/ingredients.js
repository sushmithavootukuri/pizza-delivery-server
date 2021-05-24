import { Ingredient } from '../models/ingredients.js';

export const getIngredients = async (req, res) => {
    let filter = {};

    if (req.query.type)
        filter.type = req.query.type;
    try {
        const ingredients = await Ingredient.find(filter)
        res.json(ingredients);
    } catch (err) {
        res.send(err);
    }
}

export const getIngredientsCountByType = async (req, res) => {
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
        res.json(ingredients);
    } catch (err) {
        res.send(err);
    }
}

export const updateIngredients = async (request, response) => {

    let update = request.body;
    try {
        const ingredient = await Ingredient.findByIdAndUpdate({ _id: update._id }, update, { new: true })
        console.log("Count value updated to : ", ingredient.count);
        response.json(ingredient);
    } catch (err) {
        response.send(err);
    }
}

export const updateIngredientsAfterOrder = async (request, response) => {

    console.log(request.body)
    // let { base } = request.body;
    let { base, toppings, meat, sauce } = request.body;
    try {
        const baseIngredient = await Ingredient.updateOne({ name: base }, { $inc: { count: -1 } }, { new: true });

        for (let i = 0; i < toppings.length; i++) {
            await Ingredient.updateOne({ name: toppings[i] }, { $inc: { count: -1 } }, { new: true });
        }
        const meatIngredient = await Ingredient.updateOne({ name: meat }, { $inc: { count: -1 } }, { new: true });
        const sauceIngredient = await Ingredient.updateOne({ name: sauce }, { $inc: { count: -1 } }, { new: true });

        response.json({ baseIngredient, meatIngredient, sauceIngredient });

    } catch (err) {
        response.send(err);
    }
}
