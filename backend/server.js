import express from 'express';

import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/db';

const app = express();

const PORT = process.env.PORT || 5001;

// create a route


app.use(express.json());

app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
    connectDB();
    console.log(`server is running on port ${PORT}`);
});