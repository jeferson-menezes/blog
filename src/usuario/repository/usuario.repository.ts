import { EntityRepository, Repository } from 'typeorm';
import { UsuarioEntity } from '../model/usuario.entity';

@EntityRepository(UsuarioEntity)
export class UsuarioRepository extends Repository<UsuarioEntity>{

}