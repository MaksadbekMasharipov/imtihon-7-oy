import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';

function monthRange(month: string): { from: string; to: string } {
  // month: YYYY-MM
  const [y, m] = month.split('-').map((v) => parseInt(v, 10));
  const from = new Date(Date.UTC(y, m - 1, 1));
  const to = new Date(Date.UTC(y, m, 1));
  return {
    from: from.toISOString().slice(0, 10),
    to: to.toISOString().slice(0, 10),
  };
}

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly repo: Repository<Payment>,
  ) {}

  async create(dto: CreatePaymentDto) {
    const payment = this.repo.create(dto);
    return this.repo.save(payment);
  }

  async list(params: { from?: string; to?: string; studentId?: string; groupId?: string }) {
    const qb = this.repo
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.student', 's')
      .leftJoinAndSelect('p.group', 'g')
      .orderBy('p.paymentDate', 'DESC');

    if (params.studentId) qb.andWhere('p.studentId = :studentId', { studentId: params.studentId });
    if (params.groupId) qb.andWhere('p.groupId = :groupId', { groupId: params.groupId });
    if (params.from) qb.andWhere('p.paymentDate >= :from', { from: params.from });
    if (params.to) qb.andWhere('p.paymentDate <= :to', { to: params.to });

    return qb.getMany();
  }

  async unpaidStudents(groupId: string, month: string) {
    const { from, to } = monthRange(month);
    // Students in group without any payment within month
    const rows = await this.repo.query(
      `
      SELECT s.*
      FROM students s
      INNER JOIN group_students gs ON gs.student_id = s.id
      WHERE gs.group_id = $1
        AND NOT EXISTS (
          SELECT 1 FROM payments p
          WHERE p.student_id = s.id
            AND p.group_id = $1
            AND p.payment_date >= $2
            AND p.payment_date < $3
        )
      ORDER BY s.created_at DESC
      `,
      [groupId, from, to],
    );
    return rows;
  }
}