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


const ERROR_INVALIDINPUT = 'Not a valid format. An ip should be in the form abc.abc.abc.abc; A binary representation of an ip should be in the form bbbbbbbb.bbbbbbbb.bbbbbbbb.bbbbbbbb';

export class InvalidFormat extends Error {
    constructor(message = "", ...args) {
        super(message);
        this.message = message ?? `Not a valid format ${args}`;
    }
}

function formatGuard(input) {
    let bytes = input.split('.');
    if (bytes.length > 4 || bytes.length < 4) {
        throw new InvalidFormat(ERROR_INVALIDINPUT);
    }

    for (const bytesKey of bytes) {
        let number = Number(bytesKey);
        if (Object.is(number, NaN)) {
            throw new InvalidFormat();
        }
        if (number > 255 || number < 0) {
            throw new InvalidFormat();
        }
    }
}


function formatGuardBinary(input) {
    let bytes = input.split('.');
    if (bytes.length > 4 || bytes.length < 4) {
        throw new InvalidFormat(ERROR_INVALIDINPUT);
    }

    for (const bytesKey of bytes) {
        let val = String(bytesKey);

        if (Object.is(val, Number)) {
            throw new InvalidFormat();
        }
        if (val.length !== 8) {
            throw new InvalidFormat();
        }
        for (let valElement of val) {
            if(valElement !== '1' && valElement !== '0'){
                throw new InvalidFormat();
            }
        }
    }
}

const OCTET = 8;

function toBinary(octet, length = OCTET) {
    let s = octet.toString(2);
    return '00000000'.substring(0, length - s.length) + s;
}

function toDecimal(octet) {
    return parseInt(octet, 2);
}

export function convertIPtoBinary(ip) {
    formatGuard(ip);

    let octets = ip.split('.');
    let result = [];
    for (const octet of octets) {
        let octetAsDecimal = Number(octet);
        result.push(toBinary(octetAsDecimal));
    }

    return result.join('.');
}

export function convertBinaryToIp(binary) {
    formatGuardBinary(binary);
    let octets = binary.split('.');
    let result = [];
    for (const octet of octets) {
        result.push(toDecimal(octet));
    }
    return result.join('.');
}
