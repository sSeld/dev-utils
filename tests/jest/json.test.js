import * as converter from '../../src/shared/converter.js';

class FormatScenario {
    constructor(name, columns, value) {
        this.name = name;
        this.columns = columns;
        this.rawValue = value;
    }

    delimitedColumns() {
        return `${this.columns.join(',')}`
    }
}

const arrayCase = new FormatScenario('array', ['id', 'first_name', 'last_name'],
    `
        [{
            "id": 1,
            "first_name": "Lillian",
            "last_name": "Lipyeat"
        }, {
            "id": 2,
            "first_name": "Roi",
            "last_name": "Barber"
        }]
    `);

const arrayNestedJsonObject = new FormatScenario('nestedJson', ["id", "person.first_name", "person.last_name"],
    `
            [
                {
                    "id": 1,
                    "person": {
                        "first_name": "Lillian",
                        "last_name": "Lipyeat"
                    }
                },
                {
                    "id": 2,
                    "person": {
                        "first_name": "Roi",
                        "last_name": "Barber"
                    }
                }
            ]
    `);
const objectNestedJsonObject = new FormatScenario('nestedJson', ["id", "person.first_name", "person.last_name"],
    `
                {
                    "id": 1,
                    "person": {
                        "first_name": "Lillian",
                        "last_name": "Lipyeat"
                    }
                }
    `);
describe('JSON>CSV - Array Root', () => {

    it('should turn a json array into valid csv', () => {
        const input = arrayCase.rawValue;
        const expectedResult = `${arrayCase.delimitedColumns()}\n1,Lillian,Lipyeat\n2,Roi,Barber\n`;

        let result = converter.convertJsonToCSV(input);
        expect(result).toBe(expectedResult)
    });

    it('should create columns with nested objects', () => {
        const input = arrayNestedJsonObject.rawValue;
        const expectedResult = `${arrayNestedJsonObject.delimitedColumns()}\n1,Lillian,Lipyeat\n2,Roi,Barber\n`;

        let result = converter.convertJsonToCSV(input);

        expect(result).toBe(expectedResult)
    });
});

describe('JSON>CSV - Object Root', () => {
    it('should convert to Array root', () => {
        const input = objectNestedJsonObject.rawValue;
        const expectedResult = `${objectNestedJsonObject.delimitedColumns()}\n1,Lillian,Lipyeat\n`;

        let result = converter.convertJsonToCSV(input);

        expect(result).toBe(expectedResult)
    });
});

describe('JSON>CSV - Format Rules', () => {
    it('should always end in new line', () => {
        ///////// array root /////////
        let input = arrayNestedJsonObject.rawValue;
        let expectedResult = `${arrayNestedJsonObject.delimitedColumns()}\n1,Lillian,Lipyeat\n2,Roi,Barber\n`;
        let result = converter.convertJsonToCSV(input);
        expect(result).toBe(expectedResult)

        ///////// object root /////////
        input = objectNestedJsonObject.rawValue;
        expectedResult = `${objectNestedJsonObject.delimitedColumns()}\n1,Lillian,Lipyeat\n`;
        result = converter.convertJsonToCSV(input);
        expect(result).toBe(expectedResult)
    });
})

describe('Other', () => {
    xit('should throw error when invalid json is provided as input', () => {
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
        expect(converter.convertJsonToCSV(input)).toThrow(new Error('SyntaxError')); //todo: need to figure out how to use the toThrow on expect
    });
})

const LINE_ENDINGS = ['\r', '\n', '\r\n'];

class CSVTestCase {


    constructor(name, csv, json, delimiter = ',', lineEnding = LINE_ENDINGS[2]) {
        this.name = name;
        this.rawCsv = csv;
        this.rawJson = json;
        this.delimiter = delimiter;
        this.lineEnding = lineEnding;
    }

    json() {
        if( typeof this.rawJson  == 'string'){
            return `${JSON.stringify(JSON.parse(this.rawJson), null, 0)}${this.lineEnding}`;
        }else {
            // json object passed in
            return `${JSON.stringify(this.rawJson, null,0)}${this.lineEnding}`
        }
    }

    csv() {
        let result = '';
        for (const csvRow in this.rawCsv) {
            result += `${this.rawCsv[csvRow].join(this.delimiter)}${this.lineEnding}`;
        }
        return result;
    }
}

const csvSimpleCase = new CSVTestCase('simple',
    [
        ["id", "first", "last"],
        ["5", "jimmy", "coder"]
    ]
    ,
    `
    [
        {
            "id": "5",
            "first": "jimmy",
            "last": "coder"
        }
    ]
    `
);


const csvSimpleCaseUnixEOL = new CSVTestCase('simpleUnixEOL', csvSimpleCase.rawCsv, csvSimpleCase.rawJson, ',', '\n');


describe('CSV>JSON - Format Rules', () => {
    xit('should handle different delimiters', () => {

    });
    xit('should result in json array', () => {
    });
    xit('should end in a new line', () => {

    });
    it('should handle unix vs windows line endings', () => {
        const input = csvSimpleCaseUnixEOL.csv();
        let expectedResult = csvSimpleCaseUnixEOL.json();
        let result = converter.convertCSVToJson(input);
        expect(result).toBe(expectedResult);
    });
    xit('should try to convert numbers', () => {
        const input = csvSimpleCase.csv();
        let expectedResult = csvSimpleCase.json();
        let result = converter.convertCSVToJson(input);
        expect(result).toBe(expectedResult);
    });
});
