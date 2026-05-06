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
exports.MarkAttendanceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const attendance_status_enum_1 = require("../../../common/enums/attendance-status.enum");
class MarkAttendanceDto {
    studentId;
    groupId;
    date;
    status;
}
exports.MarkAttendanceDto = MarkAttendanceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], MarkAttendanceDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], MarkAttendanceDto.prototype, "groupId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Attendance date (YYYY-MM-DD)', example: '2026-05-04' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], MarkAttendanceDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: attendance_status_enum_1.AttendanceStatus, example: attendance_status_enum_1.AttendanceStatus.PRESENT }),
    (0, class_validator_1.IsEnum)(attendance_status_enum_1.AttendanceStatus),
    __metadata("design:type", String)
], MarkAttendanceDto.prototype, "status", void 0);
//# sourceMappingURL=mark-attendance.dto.js.map