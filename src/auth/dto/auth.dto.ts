import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, Min, MinLength } from "class-validator";

export class AuthDto {
    @ApiProperty({
        required: true,
        type: String,
        description: '이메일',
        example: 'lcs@naver.com',
        default: 'lcs@naver.com'
    })
    @IsEmail()
    @IsNotEmpty()
    @MinLength(2,{message:'이메일은 5자 이상 입력해주세요.'})
    @MaxLength(30,{message:'이메일은 30자 이하로 입력해주세요.'})
    email: string;

    @ApiProperty({
        required: true,
        type: String,
        description: '비밀번호',
        example: 'qwe123!!',
        default: 'qwe123!!'
    })
    @IsString({message:'비밀번호는 문자열로 입력해주세요.'})
    @MinLength(8,{message:'비밀번호는 8자 이상 입력해주세요.'})
    @MaxLength(30,{message:'비밀번호는 30자 이하로 입력해주세요.'})
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        required: true,
        type: String,
        description: '사용자 이름',
        example: '임찬섭',
        default: '임찬섭'
    })
    @IsString({message:'사용자 이름은 문자열로 입력해주세요.'})
    @IsNotEmpty()
    @MinLength(2,{message:'사용자 이름은 2자 이상 입력해주세요.'})
    @MaxLength(20,{message:'사용자 이름은 20자 이하로 입력해주세요.'})
    username:string;

    role?:number;
}