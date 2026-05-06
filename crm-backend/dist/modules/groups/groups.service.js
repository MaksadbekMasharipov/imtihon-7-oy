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
exports.GroupsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const group_entity_1 = require("./entities/group.entity");
const teachers_service_1 = require("../teachers/teachers.service");
const students_service_1 = require("../students/students.service");
let GroupsService = class GroupsService {
    repo;
    teachersService;
    studentsService;
    constructor(repo, teachersService, studentsService) {
        this.repo = repo;
        this.teachersService = teachersService;
        this.studentsService = studentsService;
    }
    async create(dto) {
        await this.teachersService.findOne(dto.teacherId);
        const group = this.repo.create({ ...dto });
        return this.repo.save(group);
    }
    async findAll() {
        return this.repo.find({ relations: ['teacher'] });
    }
    async findOneWithStudentsCount(id) {
        const qb = this.repo
            .createQueryBuilder('g')
            .leftJoinAndSelect('g.teacher', 't')
            .where('g.id = :id', { id })
            .loadRelationCountAndMap('g.studentsCount', 'g.students');
        const group = await qb.getOne();
        if (!group) {
            throw new common_1.NotFoundException('Group not found');
        }
        return group;
    }
    async update(id, dto) {
        const group = await this.repo.findOne({ where: { id } });
        if (!group) {
            throw new common_1.NotFoundException('Group not found');
        }
        if (dto.teacherId) {
            await this.teachersService.findOne(dto.teacherId);
        }
        Object.assign(group, dto);
        return this.repo.save(group);
    }
    async assignTeacher(id, teacherId) {
        return this.update(id, { teacherId });
    }
    async addStudent(groupId, studentId) {
        const group = await this.repo.findOne({
            where: { id: groupId },
            relations: ['students'],
        });
        if (!group)
            throw new common_1.NotFoundException('Group not found');
        const student = await this.studentsService.findOne(studentId);
        group.students = group.students ?? [];
        if (!group.students.some((s) => s.id === student.id)) {
            group.students.push(student);
        }
        await this.repo.save(group);
        return { ok: true };
    }
    async removeStudent(groupId, studentId) {
        const group = await this.repo.findOne({
            where: { id: groupId },
            relations: ['students'],
        });
        if (!group)
            throw new common_1.NotFoundException('Group not found');
        group.students = (group.students ?? []).filter((s) => s.id !== studentId);
        await this.repo.save(group);
        return { ok: true };
    }
    async countAll() {
        return this.repo.count();
    }
};
exports.GroupsService = GroupsService;
exports.GroupsService = GroupsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(group_entity_1.Group)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        teachers_service_1.TeachersService,
        students_service_1.StudentsService])
], GroupsService);
//# sourceMappingURL=groups.service.js.map