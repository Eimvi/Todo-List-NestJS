import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { CreateUserDto } from '../../models/dto/create-user.dto';
import { UserLoginDto } from 'src/auth/models/dto/login-user.dto';

@Controller('user')
export class UserController {
    constructor(private authService: AuthService) {}

    @Post('/create')
    createUser(@Body() userCreateDto: CreateUserDto){
        this.authService.createUser(userCreateDto);
    }


    @Post('/login')
    loginUser(@Body() loginUserDto: UserLoginDto){
        return this.authService.login(loginUserDto);
    }

}
