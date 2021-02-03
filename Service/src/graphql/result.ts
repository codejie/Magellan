export const ResultHeader: {
    [key: string]: Header
} = {
    OK: {
        code: 0
    },
    INVALID_TOKEN: {
        code: -1,
        text: 'invalid token.'
    }
}

export interface Header {
    code: number,
    text?: string
}

export type Body = any;

export interface Result {
    header: Header,
    body?: Body
}

export function errorResult(code: number, text?: string, body?: Body): Promise<Result> {
    return new Promise<Result>((resolve, reject) => {
        resolve({
            header: {
                code,
                text
            },
            body
        });
    });
}

export function makeResult(header: Header, body?: Body): Promise<Result> {
    return new Promise<Result>((resolve, reject) => {
        resolve({
            header,
            body
        });
    });
}