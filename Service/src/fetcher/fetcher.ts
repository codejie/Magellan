import { strict } from "assert";
import logger from "../logger";
import { request } from "../requests";
import { DayData, RuntimeData } from "../definition/data-define";
import { Stock } from "../definition/struct-define";

export default abstract class Fetcher {

    static HEADERS = {
        'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/15609.2.9.1.2'
    };

    fetchUrl(url: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            request(url, Fetcher.HEADERS)
                .then(resp => {
                    const ret = resp.substring(resp.indexOf('{'), resp.lastIndexOf('}') + 1);
                    logger.debug(ret);
                    resolve(ret);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    abstract fetchRuntime(req: Stock): Promise<any>;

    abstract makeRuntimeData(req: Stock, data: any): RuntimeData;
    abstract makehDayData(req: Stock, data: any): DayData;
}