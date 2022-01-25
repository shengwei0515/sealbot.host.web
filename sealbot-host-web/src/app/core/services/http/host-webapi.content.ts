export class HostWebApis {
    public static TwitchAuthAuthorizePageUrl = '/api/twitch-auth/authorize-page-url'
    public static TwitchAuthToken = '/api/twitch-auth/token'
}

export type TwitchLoginAuthorizePageUrlViewModel = {
    url: string;
}

export type TwitchLoginTokenParameter = {
    code?: string;
    scope?: string;
    state?: string;
}

export type TwitchLoginTokenViewModel = {
    accessToken: string;
    refreshToken: string;
}