import Student from '../models/student.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const registerController = async (req, res) => {

    try {
        const { studentId, fullName, email, password, department, averageScore } = req.body;

        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ msg: "User already exists" });
        };

        const hashedPassword = await bcrypt.hash(password, 10);
        const student = new Student({
            studentId,
            fullName,
            email,
            password: hashedPassword,
            department,
            averageScore
        });

        await student.save();

        const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET || 'your-secret-key');
        res.status(201).send({ student, token });
    } catch (error) {
        res.status(400).send(error);
    }
};


export const loginController = async (req, res) => {

    try {
        const { studentId, email, password } = req.body;
        const user = await Student.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User does not exist" });
        };
        const idMatch = studentId === user.studentId;
        if (!idMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        };


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        };

        res.status(200).json({ msg: "User logged in successfully" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your-secret-key');
        res.status(200).send({ user, token });

    } catch (error) {
        console.log("Error", error.message);
        res.status(400).json({ msg: "Server Error" });
    };
};