import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import path from 'path';
import artistRouter from './routers/artist.router';
import authRouter from './routers/auth.router';
import buskingRouter from './routers/busking.router';
import reportsRouter from './routers/report.router';
import userRouter from './routers/user.router';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, '../public')));

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/artists', artistRouter);
app.use('/buskings', buskingRouter);
app.use('/reports', reportsRouter);

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 DonsServer running at http://0.0.0.0:${port}`);
});

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.get('/policy', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/policy.html'));
});
