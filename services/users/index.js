let fs = require('fs');
let xlsx = require('xlsx');

module.exports = (req, res) => {
    let XLSX = require('xlsx');
    let workbook = XLSX.readFile('./test.xls');
    let sheet_name_list = workbook.SheetNames;
    let resp = [];
    sheet_name_list.forEach(function (y) {
        let worksheet = workbook.Sheets[y];
        let headers = {};
        let data = [];
        for (let z in worksheet) {
            if (z[0] === '!') continue;

            let tt = 0;
            for (let i = 0; i < z.length; i++) {
                if (!isNaN(z[i])) {
                    tt = i;
                    break;
                }
            }
            let col = z.substring(0, tt);
            let row = parseInt(z.substring(tt));
            let value = worksheet[z].v;

            if (row === 1 && value) {
                headers[col] = value;
                continue;
            }

            if (!data[row]) data[row] = {};
            data[row][headers[col]] = value;
        }

        data.shift();
        data.shift();
        resp.push(data)
    });

    return {msg: resp}
};