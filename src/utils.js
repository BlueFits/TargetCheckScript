const fs = require("fs");
const path = require("path");

exports.parseReport = () => {
    return fs.readFileSync(path.join(__dirname, '..', 'links.txt'), { encoding:'utf8', flag:'r' })
    .split(",")
    .map(line => line.replace(/\n/g, ''));
};