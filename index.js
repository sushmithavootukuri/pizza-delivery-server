import Express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/user.js";
import ingredientsRouter from "./routes/ingredients.js";
import pizzaRouter from "./routes/pizza.js";
import ordersRouter from "./routes/order.js"

const app = Express();

app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use("/api/account", router);
app.use("/pizza/ingredients", ingredientsRouter);
app.use("/pizzas", pizzaRouter);
app.use("/pizza/orders", ordersRouter);


const url = process.env.MONGODB_URI || "mongodb://localhost:27017/pizza";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const con = mongoose.connection;

const port = process.env.PORT || 3200;

con.on("open", function () {
  console.log("Mongo DB connected");
}).then(
  app.listen(port, () => console.log(`Server started`))
)

