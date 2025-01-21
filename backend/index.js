import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.route.js';
import statsRoutes from './routes/stats.router.js';


dotenv.config();
// console.log(`MONGO_URI: ${process.env.MONGO_URI}`);

// connect to database
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());


// create a route



app.use("/api/auth", authRoutes);
app.use("/api", statsRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});