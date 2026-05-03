import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Teacher } from '../../teachers/entities/teacher.entity';
import { Student } from '../../students/entities/student.entity';
import { Attendance } from '../../attendance/entities/attendance.entity';
import { Payment } from '../../payments/entities/payment.entity';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'teacher_id', type: 'uuid' })
  teacherId: string;

  @ManyToOne(() => Teacher, (teacher) => teacher.groups, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;

  @Column({ type: 'varchar' })
  days: string;

  @Column({ type: 'varchar' })
  time: string;

  @ManyToMany(() => Student, (student) => student.groups, { cascade: false })
  @JoinTable({
    name: 'group_students',
    joinColumn: { name: 'group_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'student_id', referencedColumnName: 'id' },
  })
  students: Student[];

  @OneToMany(() => Attendance, (a) => a.group)
  attendanceRecords: Attendance[];

  @OneToMany(() => Payment, (p) => p.group)
  payments: Payment[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
