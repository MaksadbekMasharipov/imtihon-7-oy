import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    create(dto: CreatePaymentDto): Promise<import("./entities/payment.entity").Payment>;
    list(from?: string, to?: string, studentId?: string, groupId?: string): Promise<import("./entities/payment.entity").Payment[]>;
    unpaid(groupId: string, month: string): Promise<any>;
}
