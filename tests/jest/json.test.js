function convertJsonToCSV(jsonString) {
    let result;
    let parsedJson = JSON.parse(jsonString);
    if (parsedJson instanceof Array) {
        let firstElement = parsedJson[0];
        let propertyHeaders = buildColumns(firstElement)
        result = `${propertyHeaders}\n`
        let rows = [];
        parsedJson.forEach(i => {
            rows.push(`${buildRow(propertyHeaders, i)}`);//`\n${Object.values(i).join(',')}`
        })
        result += rows.join('\n');

    } else {
        result = ''
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
    return result.join(',');
}

describe('CSV - Array Root', () => {

    it('should turn a json array into valid csv', async () => {
        const input = JSON.stringify(
            [{
                "id": 1,
                "first_name": "Lillian",
                "last_name": "Lipyeat",
            }, {
                "id": 2,
                "first_name": "Roi",
                "last_name": "Barber",
            }]
        );
        const expectedResult = 'id,first_name,last_name\n1,Lillian,Lipyeat\n2,Roi,Barber';

        let result = convertJsonToCSV(input);

        expect(result).toBe(expectedResult)
    });

    it('should create columns with nested objects', () => {
        const input = JSON.stringify(
            [{
                "id": 1,
                "person": {
                    "first_name": "Lillian",
                    "last_name": "Lipyeat"
                }
            }, {
                "id": 2,
                "person": {
                    "first_name": "Roi",
                    "last_name": "Barber"
                }
            }]
        );
        const expectedResult = 'id,person.first_name,person.last_name\n1,Lillian,Lipyeat\n2,Roi,Barber';

        let result = convertJsonToCSV(input);

        expect(result).toBe(expectedResult)
    });
});

describe('CSV - Object Root', () => {
    it('should ', () => {
        
    });
});
