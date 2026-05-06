export interface JwtPayloadUser {
    sub: string;
    email: string;
    role: string;
}
export declare const CurrentUser: (...dataOrPipes: (keyof JwtPayloadUser | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>> | undefined)[]) => ParameterDecorator;
