export class TwitchApis {
    public static OAUTH2_AUTHORIZE = 'https://id.twitch.tv/oauth2/authorize'
}

export type TwitchOauthCodeFlowGetCodeParameter = {
    client_id: string;
    redirect_uri: string;
    response_type: string;
    scope: string;
    state?: string;
    force_verify?: boolean; // only for oauth flow to force user re-verify everytime
    claims?: any; // only for oidc
    nonce?: any; // only for oidc
}

// reference https://dev.twitch.tv/docs/authentication/getting-tokens-oidc#claims
export type TwichOidcClaims = {
    id_token: any,
    userinfo: any,
}

export type TwitchOauthCodeFlowGetCodeResponse = {
    code: string;
    scope: string;
    state?: string;
}