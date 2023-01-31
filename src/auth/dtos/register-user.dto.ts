import { IsNotEmpty, IsEmail, MinLength, IsString } from "class-validator";

export class RegisterUserDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(7)
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @MinLength(7)
  @IsString()
  readonly confirmPassword: string;
}
