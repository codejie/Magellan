import { Header } from "../graphql/result";

export interface StockInfo {
    id: number,
    type: number,
    code: string,
    market: number,
    name: string,
    created: Date
}

export interface StockDayData {
    id: number,
    todayopen: number,
    yestclose: number,
    todayclose?: number,
    todaydate: Date,
    created: Date  
}

export interface StockRuntimeData {
    id: number,
    price: number,
    high: number,
    low: number,
    percent: number,
    updown: number,
    bid1: number,
    bidvol1: number,
    bid2: number,
    bidvol2: number,
    bid3: number,
    bidvol3: number,
    bid4: number,
    bidvol4: number,
    bid5: number,
    bidvol5: number,
    ask1: number,
    askvol1: number,
    ask2: number,
    askvol2: number,
    ask3: number,
    askvol3: number,
    ask4: number,
    askvol4: number,
    ask5: number,
    askvol5: number,
    volume: number,
    turnover: number,
    updated: Date,
    created: Date
}

export interface TradeDay {
    id: number,
    date: Date,
    flag: number // 0: trade day, 1: weekend, 2: holiday, 3: other
}

export interface PersonInfo {
    id: number,
    name: string,
    flag: number,
    passwd: string,
    created: Date,
    updated: Date
}

export interface PersonToken {
    header: Header,
    body?: {
        name: string,
        flag: number,
        token: string
    }
}

export interface PersonStockData {
    id: number,
    stockId: number,
    total: number,
    price: number,
    updated: Date
}

export const ACTION_STOCK_BUY = 0;
export const ACTION_STOCK_SELL = 1;
export const ACTION_STOCK_SHARE = 2;

export interface PersonStockLog {
    logId: number,
    id: number,
    stockId: number,
    action: number, //0: buy, 1: sell, 2, share
    total: number,
    price: number,
    created: Date
}

export interface PersonFundData {
    id: number,
    base: number,
    valid: number,
    updated: Date
}

//////////////
// query condition

// export interface RuntimeDataSelectCondtion {
//     id?: number,
//     start?: Date,
//     end?: Date
// }

// export interface DayDataSelectCondition {
//     id?: number,
//     start: Date,
//     end?: Date
// }