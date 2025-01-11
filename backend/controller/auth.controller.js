import User from '../models/user.model.js';

import bcrypt from 'bcryptjs';

export const signupController = async (req, res) => {
    const { fullName, email, average, password } = req.body;
    
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ msg: "User already exists" });
        };

        if (fullName === "" || email === "" || average === "" || password === "") {
            return res.status(400).json({ msg: "Please fill in all fields" });
        };
        if (password.length < 6) {
            return res.status(400).json({ msg: "Password must be at least 6 characters" });
        };

        const user = new User({
            fullName,
            email,
            average,
            password
        });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;// hash the password before saving it to the database
        if (user) {
            res.status(201).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                average: user.average,
                password: user.password
            })
        }

        res.status(200).json({ msg: "User created successfully" });

        await user.save();

    } catch (error) {
        console.log("Error", error.message);
        res.status(500).json({ msg: "Server Error" });
        
    };
};


export const loginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User does not exist" });
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