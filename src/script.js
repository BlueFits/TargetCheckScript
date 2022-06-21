import Sample from "./sample.js";
import PuppeteerBrowser from "./PuppeteerBrowser.js";

(async () => {
    console.log(Sample);
    const browserInstance = await PuppeteerBrowser.build();
})();