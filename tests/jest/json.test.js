import * as converter from '../../src/shared/converter.js';

// function convertJsonToCSV(jsonString) {
//     let result;
//     let parsedJson = JSON.parse(jsonString);
//     if (parsedJson instanceof Array) {
//         let firstElement = parsedJson[0];
//         let propertyHeaders = buildColumns(firstElement)
//         result = `${propertyHeaders}\n`
//         let rows = [];
//         parsedJson.forEach(i => {
//             rows.push(`${buildRow(propertyHeaders, i)}`);//`\n${Object.values(i).join(',')}`
//         })
//         result += rows.join('');
//
//     } else {
//         return convertJsonToCSV(`[${jsonString}]`)
//     }
//     return result;
// }
//
// function buildColumns(obj, prefix, columns = []) {
//     for (let key of Object.keys(obj)) {
//         if (obj[key] instanceof Array) {
// //not implemented
//         } else if (obj[key] instanceof Object) {
//             let nestedObj = obj[key];
//             buildColumns(nestedObj, key, columns);
//         } else {
//             columns.push(prefix ? `${prefix}.${key}` : `${key}`);
//         }
//
//     }
//     return `${columns}`
// }
//
// function resolveHeader(obj, header) {
//     if (header.indexOf('.') >= 0) {
//         // nested object exists
//         let parent = header.split('.');
//         return resolveHeader(obj[parent[0]], parent[1])
//     } else {
//         return obj[header];
//     }
// }
//
// function buildRow(headers, obj) {
//     let result = [];
//     for (let header of headers.split(',')) {
//
//         result.push(`${resolveHeader(obj, header)}`);
//     }
//     return `${result.join(',')}\n`;
// }


class FormatScenario {

    constructor(name, columns, value) {
        this.name = name;
        this.columns = columns;
        this.rawValue = value;
    }


}

const arrayCase = new FormatScenario('array', ['id', 'first_name', 'last_name'],
    `
        [{
            "id": 1,
            "first_name": "Lillian",
            "last_name": "Lipyeat",
        }, {
            "id": 2,
            "first_name": "Roi",
            "last_name": "Barber",
        }]
    `);

describe('JSON>CSV - Array Root', () => {

    it('should turn a json array into valid csv',  () => {
        const input = JSON.stringify(arrayCase.rawValue
            // [{
            //     "id": 1,
            //     "first_name": "Lillian",
            //     "last_name": "Lipyeat",
            // }, {
            //     "id": 2,
            //     "first_name": "Roi",
            //     "last_name": "Barber",
            // }]
        );
        const expectedResult = 'id,first_name,last_name\n1,Lillian,Lipyeat\n2,Roi,Barber\n';

        let result = converter.convertJsonToCSV(input);
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
        const expectedResult = 'id,person.first_name,person.last_name\n1,Lillian,Lipyeat\n2,Roi,Barber\n';

        let result = converter.convertJsonToCSV(input);

        expect(result).toBe(expectedResult)
    });
});

describe('JSON>CSV - Object Root', () => {
    it('should convert to Array root', () => {
        const input = JSON.stringify(
            {
                "id": 1,
                "person": {
                    "first_name": "Lillian",
                    "last_name": "Lipyeat"
                }
            }
        );
        const expectedResult = 'id,person.first_name,person.last_name\n1,Lillian,Lipyeat\n';

        let result = converter.convertJsonToCSV(input);

        expect(result).toBe(expectedResult)
    });
});

describe('JSON>CSV - Format Rules', () => {
    it('should always end in new line', () => {
        let input = JSON.stringify(
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
        let expectedResult = 'id,person.first_name,person.last_name\n1,Lillian,Lipyeat\n2,Roi,Barber\n';
        let result = converter.convertJsonToCSV(input);
        expect(result).toBe(expectedResult)

        /////////
        /////////

        input = JSON.stringify(
            {
                "id": 1,
                "person": {
                    "first_name": "Lillian",
                    "last_name": "Lipyeat"
                }
            }
        );
        expectedResult = 'id,person.first_name,person.last_name\n1,Lillian,Lipyeat\n';
        result = converter.convertJsonToCSV(input);
        expect(result).toBe(expectedResult)
    });
})

describe('Other', ()=> {
    it('should throw error when invalid json is provided as input', () => {
        const input = `
         [{
            "id": 1,
            "first_name": "Lillian",
            "last_name": "Lipyeat",
        }, {
            "id": 2,
            "first_name": "Roi",
            "last_name": "Barber",
        }]`;
        expect(converter.convertJsonToCSV(input)).toThrow('err')
    });
})
