import { Stock } from "./definition/struct-define";

export interface SystemInfo {
    isTradeDay: boolean;
    stocks: Stock[]
}

export default {
    isTradeDay: false,
    stocks: []
} as SystemInfo;