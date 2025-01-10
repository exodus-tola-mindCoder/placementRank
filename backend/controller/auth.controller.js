import User from '../models/user.model';

export const authController = async (req, res) => {
    { const { fullName, email, password } = req.body; }
    
    try {
        const user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({ msg: "User already exists" });
        };

        if(fullName === "" || email === "" || password === "") {
            return res.status(400).json({ msg: "Please fill in all fields" });
        };
        if(password.length < 6) {
            return res.status(400).json({ msg: "Password must be at least 6 characters" });
        };

    } catch (error) {
        console.log("Error", error.message);
        res.status(500).json({ msg: "Server Error" });
        
    }
}