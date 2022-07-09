import * as converter from '../../src/shared/converter.js';

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
