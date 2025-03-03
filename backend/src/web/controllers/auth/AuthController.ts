import { Request, Response } from 'express';
import { AuthUseCase } from '../../../application/use-cases/auth/AuthUseCase';
import { ResponseModelDTO } from '../../../domain/dtos/ResponseModelDTO';

export class AuthController {
    constructor(private authUseCase: AuthUseCase) {}

    async login(request: Request, response: Response): Promise<Response> {
        try {
            const { email, password } = request.body;

            const { token } = await this.authUseCase.execute(email, password);

            const responseDto = ResponseModelDTO.success(token);
            return response.status(responseDto.getStatus()).json(responseDto.toJSON());
        } catch (error) {
            const responseDto = ResponseModelDTO.error(error instanceof Error ? error.message : 'Unexpected error');
            return response.status(responseDto.getStatus()).json(responseDto.toJSON());
        }
    }
} 