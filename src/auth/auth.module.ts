import { Module } from '@nestjs/common';
import { UserController } from './controllers/user/user.controller';
import { AuthService } from './services/auth/auth.service';
import { UserRepository } from './repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwt_key } from 'src/config/jwt.constant';
import { JwtStrategy } from '../config/jwt.strategy';
import { EncoderService } from './services/encoder/encoder.service';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: jwt_key,
      signOptions: {
        expiresIn: 3600
      }
    }),
    TypeOrmModule.forFeature([UserRepository])
  ],
  controllers: [UserController],
  providers: [AuthService, JwtStrategy, EncoderService],
  exports: [PassportModule, JwtStrategy]
})
export class AuthModule {}
