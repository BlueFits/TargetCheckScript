const Sample = require("./sample.js");
const PuppeteerBrowser =  require("./PuppeteerBrowser.js");
const readline = require("readline");

(async () => {

    console.log(Sample);
    const browserInstance = await PuppeteerBrowser.build();
    browserInstance.screenshot();

    const read = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    read.question(`Press Enter to close... `, input => {
        // if (input === "y") {
        //     console.log("yes");
        // } else if (input === "n") {
        //     console.log("no");
        // }
        read.close();
    });
})();