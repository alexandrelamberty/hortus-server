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
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.usersService.register({
      ...dto,
      password: hashedPassword,
    });
    return user;
  }

  loginUser(user: any) {
    const payload = { email: user.email, password: user.password };
    const token = this.jwtService.sign(payload, jwtConstants);
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

  // Validate the token sent by mail to verify a user email address.
  public validateToken(token: string): boolean {
    return true;
  }

  /**
   * Validate the user, used by the LocalStrategy
   * @param email
   * @param plainTextPassword
   * @returns
   */
  public async validateUser(
    email: string,
    plainTextPassword: string
  ): Promise<User> {
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
