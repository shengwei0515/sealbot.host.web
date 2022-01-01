export class HostWebApis {
    public static AuthLogin = '/api/auth/login'
}

export type AuthLoginParameter = {
    code: string;
    scope?: string;
    state?: string;
}

export type AuthLoginResponse = {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string[];
    token_type: string;
}