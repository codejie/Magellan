
export const runtimeItems: string[] = [
    'price', 'high', 'low', 'percent', 'updown',
    'bid1', 'bidvol1', 'bid2', 'bidvol2', 'bid3', 'bidvol3', 
    'bid4', 'bidvol4', 'bid5', 'bidvol5',
    'ask1', 'askvol1', 'ask2', 'askvol2', 'ask3', 'askvol3', 
    'ask4', 'askvol4', 'ask5', 'askvol5',
    'volume', 'turnover'
];

export function makeStockCode(type: number, code: string): string {
    if (type === 1) {
        return '0' + code;
    }
    throw new Error('unknown stock type - ' + type);
}

export function makeRandomString(size: number = 8): string {
    return Math.random().toString(36).substr(2, size)
}