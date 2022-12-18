import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Types } from "mongoose";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "../users/providers/users.service";
import { TokenPayload } from "./tokenPayload.interface";
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  public async registerUser(createUserDto: CreateUserDto) {
    // const salt: string = this.configService.get<string>("BCRYPT_HASH");
    // Check password match

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.usersService.insert({
      ...createUserDto,
      password: hashedPassword,
    });
    user.password = undefined;
    return user;
  }

  //
  public async validateUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.findByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        "Wrong credentials provided",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  public async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
    };
  }

  public getCookieWithJwtToken(userId: Types.ObjectId) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      "JWT_EXPIRE"
    )}`;
  }

  public getCookieForLogOut() {
    return "Authentication=; HttpOnly; Path=/; Max-Age=0";
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        "Wrong credentials provided",
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
