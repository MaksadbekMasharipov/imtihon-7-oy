"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payment_entity_1 = require("./entities/payment.entity");
function monthRange(month) {
    const [y, m] = month.split('-').map((v) => parseInt(v, 10));
    const from = new Date(Date.UTC(y, m - 1, 1));
    const to = new Date(Date.UTC(y, m, 1));
    return {
        from: from.toISOString().slice(0, 10),
        to: to.toISOString().slice(0, 10),
    };
}
let PaymentsService = class PaymentsService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) {
        const payment = this.repo.create(dto);
        return this.repo.save(payment);
    }
    async list(params) {
        const qb = this.repo
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.student', 's')
            .leftJoinAndSelect('p.group', 'g')
            .orderBy('p.paymentDate', 'DESC');
        if (params.studentId)
            qb.andWhere('p.studentId = :studentId', { studentId: params.studentId });
        if (params.groupId)
            qb.andWhere('p.groupId = :groupId', { groupId: params.groupId });
        if (params.from)
            qb.andWhere('p.paymentDate >= :from', { from: params.from });
        if (params.to)
            qb.andWhere('p.paymentDate <= :to', { to: params.to });
        return qb.getMany();
    }
    async unpaidStudents(groupId, month) {
        const { from, to } = monthRange(month);
        const rows = await this.repo.query(`
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
      `, [groupId, from, to]);
        return rows;
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map