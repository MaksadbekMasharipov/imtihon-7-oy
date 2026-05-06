import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { TeachersService } from '../teachers/teachers.service';
import { StudentsService } from '../students/students.service';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly repo: Repository<Group>,
    private readonly teachersService: TeachersService,
    private readonly studentsService: StudentsService,
  ) {}

  async create(dto: CreateGroupDto): Promise<Group> {
    await this.teachersService.findOne(dto.teacherId);
    const group = this.repo.create({ ...dto });
    return this.repo.save(group);
  }

  async findAll(): Promise<Group[]> {
    return this.repo.find({ relations: ['teacher'] });
  }

  async findOneWithStudentsCount(id: string) {
    const qb = this.repo
      .createQueryBuilder('g')
      .leftJoinAndSelect('g.teacher', 't')
      .where('g.id = :id', { id })
      .loadRelationCountAndMap('g.studentsCount', 'g.students');

    const group = await qb.getOne();
    if (!group) {
      throw new NotFoundException('Group not found');
    }
    return group as Group & { studentsCount: number };
  }

  async update(id: string, dto: UpdateGroupDto): Promise<Group> {
    const group = await this.repo.findOne({ where: { id } });
    if (!group) {
      throw new NotFoundException('Group not found');
    }
    if (dto.teacherId) {
      await this.teachersService.findOne(dto.teacherId);
    }
    Object.assign(group, dto);
    return this.repo.save(group);
  }

  async assignTeacher(id: string, teacherId: string): Promise<Group> {
    return this.update(id, { teacherId });
  }

  async addStudent(groupId: string, studentId: string) {
    const group = await this.repo.findOne({
      where: { id: groupId },
      relations: ['students'],
    });
    if (!group) throw new NotFoundException('Group not found');

    const student = await this.studentsService.findOne(studentId);
    group.students = group.students ?? [];
    if (!group.students.some((s) => s.id === student.id)) {
      group.students.push(student);
    }
    await this.repo.save(group);
    return { ok: true };
  }

  async removeStudent(groupId: string, studentId: string) {
    const group = await this.repo.findOne({
      where: { id: groupId },
      relations: ['students'],
    });
    if (!group) throw new NotFoundException('Group not found');
    group.students = (group.students ?? []).filter((s) => s.id !== studentId);
    await this.repo.save(group);
    return { ok: true };
  }

  async countAll(): Promise<number> {
    return this.repo.count();
  }
}