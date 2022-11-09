import * as converter from '../../src/shared/converter.js';

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
const COMMON_INPUTS = [
    {ip: '0.0.0.0', binary: '00000000.00000000.00000000.00000000'},
    {ip: '255.255.255.255', binary: '11111111.11111111.11111111.11111111'},
    {ip: '255.255.255.0', binary: '11111111.11111111.11111111.00000000'},
    {ip: '255.0.255.0', binary: '11111111.00000000.11111111.00000000'},
    {ip: '192.168.0.1', binary: '11000000.10101000.00000000.00000001'},
];
describe('IP to Binary', () => {

    it('should throw error for invalid number of octets', () => {
        let input = [
            '255.255.255',
            '255.255.255.255.255'
        ];
        for (const i of input) {
            const result = () => converter.convertIPtoBinary(i);
            expect(result).toThrow(converter.InvalidFormat);
        }
    });


    it('should throw error for out of octet bounds', () => {
        let input = [
            '256.255.255.255',
            '255.256.255.255',
            '255.255.256.255',
            '255.255.255.256',

            '-1.255.255.255',
            '255.-1.255.255',
            '255.255.-1.255',
            '255.255.255.-1',

            'a.255.255.255',
            '255.a.255.255',
            '255.255.a.255',
            '255.255.255.a',
        ];

        for (const i of input) {
            const result = () => converter.convertIPtoBinary(i);
            expect(result).toThrow(converter.InvalidFormat);
        }
    });


    it('should convert ip to binary', () => {
        for (const i of COMMON_INPUTS) {
            let result = converter.convertIPtoBinary(i.ip);
            expect(result).toBe(i.binary);
        }
    });

});


describe('Binary to IP', () => {
    it('should throw error for invalid number of octets', () => {
        let input = [
            '00000000.00000000.00000000',
            '00000000.00000000.00000000.00000000.00000000',
            '00000000.00000000.000000000',
            '00000000.000000000.00000000.00000000',
        ];
        for (const i of input) {
            const result = () => converter.convertBinaryToIp(i);
            expect(result).toThrow(converter.InvalidFormat);
        }
    });

    it('should throw error for out of octet bounds', () => {
        let input = [
            '011111111.000000000.010000000.000000001',
            '11111111.00000000.20000000.00000000',
        ];
        for (const i of input) {
            const result = () => converter.convertBinaryToIp(i);
            expect(result).toThrow(converter.InvalidFormat);
        }
    });

    it('should convert binary to ip', () => {
        for (const i of COMMON_INPUTS) {
            let result = converter.convertBinaryToIp(i.binary);
            expect(result).toBe(i.ip);
        }
    });
});

