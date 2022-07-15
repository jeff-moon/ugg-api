import puppeteer from 'puppeteer';

export default class UggScraper {

    constructor() {
        this.browser = null;
        this.page = null;
    }

    async initialize() {
        this.browser = await puppeteer.launch();
        this.page = await this.browser.newPage();
    }

    async scrapeSummoner(region, summoner) {
        const url = encodeURI(`https://u.gg/lol/profile/${region}/${summoner}/overview`);
        await this.page.goto(url, {waitUntil: 'domcontentloaded'});
        const data = await this.page.evaluate(() => document.querySelector('*').outerHTML);

        return data;
    }

    async scrapeChampionMastery(region, summoner, queueType) {
        let url;
        switch(queueType) {
            case 'ranked':
                url = encodeURI(`https://u.gg/lol/profile/${region}/${summoner}/champion-stats?queueType=ranked_solo_5x5`);
                break;
            case 'normal':
                url = encodeURI(`https://u.gg/lol/profile/${region}/${summoner}/champion-stats?queueType=normal_blind_5x5`);
                break;
            case 'normal_draft':
                url = encodeURI(`https://u.gg/lol/profile/${region}/${summoner}/champion-stats?queueType=normal_draft_5x5`);
                break;
        }

        await this.page.goto(url, {waitUntil: 'domcontentloaded'});
        await this.page.waitForNavigation();
        const data = await this.page.evaluate(() => document.querySelector('*').outerHTML);

        return data;
    }

    async finalize() {
        await this.browser.close();
    }
}