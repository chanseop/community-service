import { Injectable } from '@nestjs/common';
import { PrismaService } from "src/prisma.service";
import { users } from '@prisma/client';


@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) {}

    async findOne(inputEmail: string): Promise<users>{
        return this.prismaService.users.findUnique({
            where:{
                email:inputEmail,
            },
        });
    }

    async create(email: string, password: string, username: string): Promise<users>{
        return this.prismaService.users.create({
            data:{
                email,
                password,
                username,
            },
        });
    }
}
