import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Group } from '../../groups/entities/group.entity';

@Entity('teachers')
export class Teacher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column()
  phone: string;

  @Column({ type: 'varchar', nullable: true })
  image: string | null;

  @Column({ name: 'user_id', type: 'uuid', nullable: true, unique: true })
  userId: string | null;

  @OneToOne(() => User, (user) => user.teacher, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User | null;

  @OneToMany(() => Group, (group) => group.teacher)
  groups: Group[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
