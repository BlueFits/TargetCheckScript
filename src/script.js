const PuppeteerBrowser = require("./Puppeteer/PuppeteerBrowser");
const readline = require("readline");
const fs = require("fs");
const { parseReport } = require("./utils");


(async () => {
    const reportFolderExist = fs.existsSync("./report");
    const scriptLogic = async () => {
        console.log("Scripts loding...");
        const links = parseReport();
        const browserInstance = await PuppeteerBrowser.build();
        await browserInstance.generateReport(links);
    }
    //Message if report folder already exist
    if (reportFolderExist) {
        const read = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        read.question(`report folder exists, please make sure to delete all files in folder before proceeding, continue? (y/n)`, 
        (input) => {
            switch (input) {
                case "y":
                    scriptLogic();
                    break;
                case "n":
                    console.log("Exiting script...");
                    break;
                default:
                    console.log("Invalid input, exiting script...");
            }
            read.close();
        });
    } else { scriptLogic(); }
})();