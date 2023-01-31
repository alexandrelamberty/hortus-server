import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { User } from "../users/schemas/user.schema";
import { UsersService } from "../users/users.service";
import { jwtConstants } from "./constants";
import { RegisterUserDto } from "./dtos/register-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async registerUser(dto: RegisterUserDto): Promise<User> {
    // check email in use
    const exist = await this.usersService.findByEmail(dto.email);
    if (exist) {
      throw new Error("email already in use");
    }
    // hash password
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    // create user
    const user = await this.usersService.register({
      ...dto,
      password: hashedPassword,
    });
    return user;
  }

  // FIXME: Create LoginUserDto
  loginUser(user: any) {
    const payload = { email: user.email, password: user.password };
    return {
      access_token: this.jwtService.sign(payload, jwtConstants),
    };
  }

  async logoutUser(username: string) {
    // hash password
    // save user
  }

  public async validateUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.findByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      return user;
    } catch (error) {
      throw new HttpException(
        "Wrong credentials provided",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  public validateToken(token: string): boolean {
    // Validate the token sent by mail to verify a user email address.
    return true;
  }

  public getJwtToken(id: string) {
    const token = this.jwtService.sign(id);
    return {
      access_token: token,
    };
  }

  public getCookieWithJwtToken(id: string) {
    const payload: any = { id };
    const token = this.jwtService.sign(payload, jwtConstants);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=2000}`;
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
