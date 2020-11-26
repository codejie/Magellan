import { RuntimeData, DayData } from "../definition/data-define";
import { Stock } from "../definition/struct-define";
import Fetcher from "./fetcher";
import { makeRandomString, makeStockCode, runtimeItems } from "./netease-util";

export default class NetEaseFetcher extends Fetcher {

    private readonly BASE_RUNTIME_DATA: string = 'http://api.money.126.net/data/feed/';

    fetchRuntime(req: Stock): Promise<any> {
        const code: string = makeStockCode(req.type, req.market, req.code);
        const url = this.BASE_RUNTIME_DATA + code + '?callback=_ntes_quote_callback' + makeRandomString();

        return new Promise<any>((resolve, reject) => {
            super.fetchUrl(url).then(ret => {
                const data = ret.substring(ret.indexOf('{'), ret.lastIndexOf('}') + 1);
                const runtime = JSON.parse(data);
                resolve(runtime[code]);
            }).catch(err => {
                reject(err);
            });
        });
    }
    makeRuntimeData(req: Stock, data: any): RuntimeData {
        const ret: any = {
            id: req.id,
            updated: data['update']
        };
        runtimeItems.forEach((v, i, arr) => {
            ret[v] = data[v];
        });

        return ret;
    }
    makehDayData(req: Stock, data: any): DayData {
        const ret: any = {
            id: req.id,
            todayopen: data['open'],
            yestclose: data['yestclose'],
            todayclose: data['yestclose'],
            todaydate: data['update']
        };
        return ret;
    }

}