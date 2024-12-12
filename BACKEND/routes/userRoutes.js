import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/me", async (req, res) => {
    try 
    {
        const token = req.headers.authorization.split(" ")[1];// bearer_token (taking just token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const isExpired = Date.now() >= decoded.exp * 1000;

        if(isExpired) {
            return res.status(401).send("Token Expired");
        }

        const user = await User.findById(decoded.id);
        res.status(200).json({user});
    }
    catch (error) 
    {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
});


router.post("/signup", async (req, res) => {
    try 
    {
        const {username, password} = req.body;

        const existingUser = await User.findOne({username});
        if (existingUser) {
            return res.status(400).send("The Provided Username is already taken");
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({username, password: hashedPassword});

        await user.save();

        res.status(201).json({ message: "User successfully registered", user });
    } catch (error) 
    {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
});

router.post("/login", async (req, res) => {
    try 
    {
        const {username, password} = req.body;

        const findUser = await User.findOne({username});

        if (!findUser) 
        {
            return res.status(400).send("No such username exists");
        }

        const isPasswordValid = await bcrypt.compare(password, findUser.password);

        if (!isPasswordValid) 
        {
            return res.status(400).send("Invalid credentials");
        }

        //Create a JWT token (payload, secret, options)
        const token = jwt.sign({id: findUser._id}, process.env.JWT_SECRET, {expiresIn: "3h"} );

        res.status(200).json({ message: "User successfully logged in", token, user: findUser });

    } catch (error)
    {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
});



export default router;