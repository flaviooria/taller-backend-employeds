import { Router } from 'express';
import { SqliteEmployedRepository } from '../../employed-repository/sqliteEmployedRepository';
import { EmployedApiServiceUseCase } from '../../../application/employedApiServiceUseCase';
import { EmployedController } from '../controllers/employedController';

const employedRouter = Router();

const employedRepository = new SqliteEmployedRepository();
const employedService = new EmployedApiServiceUseCase(employedRepository);
const controller = new EmployedController(employedService);

employedRouter
	.get('/', controller.getEmployeds.bind(controller))
	.get('/:id', controller.getEmployedById.bind(controller))
	.post('/', controller.createEmployed.bind(controller))
	.patch('/:id', controller.updateEmployed.bind(controller))
	.delete('/:id', controller.deleteEmployed.bind(controller));

export default employedRouter;
