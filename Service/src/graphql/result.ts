export const ResultHeader: {
    [key: string]: Header
} = {
    OK: {
        code: 0
    },
    INVALID_TOKEN: {
        code: -1,
        text: 'invalid token.'
    },
    SYSTEM_ERROR: {
        code: -255,
        text: 'system error.'
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

export function errorResult(header: Header, text?: string, body?: Body): Promise<Result> {
    return new Promise<Result>((resolve, reject) => {
        if (text) {
            resolve({
                header: {
                    code: header.code,
                    text
                },
                body
            });
        } else {
            resolve({
                header,
                body
            });
        }
    });
}

export function makeResult(body?: Body, header: Header = ResultHeader.OK): Promise<Result> {
    return new Promise<Result>((resolve, reject) => {
        resolve({
            header,
            body
        });
    });
}