import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, UseInterceptors, Res, HttpStatus, HttpCode, HttpException, Req } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { ResponseTransformInterceptor } from "src/interceptors/response-transform-interceptors";
import { ResponseMsg } from "src/decorators/response-decorate";
import { User } from "src/decorators/user.decorator";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Board')
@Controller('board')
@ApiBearerAuth()
@UseInterceptors(ResponseTransformInterceptor)
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  // 게시글을 생성하는 API
  @HttpCode(HttpStatus.CREATED)
  @ResponseMsg('게시글 생성 성공')
  @ApiResponse({ status: 201, description: '게시글 생성 성공' })
  @ApiResponse({ status: 403, description: '관리자만 글작성 가능합니다.' })
  @Post('create')
  create(@Body() createBoardDto: CreateBoardDto, @User() user) {
    if (user.role === 1100 && createBoardDto.category !==2){
      throw new HttpException(
        '관리자만 글작성 가능합니다.',
        HttpStatus.FORBIDDEN
      );
    }
    createBoardDto.author = user.email;
    return this.boardService.create(createBoardDto);
  }

  // 카테고리별로 게시글을 가져오는 API
  @HttpCode(HttpStatus.OK)
  @ResponseMsg('게시글 조회 성공')
  @ApiResponse({ status: 200, description: '게시글 조회 성공' })
  @ApiResponse({ status: 404, description: '존재하지 않는 카테고리입니다.' })
  @Get(':category')
  async findAll(@Param('category') category: number) {
    // console.log(category);
    const checkCategory = await this.boardService.findAll(Number(category));
    console.log(checkCategory);
    
    if (checkCategory.length === 0) {
      throw new HttpException(
        '존재하지 않는 카테고리입니다.',
        HttpStatus.NOT_FOUND
      );
    }

    return this.boardService.findAll(+Number(category));
  }

  // 게시글 하나를 가져오는 API
  @HttpCode(HttpStatus.OK)
  @ResponseMsg('게시글 조회 성공')
  @ApiResponse({ status: 200, description: '게시글 조회 성공' })
  @Get(':category/:id')
  async findOne(@Param('id') id: string ,@User() user) {
    const data = await this.boardService.findOne(+id);
    // 수정 가능한지 확인
    const canEditStatusCheckData = data.author === user.email;
    // 데이터 병합
    const result ={canEdit: canEditStatusCheckData,canDelete:canEditStatusCheckData, data: data};
    
    //관리자 권한 확인
    if (user.role === 1111){
      const result ={canEdit: canEditStatusCheckData,canDelete:true, data: data};
      return result;
    }

    return result;
  }

  // 게시글을 수정하는 API
  @HttpCode(HttpStatus.OK)
  @ResponseMsg('게시글 수정 성공')
  @ApiResponse({ status: 200, description: '게시글 수정 성공' })
  @Put(':category/:id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.update(+id, updateBoardDto);
  }

  // 게시글을 삭제하는 API
  @HttpCode(HttpStatus.OK)
  @ResponseMsg('게시글 삭제 성공')
  @ApiResponse({ status: 200, description: '게시글 삭제 성공' })
  @ApiResponse({ status: 403, description: '작성자만 삭제 가능합니다.' })
  @ApiResponse({ status: 404, description: '존재하지 않는 게시글입니다.' })
  @Delete(':category/:id')
  async remove(@Param('id') id: string, @User() user) {
    const checkContent =await this.boardService.findOne(+id);
    if (checkContent === null) {
      throw new HttpException(
        '존재하지 않는 게시글입니다.',
        HttpStatus.BAD_REQUEST
      );
    }
    if (checkContent.author !== user.email ) {
      throw new HttpException(
        '작성자만 삭제 가능합니다.',
        HttpStatus.FORBIDDEN
      );
    }else if (user.role === 1111){
      return this.boardService.remove(+id);
    }
    

    return this.boardService.remove(+id);
  }

  // 검색 게시글 조회 API
  @HttpCode(HttpStatus.OK)
  @ResponseMsg('게시글 검색 성공')
  @ApiResponse({ status: 200, description: '게시글 검색 성공' })
  @Get()
  search(@Query('search') search: string) {
    return this.boardService.search(search);
  }

}
