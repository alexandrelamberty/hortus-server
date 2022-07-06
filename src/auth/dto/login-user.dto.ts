import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class SigninUserDto {

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(7)
    @IsString()
    readonly password: string;


}
