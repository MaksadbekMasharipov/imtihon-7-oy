import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../../../common/enums/role.enum';
import { Teacher } from '../../teachers/entities/teacher.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'password_hash' })
  passwordHash: string;

  @Column({ type: 'enum', enum: Role })
  role: Role;

  @OneToOne(() => Teacher, (teacher) => teacher.user)
  teacher: Teacher | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
