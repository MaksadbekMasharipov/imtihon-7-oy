import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from '../../common/enums/role.enum';
export declare class UsersService {
    private readonly usersRepo;
    constructor(usersRepo: Repository<User>);
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    findOneByRole(role: Role): Promise<User | null>;
    create(data: {
        email: string;
        password: string;
        role: Role;
    }): Promise<User>;
    validatePassword(plain: string, hash: string): Promise<boolean>;
}
