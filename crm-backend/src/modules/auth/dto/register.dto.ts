import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { Role } from '../../../common/enums/role.enum';

export class RegisterDto {
  @ApiProperty({ example: 'user@center.uz' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'SecurePassword123!' })
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiProperty({ enum: [Role.ADMIN, Role.TEACHER], example: Role.TEACHER })
  @IsEnum(Role)
  role!: Role;
}
