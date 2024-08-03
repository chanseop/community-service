import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { PrismaService } from "src/prisma.service";

@Module({
  controllers: [BoardController],
  providers: [BoardService, PrismaService],
})
export class BoardModule {}
