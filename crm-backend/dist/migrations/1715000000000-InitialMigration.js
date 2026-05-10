"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialMigration1715000000000 = void 0;
class InitialMigration1715000000000 {
    name = 'InitialMigration1715000000000';
    async up(queryRunner) {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.query(`CREATE TYPE "users_role_enum" AS ENUM('SUPERADMIN','ADMIN','TEACHER')`);
        await queryRunner.query(`CREATE TYPE "attendance_status_enum" AS ENUM('PRESENT','ABSENT')`);
        await queryRunner.query(`CREATE TABLE "users" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
      "email" character varying NOT NULL,
      "password_hash" character varying NOT NULL,
      "role" "users_role_enum" NOT NULL,
      "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      CONSTRAINT "UQ_users_email" UNIQUE ("email"),
      CONSTRAINT "PK_users_id" PRIMARY KEY ("id")
    )`);
        await queryRunner.query(`CREATE TABLE "teachers" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
      "full_name" character varying NOT NULL,
      "phone" character varying NOT NULL,
      "image" character varying,
      "user_id" uuid,
      "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      CONSTRAINT "UQ_teachers_user_id" UNIQUE ("user_id"),
      CONSTRAINT "PK_teachers_id" PRIMARY KEY ("id")
    )`);
        await queryRunner.query(`CREATE TABLE "groups" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
      "name" character varying NOT NULL,
      "teacher_id" uuid NOT NULL,
      "days" character varying NOT NULL,
      "time" character varying NOT NULL,
      "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      CONSTRAINT "PK_groups_id" PRIMARY KEY ("id")
    )`);
        await queryRunner.query(`CREATE TABLE "students" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
      "full_name" character varying NOT NULL,
      "phone" character varying NOT NULL,
      "parent_name" character varying NOT NULL,
      "parent_phone" character varying NOT NULL,
      "direction" character varying NOT NULL,
      "image" character varying,
      "left_at" TIMESTAMP WITH TIME ZONE,
      "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      CONSTRAINT "PK_students_id" PRIMARY KEY ("id")
    )`);
        await queryRunner.query(`CREATE TABLE "contact_requests" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
      "full_name" character varying NOT NULL,
      "phone" character varying NOT NULL,
      "note" text,
      "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      CONSTRAINT "PK_contact_requests_id" PRIMARY KEY ("id")
    )`);
        await queryRunner.query(`CREATE TABLE "group_students" (
      "group_id" uuid NOT NULL,
      "student_id" uuid NOT NULL,
      CONSTRAINT "PK_group_students" PRIMARY KEY ("group_id","student_id")
    )`);
        await queryRunner.query(`CREATE TABLE "attendance" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
      "student_id" uuid NOT NULL,
      "group_id" uuid NOT NULL,
      "date" date NOT NULL,
      "status" "attendance_status_enum" NOT NULL,
      "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      CONSTRAINT "PK_attendance_id" PRIMARY KEY ("id")
    )`);
        await queryRunner.query(`CREATE TABLE "payments" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
      "student_id" uuid NOT NULL,
      "group_id" uuid NOT NULL,
      "amount" numeric(12,2) NOT NULL,
      "payment_date" date NOT NULL,
      "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      CONSTRAINT "PK_payments_id" PRIMARY KEY ("id")
    )`);
        await queryRunner.query(`ALTER TABLE "teachers" ADD CONSTRAINT "FK_teachers_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_groups_teacher_id" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_students" ADD CONSTRAINT "FK_group_students_group_id" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_students" ADD CONSTRAINT "FK_group_students_student_id" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD CONSTRAINT "FK_attendance_student_id" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD CONSTRAINT "FK_attendance_group_id" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_attendance_student_group_date" ON "attendance" ("student_id","group_id","date")`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_payments_student_id" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_payments_group_id" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_payments_group_id"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_payments_student_id"`);
        await queryRunner.query(`DROP INDEX "IDX_attendance_student_group_date"`);
        await queryRunner.query(`ALTER TABLE "attendance" DROP CONSTRAINT "FK_attendance_group_id"`);
        await queryRunner.query(`ALTER TABLE "attendance" DROP CONSTRAINT "FK_attendance_student_id"`);
        await queryRunner.query(`ALTER TABLE "group_students" DROP CONSTRAINT "FK_group_students_student_id"`);
        await queryRunner.query(`ALTER TABLE "group_students" DROP CONSTRAINT "FK_group_students_group_id"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_groups_teacher_id"`);
        await queryRunner.query(`ALTER TABLE "teachers" DROP CONSTRAINT "FK_teachers_user_id"`);
        await queryRunner.query(`DROP TABLE "payments"`);
        await queryRunner.query(`DROP TABLE "attendance"`);
        await queryRunner.query(`DROP TABLE "group_students"`);
        await queryRunner.query(`DROP TABLE "contact_requests"`);
        await queryRunner.query(`DROP TABLE "students"`);
        await queryRunner.query(`DROP TABLE "groups"`);
        await queryRunner.query(`DROP TABLE "teachers"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "attendance_status_enum"`);
        await queryRunner.query(`DROP TYPE "users_role_enum"`);
    }
}
exports.InitialMigration1715000000000 = InitialMigration1715000000000;
//# sourceMappingURL=1715000000000-InitialMigration.js.map