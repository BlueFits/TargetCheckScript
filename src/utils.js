const fs = require("fs");
const { TemplateHandler } = require("easy-template-x");

exports.createReport = async () => {
    const templateFile = fs.readFileSync(__dirname + '\\templates\\sample.docx');

    const data = {
        sample: [
            { testVal: 'Alon Bar'},
            { testVal: 'Sample Bar' }
        ]
    };

    const handler = new TemplateHandler();
    const doc = await handler.process(templateFile, data);

    if (!fs.existsSync("./report")){
        fs.mkdirSync("./report");
    }

    fs.writeFileSync('./report/myTemplate - output.docx', doc);
}