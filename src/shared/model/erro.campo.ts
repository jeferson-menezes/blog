import { Mensagem } from './mensagem';

export class ErroCampo extends Mensagem {

    campo: string

    constructor(mensagem: string, campo: string) {
        super(mensagem)
        this.campo = campo
    }
}