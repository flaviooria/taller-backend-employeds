import { Application } from 'express';
import { Router } from 'express';

import userRouter from './user/infrastructure/api/route/userRoute';
import employedRouter from './employed/infrastructure/api/route/employedRouter';

function initRouter(app: Application) {
	let routerController = Router();

	routerController.use('/users', userRouter);
	routerController.use('/employeds', employedRouter);
	app.use('/api/v1', routerController);
}
export { initRouter };
