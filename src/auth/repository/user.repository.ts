import { ConflictException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from '../models/entities/user.entity';
import { CreateUserDto } from '../models/dto/create-user.dto';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {

    /* Register User */
    async createUser(registerUserDto: CreateUserDto) {
        const { username, email, password } = registerUserDto;   
        try {
            const user = this.create({ username, email, password });
            await this.save(user);
            return user;
        } catch (error) {
            if (error.code == 'ER_DUP_ENTRY') {
                throw new ConflictException('El email ya esta registrado')
            }
            console.log(error)
            throw new InternalServerErrorException()
        }
    }

    /* Find User By Email */
    async findOneByEmail(email: string) {
        try {
            const user = await this.findOne({ where: { email } });
            if (!user) {
                throw new UnauthorizedException('Por favor revisa tus credenciales.');
            }
            return user;
        } catch (error) {
            throw new InternalServerErrorException();
        }

    }
}