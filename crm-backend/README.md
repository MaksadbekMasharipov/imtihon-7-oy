## Education CRM Backend (NestJS + PostgreSQL + TypeORM)

### Tech
- NestJS (latest)
- PostgreSQL
- TypeORM (entities + relations)
- JWT auth (roles: `ADMIN`, `TEACHER`)
- DTO validation (`class-validator`)
- Swagger at `/docs`

### Setup
1. Copy env:

```bash
cp .env.example .env
```

2. Configure PostgreSQL in `.env` and run:

```bash
npm install
npm run start:dev
```

### Swagger
- Open `http://localhost:4001/docs`
- Use `POST /auth/login` to get a token, then click **Authorize** and paste `Bearer <token>`.

### Notes
- `DB_SYNCHRONIZE=true` is enabled by default for local dev (see `.env.example`). Disable it in production and use migrations.

