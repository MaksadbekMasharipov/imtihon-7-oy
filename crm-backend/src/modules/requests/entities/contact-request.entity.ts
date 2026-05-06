import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Public intake form; class name avoids clash with Express `Request`
@Entity('contact_requests')
export class ContactRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column()
  phone: string;

  @Column({ type: 'text', nullable: true })
  note: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
