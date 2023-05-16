import express, { urlencoded } from 'express';
import cors from 'cors';
import { initRouter } from './init.router';

const app = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

initRouter(app);

app.listen(3001, () => {
	console.log('listen on port 3001');
});
