import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { initializeDatabase } from './infrastructure/database/initialize';
import { authRoutes } from './web/routes/auth.routes';
import { responseHandler } from './interfaces/middlewares/responseHandler';

async function bootstrap() {
    const app = express();

    app.use(cors());
    app.use(express.json());
    
    // Middleware para padronizar respostas
    app.use(responseHandler);

    // Inicializar banco de dados
    await initializeDatabase();

    // Rotas
    app.use('/auth', authRoutes);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
}

bootstrap().catch(console.error); 