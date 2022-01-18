import {  IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateSensorDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(7)
  @IsString()
  readonly password: string;
}
