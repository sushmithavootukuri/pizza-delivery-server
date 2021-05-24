import { User } from '../models/user.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const TOKEN_SECRET = process.env.TOKEN_SECRET || "pizzaparadise"  //Give a complex secret key in real time application

//Admin and user registration
export const signup = async (req, res) => {

    let role = req.params.role; // Get role from url

    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    //Validation of existing user
    if (user) {
        console.log(user)
        return res.status(409).json({ error: "User with this email already exists." })
    }

    let newUser = new User({ name, email, password });
    newUser.role = role; // admin or user

    newUser.save()
        .then((newUser) => {

            res.send(newUser)
        })
        .catch((err) => {
            console.log("Error in signup: ", err);
            res.status(400).json({ error: err })
        })
}

//Login 


export const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        let isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Login credentials Incorrect!" });
        }
        else {
            const accessToken = jwt.sign({ id: user._id, email: user.email, role: user.role }, TOKEN_SECRET);
            console.log(accessToken)
            res.status(200).json({ accessToken, user });
        }

    } catch (err) {
        res.send(err);
    }

}


export const auth = async (req, res) => {

    let token = req.params.token;

    try {

        const decoded = jwt.verify(token, TOKEN_SECRET)
        console.log("decode : ", decoded)
        let user = await User.findById({ _id: decoded.id });

        if (user) {
            return res.status(200).json({ auth: true, decoded });
        }
        res.status(400).json({ auth: false, message: "Authentication failed" });


    } catch (err) {
        res.status(400).json({ auth: false, message: err });
    }

}