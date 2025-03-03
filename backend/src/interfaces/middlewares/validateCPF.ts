import { Request, Response, NextFunction } from 'express';
import { validateCPF } from '../../domain/utils/cpfValidator';

export function validateCPFMiddleware(
    request: Request,
    response: Response,
    next: NextFunction
): Response | void {
    const { cpf } = request.body;

    if (!cpf) {
        return response.sendError('CPF é obrigatório', 400);
    }

    if (!validateCPF(cpf)) {
        return response.sendError('CPF inválido', 400);
    }

    return next();
} 