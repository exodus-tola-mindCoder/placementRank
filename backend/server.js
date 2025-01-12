import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();
// console.log(`MONGO_URI: ${process.env.MONGO_URI}`);
connectDB();


const app = express();

const PORT = process.env.PORT || 5001;

// create a route

import authRoutes from './routes/auth.route.js';


app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/department", departmentRoutes);


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});