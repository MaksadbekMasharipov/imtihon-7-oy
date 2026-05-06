import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
export declare class PaymentsService {
    private readonly repo;
    constructor(repo: Repository<Payment>);
    create(dto: CreatePaymentDto): Promise<Payment>;
    list(params: {
        from?: string;
        to?: string;
        studentId?: string;
        groupId?: string;
    }): Promise<Payment[]>;
    unpaidStudents(groupId: string, month: string): Promise<any>;
}
