import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const userRoutes = Router();
const userRepository = new UserRepository();
const userController = new UserController(userRepository);

// Todas as rotas aqui são protegidas
userRoutes.use(ensureAuthenticated);

// Rota para obter o perfil do usuário autenticado
userRoutes.get('/profile', (req, res) => userController.profile(req, res));

export { userRoutes }; 