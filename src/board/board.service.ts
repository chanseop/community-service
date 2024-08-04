import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { PrismaService } from "src/prisma.service";
import { board } from '@prisma/client';

@Injectable()
export class BoardService {
  constructor(private prisma: PrismaService) {}

  // post
  async create(createBoardDto: CreateBoardDto): Promise<board> {
    return this.prisma.board.create({
      data: {
        title: createBoardDto.title,
        contents: createBoardDto.contents,
        author: createBoardDto.author,
        category: createBoardDto.category, 
      },
    });
  }

  // get all
  async findAll(category:number): Promise<board[]> {
    return await this.prisma.board.findMany({
      where: {
        category: category,
      },
    });
  }

  async findOne(id: number): Promise<board|null> {
    return await this.prisma.board.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateBoardDto: UpdateBoardDto) : Promise<board> {
    return await this.prisma.board.update({
      where: { id },
      data: {
        title: updateBoardDto.title, 
        contents: updateBoardDto.contents,
      },
    });
  }

  async remove(id: number): Promise<board> {
    return await this.prisma.board.delete({
      where: { id },
    });
  }

  async search(word:string): Promise<board[]> {
    return await this.prisma.board.findMany({
      where: {
        OR: [
          { title: { contains: word } },
          { contents: { contains: word } },
        ],
      },
    });
  }
}
