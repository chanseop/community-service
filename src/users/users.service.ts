import { Injectable } from '@nestjs/common';
import { PrismaService } from "src/prisma.service";
import { users } from '@prisma/client';


@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) {}

    async findOne(email: string): Promise<users>{
        return this.prismaService.users.findUnique({
            where: { email },
        });
    }

    async create(email: string, password: string, username: string,role?:number): Promise<users>{
        return this.prismaService.users.create({
            data:{
                email,
                password,
                username,
                role:role?role:1100
            },
        });
    }

    async softDelete(email: string): Promise<users>{
        return this.prismaService.users.update({
            where: { email },
            data: {
                softDelete: true,
            },
        });
    }
}
