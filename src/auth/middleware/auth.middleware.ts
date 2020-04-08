import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(private jwtService: JwtService) { }

    async use(req: any, res: any, next: Function) {

        const authHeader = req.headers.authorization

        if (!authHeader) {
            return res.status(401).send({ error: 'No token provided' })
        }

        const parts = authHeader.split(' ')

        if (parts.length !== 2) {
            return res.status(401).send({ error: 'Token error' })
        }

        const [scheme, token] = parts

        if (!/^Bearer$/i.test(scheme)) {
            return res.status(401).send({ error: 'Token malformatted' })
        }

        try {
            const decoded = await this.jwtService.verifyAsync(token)
            res.id = decoded.id
            return next()
        } catch (error) {
            return res.status(401).send(error)
        }
    }

}