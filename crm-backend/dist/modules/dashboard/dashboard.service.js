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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const groups_service_1 = require("../groups/groups.service");
const students_service_1 = require("../students/students.service");
const teachers_service_1 = require("../teachers/teachers.service");
const payments_service_1 = require("../payments/payments.service");
function monthRangeUtc(month) {
    const [y, m] = month.split('-').map((v) => parseInt(v, 10));
    const from = new Date(Date.UTC(y, m - 1, 1));
    const to = new Date(Date.UTC(y, m, 1));
    return { from, to };
}
let DashboardService = class DashboardService {
    studentsService;
    teachersService;
    groupsService;
    paymentsService;
    constructor(studentsService, teachersService, groupsService, paymentsService) {
        this.studentsService = studentsService;
        this.teachersService = teachersService;
        this.groupsService = groupsService;
        this.paymentsService = paymentsService;
    }
    async totals() {
        const [studentsActive, studentsLeft, teachers, groups] = await Promise.all([
            this.studentsService.countActive(),
            this.studentsService.countLeft(),
            this.teachersService.countAll(),
            this.groupsService.countAll(),
        ]);
        return {
            totalStudents: studentsActive + studentsLeft,
            totalTeachers: teachers,
            totalGroups: groups,
            studentsLeft,
        };
    }
    async monthlyStats(month) {
        const { from, to } = monthRangeUtc(month);
        const payments = await this.paymentsService.list({
            from: from.toISOString().slice(0, 10),
            to: new Date(to.getTime() - 1).toISOString().slice(0, 10),
        });
        const paymentsTotal = payments.reduce((sum, p) => sum + Number(p.amount), 0);
        return {
            month,
            paymentsCount: payments.length,
            paymentsTotal,
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [students_service_1.StudentsService,
        teachers_service_1.TeachersService,
        groups_service_1.GroupsService,
        payments_service_1.PaymentsService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map