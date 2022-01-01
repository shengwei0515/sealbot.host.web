export class TwitchApis {
    public static OAUTH2_AUTHORIZE = 'https://id.twitch.tv/oauth2/authorize'
}

export type TwitchAuthorizationGantParameter = {
    client_id: string;
    redirect_uri: string;
    response_type: string;
    scope: string;
    claims?: any
}

// reference https://dev.twitch.tv/docs/authentication/getting-tokens-oidc#claims
export type TwichClaims = {
    id_token: any,
    userinfo: any,
}

export type TwitchAuthorizationGantResponse = {
    code: string;
    scope: string;
    state?: string;
}