import { parseChampionMastery, parseSummoner } from "./dom-parser.js";
import OpggScraper from "./ugg-scraper.js";
import _ from 'lodash';

export default class UDotGGApi {
    constructor() {
        this.opggScraper = new OpggScraper();
        this.queueType = [ 'ranked', 'normal', 'normal_draft' ];
    }

    async initialize() {
        await this.opggScraper.initialize();
    }

    async finalize() {
        await this.opggScraper.finalize();
    }

    async getSummonerInfo(region, summoner) {

        const result = {};
        const summonerHtml = await this.opggScraper.scrapeSummoner(region, summoner);

        const summonerInfo = parseSummoner(summonerHtml); 

        _.set(result, 'summoner', summoner);
        _.set(result, 'region', region);
        _.set(result, 'summonerInfo', summonerInfo);

        for (const queue of this.queueType) {
            const masteryHtml = await this.opggScraper.scrapeChampionMastery(region, summoner, queue);
            const championMastery = parseChampionMastery(masteryHtml);

            _.set(result, `championMastery.${queue}`, championMastery);
        };

        return result;
    }

    async getSummonersInfo(region, summoners) {
        const result = {};
        for (const summoner of summoners) {
            const summonerInfo = await this.getSummonerInfo(region, summoner);
            _.set(result, summoner, summonerInfo);
        }
    }
}