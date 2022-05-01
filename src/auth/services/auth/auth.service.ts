import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../../repository/user.repository';
import { CreateUserDto } from '../../models/dto/create-user.dto';
import { EncoderService } from '../encoder/encoder.service';
import { JwtPayload } from 'src/common/interfaces/jwt.payload';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from 'src/auth/models/dto/login-user.dto';
import { loginResponseMapper } from 'src/auth/utils/login.mapper';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository) private userRepository: UserRepository,
        private encoderService: EncoderService,
        private jwtService: JwtService,
    ) { }

    async createUser(userDto: CreateUserDto) {
        const { password } = userDto;
        userDto.password = await this.encoderService.encodePassword(password);

        await this.userRepository.createUser(userDto);
    }

    async login(loginDto: UserLoginDto) {
        console.log(loginDto)
        const { email, password } = loginDto;
        const user = await this.userRepository.findOneByEmail(email);
        if(user){
            if (await this.encoderService.checkPassword(password, user.password)) {
                console.log('bien')
                const payload: JwtPayload = { id: user.id, email, active: true }
                const accessToken = await this.jwtService.signAsync(payload)
                const userDto = loginResponseMapper(user, accessToken);
                return userDto;
            }
        }
        throw new NotFoundException('Revisa tus credenciales para poder acceder.')

    }
}
