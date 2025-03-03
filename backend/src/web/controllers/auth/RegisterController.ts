import { Request, Response } from 'express';
import { RegisterUseCase } from '../../../application/use-cases/auth/RegisterUseCase';
import { ResponseModelDTO } from '../../../domain/dtos/ResponseModelDTO';

export class RegisterController {
    constructor(private registerUseCase: RegisterUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { name, email, password, cpf, role } = request.body;

            if (!name || !email || !password || !cpf || !role) {
                const responseDto = ResponseModelDTO.error('Todos os campos são obrigatórios');
                return response.status(responseDto.getStatus()).json(responseDto.toJSON());
            }

            const { user, token } = await this.registerUseCase.execute({
                name,
                email,
                password,
                cpf,
                role
            });

            const responseDto = ResponseModelDTO.success({ user, token });
            return response.status(responseDto.getStatus()).json(responseDto.toJSON());
        } catch (error) {
            const responseDto = ResponseModelDTO.error(error instanceof Error ? error.message : 'Erro inesperado');
            return response.status(responseDto.getStatus()).json(responseDto.toJSON());
        }
    }
} 