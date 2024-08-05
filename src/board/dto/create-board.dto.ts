import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, Min, MinLength } from "class-validator";

export class CreateBoardDto {
    @ApiProperty({
        required: true,
        type: String,
        description: '제목',
        example: '안녕하세요',
        default: '안녕하세요',
        minimum: 2,
        maximum: 30
    })
    @IsString({message:'제목은 문자열로 입력해주세요.'})
    @IsNotEmpty({message:'제목을 입력해주세요.'})
    @MinLength(2,{message:'제목은 2자 이상 입력해주세요.'})
    @MaxLength(30,{message:'제목은 30자 이하로 입력해주세요.'})
    title: string;

    @ApiProperty({
        required: true,
        type: String,
        description: '본문',
        example: '안녕하세요. 반갑습니다.',
        default: '안녕하세요. 반갑습니다.',
        minimum: 2,
        maximum: 100
    })
    @IsString({message:'본문은 문자열로 입력해주세요.'})
    @IsNotEmpty({message:'본문을 입력해주세요.'})
    @MinLength(2,{message:'본문은 2자 이상 입력해주세요.'})
    @MaxLength(100,{message:'본문은 100자 이하로 입력해주세요.'})    
    contents: string;
    author: string;
    @ApiProperty({
        required: true,
        type: Number,
        description: '카테고리',
        example: 2,
        default: 2,
    })
    category: number;
}
