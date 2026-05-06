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
exports.TeachersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const teacher_entity_1 = require("./entities/teacher.entity");
let TeachersService = class TeachersService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) {
        const teacher = this.repo.create({
            ...dto,
            image: dto.image ?? null,
            userId: null,
        });
        return this.repo.save(teacher);
    }
    async findAll(query) {
        const page = query.page ?? 1;
        const limit = query.limit ?? 10;
        const qb = this.repo
            .createQueryBuilder('t')
            .orderBy('t.createdAt', 'DESC');
        if (query.search?.trim()) {
            const term = `%${query.search.trim()}%`;
            qb.andWhere(new typeorm_2.Brackets((w) => {
                w.where('t.fullName ILIKE :term', { term }).orWhere('t.phone ILIKE :term', { term });
            }));
        }
        const total = await qb.getCount();
        const data = await qb
            .skip((page - 1) * limit)
            .take(limit)
            .getMany();
        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.max(1, Math.ceil(total / limit)),
            },
        };
    }
    async findOne(id) {
        const teacher = await this.repo.findOne({ where: { id } });
        if (!teacher) {
            throw new common_1.NotFoundException('Teacher not found');
        }
        return teacher;
    }
    async update(id, dto) {
        const teacher = await this.findOne(id);
        Object.assign(teacher, {
            ...dto,
            image: dto.image === undefined ? teacher.image : dto.image ?? null,
        });
        return this.repo.save(teacher);
    }
    async remove(id) {
        const teacher = await this.findOne(id);
        await this.repo.remove(teacher);
    }
    async countAll() {
        return this.repo.count();
    }
};
exports.TeachersService = TeachersService;
exports.TeachersService = TeachersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(teacher_entity_1.Teacher)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TeachersService);
//# sourceMappingURL=teachers.service.js.map