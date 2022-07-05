const {  Paragraph, TextRun, TableCell, WidthType, convertInchesToTwip, BorderStyle } = require("docx");

const CustomTableCell = ({ text, bold, size, borderColor } = {}) => {

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

    let borders = borderColor ? {
        top: {
            style: BorderStyle.DOUBLE,
            size: 3,
            color: borderColor,
        },
        bottom: {
            style: BorderStyle.DOUBLE,
            size: 3,
            color: borderColor,
        },
        left: {
            style: BorderStyle.DOUBLE,
            size: 3,
            color: borderColor,
        },
        right: {
            style: BorderStyle.DOUBLE,
            size: 3,
            color: borderColor,
        }
    } : {};


    return new TableCell({
        children: childrenVal,
        borders,
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