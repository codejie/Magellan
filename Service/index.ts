import logger from "./src/logger"
import { App, ConfigObject } from "./src/app"
import config from './config.json'

async function main(): Promise<void> {
    // process.env.NODE_ENV = "production";
    logger.debug('hello')
    process.on('uncaughtException', error => {
        logger.error('uncaughtException - ', error);
    });

    process.on('unhandledRejection', (reason, promise) => {
        logger.error('unhandleRejection - ' + reason);
        promise.catch(error => {
            logger.error('process error - ', error);
        });
    });

    const app = new App(<ConfigObject>config);

    process.on('SIGINT', signal => {
        logger.info('catch ctrl-c.');
        app.shutdown().then(() => {
            logger.info('app exit.');
            process.exit(0);
        });
    });

    // const ret: any = await request('http://api.money.126.net/data/feed/0601857,money.api?callback=_ntes_quote_callback46415300');
    // logger.debug(ret);

    // const req: Stock = {
    //     id: 1,
    //     type: 1,
    //     code: '601858'
    // };
    // const fetcher = new NetEaseFetcher();
    // const ret = await fetcher.fetchRuntime(req);
    // logger.debug(ret);
    // const runtime = fetcher.makeRuntimeData(req, ret);
    // logger.debug(runtime);
    // const day = fetcher.makehDayData(req, ret);
    // logger.debug(day);
    // const ret = await fetcher.fetchUrl('http://api.money.126.net/data/feed/0601857,money.api?callback=_ntes_quote_callback46415300');
    // logger.debug(JSON.parse(ret));

    try {
        await app.init();
        await app.start();
        logger.info('app start.');
    } catch (error) {
        logger.error('app runtim error - ', error);
    }
    // process.stdin.resume();
    // await app.shutdown();
}

main();

// console.log('hello world');
