const { Table, TableRow } = require("docx");
const CustomTableCell = require("./CustomTableCell");

const LegendTable = () => {
    return new Table({
        rows: [
            new TableRow({
                children: [
                    CustomTableCell({ text: "GREEN BORDER", borderColor: "#88CC88" }),
                    CustomTableCell({ 
                        text: 
                            `ID missing. Please add an ID starting with 'pers' to a parent div wrapping this section.`, 
                        size: 8000,
                    }),
                ],
            }),
            new TableRow({
                children: [
                    CustomTableCell({ text: "YELLOW BORDER", borderColor: "#FFFFAA" }),
                    CustomTableCell({ 
                        text: 
                            `Duplicate ID on these elements. Please make changes so both elements have unique IDs.`, 
                        size: 8000
                    }),
                ],
            }),
            new TableRow({
                children: [
                    CustomTableCell({ text: "ORANGE BORDER", borderColor: "#D49A6A" }),
                    CustomTableCell({ 
                        text: 
                            `This ID is malformed. It might start with a number or be dynamic. Please replace the ID.`, 
                        size: 8000
                    }),
                ],
            }),
            new TableRow({
                children: [
                    CustomTableCell({ text: "RED BORDER", borderColor: "#721330"  }),
                    CustomTableCell({ 
                        text: 
                            `Code changes made to these elements using Adobe Target do not run. Please add triggerView to the parent component.`, 
                        size: 8000,
                    }),
                ],
            }),
        ],
    });
};

module.exports = LegendTable;