import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SessionModule } from './config/session.module';
import { ListModule } from './list/list.module';

@Module({
  imports: [AuthModule, ListModule, SessionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
