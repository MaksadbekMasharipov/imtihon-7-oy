"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    nodeEnv: process.env.NODE_ENV ?? 'development',
    port: parseInt(process.env.PORT ?? '3000', 10),
    database: {
        host: process.env.DB_HOST ?? 'localhost',
        port: parseInt(process.env.DB_PORT ?? '5432', 10),
        username: process.env.DB_USERNAME ?? 'postgres',
        password: process.env.DB_PASSWORD ?? 'postgres',
        name: process.env.DB_NAME ?? 'education_crm',
        synchronize: process.env.DB_SYNCHRONIZE === 'true',
    },
    jwt: {
        secret: process.env.JWT_SECRET ?? 'dev-secret-change-me',
        expiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
    },
});
//# sourceMappingURL=configuration.js.map