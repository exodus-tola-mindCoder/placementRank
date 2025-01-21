import jwt from 'jsonwebtoken';
import Student from '../models/student.js';

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) throw new Error();

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const student = await Student.findOne({ _id: decoded.id });
        if (!student) throw new Error();
        req.student = decoded
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

export default authMiddleware;