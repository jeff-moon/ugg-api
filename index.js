import UDotGGApi from "./src/api.js";
import fs from 'fs';

const ugg = new UDotGGApi();
(async () => {
    await ugg.initialize();
    const result = await ugg.getSummonerInfo('na1', 'xiaolinfunk');

    fs.writeFileSync('it.json', JSON.stringify(result, null, 2));

    ugg.finalize();
})();