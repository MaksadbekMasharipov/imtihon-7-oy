import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RegisterSuperAdminDto } from './dto/register-superadmin.dto';
import { Role } from '../../common/enums/role.enum';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            role: Role;
            teacherId: string | null;
        };
    }>;
    register(dto: RegisterDto, role: string): Promise<import("../users/entities/user.entity").User>;
    registerSuperAdmin(dto: RegisterSuperAdminDto): Promise<import("../users/entities/user.entity").User>;
}
