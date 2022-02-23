import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
<<<<<<< HEAD


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, UserModule, BookmarkModule, PrismaModule],
=======

@Module({
  imports: [AuthModule, UserModule, BookmarkModule, PrismaModule],
>>>>>>> caf5a88 (Added auth  and database functionality)
})
export class AppModule { }
