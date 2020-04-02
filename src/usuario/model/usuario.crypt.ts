
import { hash, compare } from 'bcryptjs'

export class Crypt {

    static encript(senha: string): Promise<string> {
        return hash(senha, 10);
    }

    static compara(senha: string, hash: string): Promise<boolean> {
        return compare(senha, hash);
    }
}