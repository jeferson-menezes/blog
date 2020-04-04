import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import { UsuarioEntity } from './usuario.entity';

@EventSubscriber()
export class UsuarioSubscriber implements EntitySubscriberInterface<UsuarioEntity>{

    afterInsert(event: InsertEvent<UsuarioEntity>) {
        event.entity.senha = ""
    }
}