/**
 * Classe para padronizar as respostas da API
 */
export class ResponseModelDTO {
    private status: number;
    private model: any;
    private error: string;

    constructor(status: number, model?: any, error?: string) {
        this.status = status;
        this.model = model;
        this.error = error;
    }

    public getStatus(): number {
        return this.status;
    }

    public setStatus(status: number): void {
        this.status = status;
    }

    public getModel(): any {
        return this.model;
    }

    public setModel(model: any): void {
        this.model = model;
    }

    public getError(): string {
        return this.error;
    }

    public setError(error: string): void {
        this.error = error;
    }

    /**
     * Cria uma resposta de sucesso
     * @param model Dados a serem retornados
     * @returns ResponseModelDTO com os dados e status de sucesso
     */
    public static success(model: any): ResponseModelDTO {
        return new ResponseModelDTO(200, model);
    }

    /**
     * Cria uma resposta de erro
     * @param error Mensagem de erro
     * @param status Código de status HTTP (padrão: 400)
     * @returns ResponseModelDTO com a mensagem de erro e status de erro
     */
    public static error(error: string, status: number = 400): ResponseModelDTO {
        return new ResponseModelDTO(status, null, error);
    }

    /**
     * Converte o objeto para JSON
     * @returns Objeto JSON com os dados da resposta
     */
    public toJSON() {
        return {
            status: this.status,
            model: this.model,
            error: this.error
        };
    }
} 