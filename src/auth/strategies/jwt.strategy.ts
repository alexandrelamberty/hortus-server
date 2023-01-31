import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "../constants";
import { Request } from "express";
import { AuthService } from "../auth.service";
import { UsersService } from "../../users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {
    /*
    // Bearer Token
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
    */
    // Cookie
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    console.log("JwtStrategy::validate", payload.id);
    const user = await this.usersService.findOne(payload.id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
