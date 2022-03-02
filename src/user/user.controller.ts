import {Controller, Get, Req, UseGuards} from '@nestjs/common';
import {User} from '@prisma/client';
import {GetUser} from 'src/auth/decorator';
import {JwtGuard} from 'src/auth/guard';

//Guard protects the route and is linked with jwt.strategy
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {

    // GET /users/me
    @Get('me')
    getMe(@GetUser() user: User) {
        return user;
    }
}
