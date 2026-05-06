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
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const attendance_entity_1 = require("./entities/attendance.entity");
const attendance_status_enum_1 = require("../../common/enums/attendance-status.enum");
let AttendanceService = class AttendanceService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async mark(dto) {
        const existing = await this.repo.findOne({
            where: { studentId: dto.studentId, groupId: dto.groupId, date: dto.date },
        });
        if (existing) {
            existing.status = dto.status;
            return this.repo.save(existing);
        }
        const record = this.repo.create(dto);
        return this.repo.save(record);
    }
    async getByDate(date, groupId) {
        const where = { date };
        if (groupId)
            where.groupId = groupId;
        return this.repo.find({
            where,
            relations: ['student', 'group'],
            order: { createdAt: 'DESC' },
        });
    }
    async getAbsentStudents(date, groupId) {
        const records = await this.repo.find({
            where: { date, groupId, status: attendance_status_enum_1.AttendanceStatus.ABSENT },
            relations: ['student'],
            order: { createdAt: 'DESC' },
        });
        return records.map((r) => r.student);
    }
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(attendance_entity_1.Attendance)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map