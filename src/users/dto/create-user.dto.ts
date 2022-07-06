import {  IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  // TODO: Add interceptor or I don't remember to remove
  // this field or create a UserDto without password ?!
  @IsNotEmpty()
  @MinLength(7)
  @IsString()
  readonly password: string;
}
