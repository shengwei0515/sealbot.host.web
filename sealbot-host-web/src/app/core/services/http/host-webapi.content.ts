export class HostWebApis {
    public static TwitchLoginAuthorizePageUrl = '/api/twitch-login/authorize-page-url'
    public static TwitchLoginToken = '/api/twitch-login/token'
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