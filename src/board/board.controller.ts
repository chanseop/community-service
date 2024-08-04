import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, UseInterceptors, Res, HttpStatus, HttpCode, HttpException } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { ResponseTransformInterceptor } from "src/interceptors/response-transform-interceptors";
import { ResponseMsg } from "src/decorators/response-decorate";
import { stringify } from "querystring";

@Controller('board')
@UseInterceptors(ResponseTransformInterceptor)
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  // 게시글을 생성하는 API
  @HttpCode(HttpStatus.CREATED)
  @ResponseMsg('게시글 생성 성공')
  @Post('create')
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.create(createBoardDto);
  }

  // 카테고리별로 게시글을 가져오는 API
  @HttpCode(HttpStatus.OK)
  @ResponseMsg('게시글 조회 성공')
  @Get(':category')
  findAll(@Param('category') category: number) {
    return this.boardService.findAll(+category);
  }

  // 게시글 하나를 가져오는 API
  @HttpCode(HttpStatus.OK)
  @ResponseMsg('게시글 조회 성공')
  @Get(':category/:id')
  findOne(@Param('id') id: string) {
    return this.boardService.findOne(+id);
  }

  // 게시글을 수정하는 API
  @HttpCode(HttpStatus.OK)
  @ResponseMsg('게시글 수정 성공')
  @Put(':category/:id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.update(+id, updateBoardDto);
  }

  // 게시글을 삭제하는 API
  @HttpCode(HttpStatus.NO_CONTENT)
  @ResponseMsg('게시글 삭제 성공')
  @Delete(':category/:id')
  remove(@Param('id') id: string) {
    const checkContent = this.boardService.findOne(+id);
    
    if (checkContent.then((res)=>res === null)) {
      throw new HttpException(
        '존재하지 않는 게시글입니다.',
        HttpStatus.BAD_REQUEST
      );
    }
    return this.boardService.remove(+id);
  }

  // 검색 게시글 조회 API
  @HttpCode(HttpStatus.OK)
  @ResponseMsg('게시글 검색 성공')
  @Get()
  search(@Query('search') search: string) {
    return this.boardService.search(search);
  }

}
