import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from "./constants";
import { PrismaService } from "src/prisma.service";
// import { JwtStrategy } from "./jwt.strategy";
// import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
    // PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,PrismaService],
  exports: [AuthService]
})
export class AuthModule {}
