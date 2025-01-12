import User from '../models/user.model.js';

import bcrypt from 'bcryptjs';

export const signupController = async (req, res) => {

    try {
        const { fullName, email, average, password, username } = req.body;
        if (fullName === "" || email === "" || average === "" || password === "") {
            return res.status(400).json({ msg: "Please fill in all fields" });
        };
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid email" });
        }

        if (password.length < 6) {
            return res.status(400).json({ msg: "Password must be at least 6 characters" });
        };
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ msg: "User email already exists" });
        };

        const userExistByUsername = await User.findOne({
            username: username
        });
        if (userExistByUsername) {
            return res.status(400).json({ msg: "Username already exists" });
        };

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullName,
            email,
            average,
            password: hashedPassword,
            username
        });
        if (newUser) {
            await newUser.save();
            res.status(201).json({
                success: true, User: {
                    ...newUser._doc,
                    password: ""
                },
            });
        };

        res.status(200).json({ msg: "User created successfully" });


    } catch (error) {
        console.log("Error", error.message);
        res.status(500).json({ msg: "Server Error" });

    };
};


export const loginController = async (req, res) => {

    try {
        const { email, username, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User does not exist" });
        };

        if (user.username !== username) {
            return res.status(400).json({ msg: "Invalid credentials" });
        };

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        };

        res.status(200).json({ msg: "User logged in successfully" });

    } catch (error) {
        console.log("Error", error.message);
        res.status(500).json({ msg: "Server Error" });
    };
};