import UDotGGApi from "./src/api.js";

const ugg = new UDotGGApi();
(async () => {
    await ugg.initialize();
    const result = await ugg.getSummonerInfo('na1', 'xiaolinfunk');

    console.log(JSON.stringify(result, null, 2));

    ugg.finalize();
})();