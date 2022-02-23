import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async signup(dto: AuthDto) {
        //generate the password hash
        const hash = await argon.hash(dto.password);

        try {
            //save the new user in th database
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                }
            });

            //delete user password hash before returning user
            delete user.hash;

            //return the saved user
            return user;

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    //P2002  is Prisma defined error for duplicate fields

                    throw new ForbiddenException('Credentials already taken');
                }
            }

            throw error;
        }
    }

    async signin(dto: AuthDto) {
        //find the user by email
        const user = await this.prisma.user.findFirst({
            where: {
                email: dto.email
            }
        });
        // if user does not exist throw exception
        if (!user) throw new ForbiddenException('Credentials Incorrect');

        //compare password
        const pwMatches = await argon.verify(user.hash, dto.password);
        //if password incorrect throw an exception
        if (!pwMatches) throw new ForbiddenException('Credentials Incorrect');

        //delete user password hash before returning user
        delete user.hash;

        //send back the user
        return user;
    }
}