import express from 'express';

import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/db.js';

const app = express();

const PORT = process.env.PORT || 5001;

// create a route

import authRoutes from './routes/auth.route.js';


app.use(express.json());

app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
    connectDB();
    console.log(`server is running on port ${PORT}`);
});