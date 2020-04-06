import { Injectable, LoggerService, Scope } from '@nestjs/common';
import { WinstonLogger } from '@payk/nestjs-winston';

@Injectable()
export class MeuLogger implements LoggerService {

    protected context?: string;
    private readonly logger = new WinstonLogger(this.context)

    setContext(context: string) {
        this.context = context
    }
    log(message: any, context?: any) {
        this.logger.log(message, context)
    }
    error(message: any, context?: any) {
        this.logger.error(message, context)
    }
    warn(message: any, context?: any) {
        this.logger.warn(message, context)
    }
    debug?(message: any, context?: any) {
        this.logger.debug(message, context)
    }
    verbose?(message: any, context?: any) {
        this.logger.verbose(message, context)
    }

}