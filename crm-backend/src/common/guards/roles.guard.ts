import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { JwtPayloadUser } from '../decorators/current-user.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles?.length) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest<{ user: JwtPayloadUser }>();
    if (!user) {
      throw new ForbiddenException();
    }
    const ok = requiredRoles.some((role) => role === user.role);
    if (!ok) {
      throw new ForbiddenException('Insufficient role');
    }
    return true;
  }
}
