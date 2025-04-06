import express from 'express';
import 'dotenv/config';
import { clerkMiddleware } from '@clerk/express';
import userRouter from './routes/user.routes';
import { connectDB } from './utils/connectDb';

const app = express();

// Middleware
app.use(clerkMiddleware());

// Routes
app.use(userRouter);

// Test route
app.get('/', (_req, res) => {
  res.send('Hello from Express + Clerk + MongoDB!');
});

// Connect DB
connectDB();

export default app;
