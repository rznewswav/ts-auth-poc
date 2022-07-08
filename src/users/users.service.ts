import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, WebUsers } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const user = await this.prismaService.webUsers.create({
      data: {}
    });

    const token = await this.newToken(user);

    await this.prismaService.webSessions.create({
      data: {
        jwt: token,
        metadata: createUserDto as Prisma.JsonObject,
      }
    })
    return {
      user: {
        id: user.id,
      },
      token,
      newUser: true,
    };
  }

  private async newToken(user: WebUsers) {
    return await this.jwtService.signAsync({
      id: user.id,
      client: 'web',
    });
  }

  async update(updateUserDto: UpdateUserDto) {
    const user = await this.prismaService.webUsers.create({
      data: {}
    });

    if (!user) return this.create(updateUserDto);

    const token = await this.newToken(user);

    await this.prismaService.webSessions.create({
      data: {
        jwt: token,
        metadata: updateUserDto as unknown as Prisma.JsonObject,
      }
    })
    return {
      user: {
        id: user.id,
      },
      token,
      newUser: false,
    };
  }
}
