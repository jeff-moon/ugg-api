import { load } from 'cheerio';
import _ from 'lodash';

export function parseSummoner(html) {
    const result = {};
    const $ = load(html);        

    $('.rank-list .rank-tile').each((i, elm) => {
        const queuetype = $(elm).find(".queue-type").text();
        const regex = /([0-9]+)% WR([0-9]+)\sgames/;
        const matches = regex.exec($(elm).find(".rank-wins").text());

        _.set(result, `${queuetype}.winrate`, matches[1]);
        _.set(result, `${queuetype}.games`, matches[2]);

    });

    return result;
}

export function parseChampionMastery(html) {
    const $ = load(html);
    const result = {};
    $('.rt-tr').each((i, tr) => {
        const champion = $(tr).find('.champion-name').text();
        const winrateText = $(tr).find('.champion-rates').text();
        const lpgain = $(tr).find('.lp-gain-cell .qty').text();
        const gainOrLoss = $(tr).find('.lp-arrow');
        const arrowType = $(gainOrLoss).attr('transform');

        const actualLp = arrowType !== undefined ? parseInt(lpgain) : parseInt(lpgain) * -1;
        const champStats = /([0-9]+)% \/ ([0-9]+)W ([0-9]+)L/.exec(winrateText);
        if (champStats !== null) {
            _.set(result, `${champion}`, {});
            _.set(result, `${champion}.winrate`, parseInt(champStats[1]));
            _.set(result, `${champion}.wins`, parseInt(champStats[2]));
            _.set(result, `${champion}.losses`, parseInt(champStats[3]));
            _.set(result, `${champion}.lp`, actualLp);
        }
    });

    return result;
}