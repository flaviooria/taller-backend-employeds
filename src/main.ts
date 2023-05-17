import express, { urlencoded } from 'express';
import cors from 'cors';
import { initRouter } from './init.router';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

initRouter(app);

const port: string | number = process.env.PORT || 3001;

app.listen(Number(port), '0.0.0.0', () => {
	console.log('listen on port 3001');
});
