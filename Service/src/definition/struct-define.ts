export interface Stock {
    id: number,
    type: number,
    market: number,
    code: string
}

export interface StockInfo {
    info: Stock,
    data?: {
    },
    last?: Date
}
