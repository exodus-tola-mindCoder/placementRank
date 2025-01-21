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
        const student = await Student.findOne({ email });
        if (!student) {
            throw new Error('Invalid Login credentials')
        };
        const IdMatch = student.studentId === studentId;
        if (!IdMatch) {
            throw new Error('Invalid studentId credentials');
        };


        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            throw new Error('Invalid password credentials');
        };

        
        const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET || 'your-secret-key');
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' ? true : false,
            sameSite: 'none'
        });
        
        res.status(200).json({ msg: "student logged in successfully" });
    } catch (error) {
        console.log("Error", error.message);
        res.status(400).json({ msg: "Server Error" });
    };
};