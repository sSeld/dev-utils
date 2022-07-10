export function convertJsonToCSV(jsonString) {
    let result;
    let parsedJson = JSON.parse(jsonString);
    if (parsedJson instanceof Array) {
        let firstElement = parsedJson[0];
        let propertyHeaders = buildColumns(firstElement)
        result = `${propertyHeaders}\n`
        let rows = [];
        parsedJson.forEach(i => {
            rows.push(`${buildRow(propertyHeaders, i)}`);
        })
        result += rows.join('');

    } else {
        return convertJsonToCSV(`[${jsonString}]`)
    }

    return result;
}

function buildColumns(obj, prefix, columns = []) {
    for (let key of Object.keys(obj)) {
        if (obj[key] instanceof Array) {
//not implemented
        } else if (obj[key] instanceof Object) {
            let nestedObj = obj[key];
            buildColumns(nestedObj, key, columns);
        } else {
            columns.push(prefix ? `${prefix}.${key}` : `${key}`);
        }

    }
    return `${columns}`
}

function resolveHeader(obj, header) {
    if (header.indexOf('.') >= 0) {
        // nested object exists
        let parent = header.split('.');
        return resolveHeader(obj[parent[0]], parent[1])
    } else {
        return obj[header];
    }
}

function buildRow(headers, obj) {
    let result = [];
    for (let header of headers.split(',')) {

        result.push(`${resolveHeader(obj, header)}`);
    }
    return `${result.join(',')}\n`;
}

export function convertCSVToJson(csvString) {
    let result;

    //identify line ending
    let lineEnding = identifyLineEnding(csvString);
    let rows = csvString.split(lineEnding);
    if (rows[rows.length - 1] === '') {
        rows.pop();
    }

    let properties = rows[0].split(',');

    let results = []
    for (let i = 1; i < rows.length; i++) {
        let row = rows[i];
        let values = row.split(',');
        let obj = {};
        for (let i = 0; i < values.length; i++) {
            obj[properties[i]] = values[i];
        }
        results.push(obj);
    }

    return `${JSON.stringify(results)}${lineEnding}`;
}

function identifyLineEnding(input) {
    const pattern = /(\n*)/;
    const newline = input.match(/\n/g).length ?? 0 ;

    const creturn = input.match(/\r/g)?.length ?? 0;
    const creturnLinefeed = input.match(/\r\n/g)?.length ?? 0;


    if (creturnLinefeed === creturn && creturnLinefeed === newline) {
        return '\r\n';
    } else if (newline > creturn && newline > creturnLinefeed) {
        return '\n';
    } else {
        return '\r';
    }
}
