function convertJsonToCSV(jsonString) {
    let result;
    let parsedJson = JSON.parse(jsonString);
    if(parsedJson instanceof Array){
        let firstElement = parsedJson[0];
        let propertyHeaders = Object.keys(firstElement);
        result = `${propertyHeaders.join(',')}`

        parsedJson.forEach(i => {
            result += `\n${Object.values(i).join(',')}`
        })

    }else {
        result = ''
    }
    return result;
}

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
})
