import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from 'src/config/app.config';

@Module({
  imports: [PrismaModule, JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory(configService: ConfigService) {
      return {
        secret: configService.get<AppConfig>('app').jwtSecret,
      }
    },
  })],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule { }
