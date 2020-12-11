export interface BaseInfo {
    id: number,
    type: number,
    code: string,
    market: number,
    name: string,
    created: Date
}

export interface RuntimeData {
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

export interface DayData {
    id: number,
    todayopen: number,
    yestclose: number,
    todayclose?: number,
    todaydate: Date,
    created: Date  
}

//////////////
// query condition

export interface RuntimeDataSelectCondtion {
    id?: number,
    start?: Date,
    end?: Date
}

export interface DayDataSelectCondition {
    id?: number,
    start: Date,
    end?: Date
}