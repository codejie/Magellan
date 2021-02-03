export interface Header {
    code: number,
    text?: string
}

export type Body = any;

export interface Result {
    header: Header,
    body?: Body
}

