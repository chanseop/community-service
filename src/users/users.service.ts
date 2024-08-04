import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
    private readonly users = [
        {
            userId: 1,
            id: 'lcs',
            password: '1234',
        },
        {
            userId: 2,
            id: 'chris',
            password: 'secret',
        },
    ];

    async findOne(id: string): Promise<User | undefined> {
        return this.users.find(user => user.id === id);
    }
}
