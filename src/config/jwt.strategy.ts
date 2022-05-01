import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";

import { UserRepository } from '../auth/repository/user.repository';
import { JwtPayload } from 'src/common/interfaces/jwt.payload';
import { jwt_key } from './jwt.constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
        ) {
            super({
                ignoreExpirarion: false,
                secretOrKey: jwt_key,
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
            });
        }

    async validate(payload: JwtPayload) {
        const { email } = payload;
        try {
            const user = await this.userRepository.findOneByEmail(email);
            return user;
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}