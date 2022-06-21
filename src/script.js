const Sample = require("./sample.js");
const PuppeteerBrowser =  require("./PuppeteerBrowser.js");
const readline = require("readline");

const fs = require("fs");
const { TemplateHandler } = require("easy-template-x");

(async () => {
    // const browserInstance = await PuppeteerBrowser.build();
    // browserInstance.screenshot();

    const templateFile = fs.readFileSync(__dirname + '/sample.docx');

    const data = {
        sample: [
            { testVal: 'Alon Bar'},
            { testVal: 'Bitch Bar' }
        ]
    };

    const handler = new TemplateHandler();
    const doc = await handler.process(templateFile, data);

    fs.writeFileSync('myTemplate - output.docx', doc);

    const read = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    read.question(`Press Enter to close... `, (input) => {
        // if (input === "y") {
        //     console.log("yes");
        // } else if (input === "n") {
        //     console.log("no");
        // }
        read.close();
    });
})();