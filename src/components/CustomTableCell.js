const {  Paragraph, TextRun, TableCell, WidthType, convertInchesToTwip } = require("docx");

const CustomTableCell = ({ text, bold, size } = {}) => {

    let childrenVal = [new Paragraph({
        children: [new TextRun({
            text: text || "",
            bold: bold || false,
            font: "Arial",
            size: 25,
        })],
    })];


    if (Array.isArray(text)) {
        childrenVal = text.map(val => 
            new Paragraph({
                children: [new TextRun({
                    text: val,
                    font: "Arial",
                    size: 25,
                })],
                bullet: {
                    level: 0
                },
            })
        );
    }


    return new TableCell({
        children: childrenVal,
        width: {
            size: size || 2000,
            type: WidthType.DXA,
        },
        margins: {
            top: convertInchesToTwip(0.05),
            bottom: convertInchesToTwip(0.05),
            left: convertInchesToTwip(0.1),
            right: convertInchesToTwip(0.1),
        },
        columnSpan: 3,
    })
};

module.exports = CustomTableCell;