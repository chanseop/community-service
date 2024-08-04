import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthGuard } from "./auth/auth.guard";
import { APP_GUARD } from "@nestjs/core";

@Module({
  imports: [BoardModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide:APP_GUARD,
      useClass:AuthGuard,
    },
  ],
})
export class AppModule {}
