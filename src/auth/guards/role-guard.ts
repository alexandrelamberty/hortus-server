import { CanActivate, ExecutionContext, mixin, Type } from "@nestjs/common";
import { Role } from "../enums/role.enum";
import RequestWithUser from "../interfaces/request-with-user";

const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const user = request.user;

      // FIXME:
      // return user?.roles.includes(role);
      return true;
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
