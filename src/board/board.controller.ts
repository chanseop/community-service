import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
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

  // 카테고리별로 게시글을 가져오는 API
  @Get(':category')
  findAll(@Param('category') category: number) {
    return this.boardService.findAll(+category);
  }

  // 게시글 하나를 가져오는 API
  @Get(':category/:id')
  findOne(@Param('id') id: string) {
    return this.boardService.findOne(+id);
  }

  // 게시글을 수정하는 API
  @Put(':category/:id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.update(+id, updateBoardDto);
  }

  // 게시글을 삭제하는 API
  @Delete(':category/:id')
  remove(@Param('id') id: string) {
    return this.boardService.remove(+id);
  }

  // 검색 게시글 조회 API
  @Get()
  search(@Query('search') search: string) {
    return this.boardService.search(search);
  }

}
