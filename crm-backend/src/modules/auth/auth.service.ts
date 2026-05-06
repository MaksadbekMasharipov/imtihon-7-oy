import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { Role } from '../../common/enums/role.enum';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto, currentUserRole: string) {
    // if (currentUserRole !== Role.SUPERADMIN) {
    //   throw new ForbiddenException('Only SUPERADMIN can register new users');
    // }
    return this.usersService.create({
      email: dto.email,
      password: dto.password,
      role: dto.role,
    });
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const ok = await this.usersService.validatePassword(
      dto.password,
      user.passwordHash,
    );
    if (!ok) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        teacherId: user.teacher?.id ?? null,
      },
    };
  }
}
