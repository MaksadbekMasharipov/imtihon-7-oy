import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterSuperAdminDto {
  @ApiProperty({ example: 'superadmin@center.uz' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'SuperAdminPassword123!' })
  @IsString()
  @MinLength(6)
  password!: string;
}
