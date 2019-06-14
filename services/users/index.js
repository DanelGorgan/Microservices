module.exports = (req, res) => {
    let urlSplit = req.url.split('=');
    let receivedEmail = urlSplit[2].split("%20").join(" ");
    let type = urlSplit[1].split('&')[0];

    let XLSX = require('xlsx');
    let workbook = XLSX.readFile(`./${type}.xlsx`);
    let sheet_name_list = workbook.SheetNames;
    let resp = {};

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
        if (type === 'course') {
            for (let i = 0; i < data.length; i++) {
                if (data[i].Title === receivedEmail) {
                    resp.response = data[i];
                    break;
                }
            }
        } else {
            for (let i = 0; i < data.length; i++) {
                if (data[i].Email === receivedEmail) {
                    resp.response = data[i];
                    break;
                }
            }
        }
    });
    return resp
};
