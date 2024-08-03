import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post('create')
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.create(createBoardDto);
  }

  @Get(':category')
  findAll(@Param('category') category: number) {
    return this.boardService.findAll(+category);
  }

  @Get(':category/:id')
  findOne(@Param('id') id: string) {
    return this.boardService.findOne(+id);
  }

  @Put(':category/:id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.update(+id, updateBoardDto);
  }

  @Delete(':category/:id')
  remove(@Param('id') id: string) {
    return this.boardService.remove(+id);
  }
}
