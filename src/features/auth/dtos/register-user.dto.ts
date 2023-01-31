import { IsNotEmpty, IsEmail, MinLength, IsString } from "class-validator";

export class RegisterUserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  // FIXME: regex to force number, uppercase and symbol
  @IsNotEmpty()
  @MinLength(7)
  @IsString()
  readonly password: string;
}
