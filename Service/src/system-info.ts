import { Stock } from "./definition/struct-define";

export interface SystemInfo {
    stocks: Stock[]
}

export default {
    stocks: []
} as SystemInfo;