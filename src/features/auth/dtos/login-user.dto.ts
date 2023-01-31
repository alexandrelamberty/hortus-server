import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginUserDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(7)
  @IsString()
  password: string;
}
