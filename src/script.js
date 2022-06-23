const PuppeteerBrowser = require("./Puppeteer/PuppeteerBrowser");
const readline = require("readline");
const fs = require("fs");

(async () => {
    console.log("Scripts loding...");

    const browserInstance = await PuppeteerBrowser.build();
    await browserInstance.generateReport([
        "https://www.bmo.com/main/personal",
        "https://www.bmo.com/main/personal/mortgages/mortgage-rates/",
    ]);
    
    // const read = readline.createInterface({
    //     input: process.stdin,
    //     output: process.stdout,
    // });

    // read.question(`Press Enter to close... `, (input) => {
    //     // if (input === "y") {
    //     //     console.log("yes");
    //     // } else if (input === "n") {
    //     //     console.log("no");
    //     // }
    //     read.close();
    // });
})();