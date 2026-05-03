import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Group } from '../../groups/entities/group.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column()
  phone: string;

  @Column({ name: 'parent_name' })
  parentName: string;

  @Column({ name: 'parent_phone' })
  parentPhone: string;

  @Column()
  direction: string;

  @Column({ type: 'varchar', nullable: true })
  image: string | null;

  @Column({ name: 'left_at', type: 'timestamptz', nullable: true })
  leftAt: Date | null;

  @ManyToMany(() => Group, (group) => group.students)
  groups: Group[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
