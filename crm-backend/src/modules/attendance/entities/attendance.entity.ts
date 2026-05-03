import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AttendanceStatus } from '../../../common/enums/attendance-status.enum';
import { Student } from '../../students/entities/student.entity';
import { Group } from '../../groups/entities/group.entity';

@Entity('attendance')
@Index(['studentId', 'groupId', 'date'], { unique: true })
export class Attendance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'student_id', type: 'uuid' })
  studentId: string;

  @ManyToOne(() => Student, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @Column({ name: 'group_id', type: 'uuid' })
  groupId: string;

  @ManyToOne(() => Group, (g) => g.attendanceRecords, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'enum', enum: AttendanceStatus })
  status: AttendanceStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
