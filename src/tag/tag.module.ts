import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from './model/tag.entity';
import { TagService } from './service/tag.service';
import { TagController } from './controller/tag.controller';

@Module({
    imports:[TypeOrmModule.forFeature([TagEntity])],
    providers:[TagService],
    controllers:[TagController]
})
export class TagModule {}
