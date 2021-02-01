
interface TokenInfo {
    tokens: {
        [key: string]: number
    },
    ids: {
        [key: number]: string
    }
}

export const tokenInfo: TokenInfo = {
    tokens: {},
    ids: {}
};

export function registerToken(id: number, token: string) {

    delete tokenInfo.tokens[tokenInfo.ids[id]];

    tokenInfo.ids[id] = token;
    tokenInfo.tokens[token] = id;
}

export function unregisterToken(token: string) {
    delete tokenInfo.ids[tokenInfo.tokens[token]];
    delete tokenInfo.tokens[token];
}

export function fetchToken(id: number) {
    return tokenInfo.ids[id];
}
