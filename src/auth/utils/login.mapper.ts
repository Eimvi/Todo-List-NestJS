import { LoginResponseUserDto } from '../models/dto/login-response-user.dto';
import { UserEntity } from '../models/entities/user.entity';

export const loginResponseMapper = (user: UserEntity, token: string) => {
    const loginResponseUserDTO: LoginResponseUserDto = {
        id: user.id,
        username: user.username,
        email: user.email,
        token
    }

    return loginResponseUserDTO;
}