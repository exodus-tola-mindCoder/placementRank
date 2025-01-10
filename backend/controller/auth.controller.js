import User from '../models/user.model';

export const authController = async (req, res) => {
    { const { fullName, email, password } = req.body; }
    
    try {
        const user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({ msg: "User already exists" });
        };
        const newUser = new User({ fullName, email, password });

        if(fullName === "" || email === "" || password === "") {
            return res.status(400).json({ msg: "Please fill in all fields" });
        };

        await newUser.save();
        
    } catch (error) {
        
    }
}