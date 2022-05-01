import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListController } from './controllers/list/list.controller';
import { ListService } from './services/list/list.service';
import { ListRepository } from './repository/list.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([ListRepository])
  ],
  controllers: [ListController],
  providers: [ListService]
})
export class ListModule {}
