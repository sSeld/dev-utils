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
