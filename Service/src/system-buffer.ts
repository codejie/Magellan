
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

export function registerToken(id: number, token: string): void {

    delete tokenInfo.tokens[tokenInfo.ids[id]];

    tokenInfo.ids[id] = token;
    tokenInfo.tokens[token] = id;
}

export function unregisterToken(token: string): void {
    delete tokenInfo.ids[tokenInfo.tokens[token]];
    delete tokenInfo.tokens[token];
}

export function unregisterId(id: number): void {
    delete tokenInfo.tokens[tokenInfo.ids[id]];
    delete tokenInfo.ids[id];
}

export function fetchToken(id: number): string | undefined {
    return tokenInfo.ids[id];
}

export function fetchTokenId(token: string): number | undefined {
    return tokenInfo.tokens[token];
}
