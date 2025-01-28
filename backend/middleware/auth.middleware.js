import jwt from 'jsonwebtoken';
import Student from '../models/student.js';

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        // // Fallback to Authorization header if token is not in cookies
        if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) throw new Error('Token not found');

        console.log("Token:", token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const student = await Student.findOne({ _id: decoded.id });
        if (!student) throw new Error();
        req.student = student;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
        console.log("Authentication Error:", error.message);
    }
};

export default authMiddleware;