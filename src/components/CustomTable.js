const { Table, TableRow } = require("docx");
const CustomTableCell = require("./CustomTableCell");

const CustomTable = ({ title, url, errVals }) => {
    return new Table({
        rows: [
            new TableRow({
                children: [
                    CustomTableCell({ text: "Page Title", bold: true }),
                    CustomTableCell({ text: title, size: 8000 }),
                ],
            }),
            new TableRow({
                children: [
                    CustomTableCell({ text: "URL", bold: true }),
                    CustomTableCell({ text: url, size: 8000 }),
                ],
            }),
            new TableRow({
                children: [
                    CustomTableCell({ text: "Issues", bold: true }),
                    CustomTableCell({ text: "See screenshots below", size: 8000 }),
                ],
            }),
            new TableRow({
                children: [
                    CustomTableCell({ text: "Notes", bold: true }),
                    CustomTableCell({ text: errVals, size: 8000 }),
                ],
            }),
            new TableRow({
                children: [
                    CustomTableCell({ text: "More Info", bold: true }),
                    CustomTableCell({ text: "https://confluence.bmogc.net/display/PERS/Digital+Team+Info", size: 8000 }),
                ],
            }),
        ],
    });
};

module.exports = CustomTable;