import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import authRoutes from './routes/auth.route.js';
import departmentRoutes from './routes/department.route.js';

dotenv.config();
// console.log(`MONGO_URI: ${process.env.MONGO_URI}`);

// connect to database
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());


// create a route

import authRoutes from './routes/auth.route.js';


app.use("/api/auth", authRoutes);
app.use("/api/department", departmentRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});