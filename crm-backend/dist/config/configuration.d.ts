declare const _default: () => {
    nodeEnv: string;
    port: number;
    database: {
        host: string;
        port: number;
        username: string;
        password: string;
        name: string;
        synchronize: boolean;
    };
    jwt: {
        secret: string;
        expiresIn: string;
    };
};
export default _default;
