const PuppeteerBrowser = require("./Puppeteer/PuppeteerBrowser");
const readline = require("readline");
const fs = require("fs");
const path = require("path");


(async () => {
    console.log("Scripts loding...");

    //New code
    const links = 
        fs.readFileSync(path.join(__dirname, '..', 'links.txt'), { encoding:'utf8', flag:'r' })
        .split(",");

    const browserInstance = await PuppeteerBrowser.build();
    await browserInstance.generateReport(links);
    
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