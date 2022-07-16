import * as generator from '../../src/shared/form/generator.js';
import {describe, expect, it} from '@jest/globals';
import {GeneratorInput} from "../../src/shared/form/interfaces.js";

describe('Generator', () => {

    it('should generate source', async () => {
        let input = new GeneratorInput([
            {
                displayName: null,
                modelName: "name",
                defaultValue: ""
            },
            {
                displayName: null,
                modelName: "username",
                defaultValue: ""
            },
            {
                displayName: null,
                modelName: "github",
                defaultValue: ""
            },
            {
                displayName: null,
                modelName: "favLanguage",
                defaultValue: ""
            }

        ]);
        let expectedResult = [{
            file: 'component.ts', src: `
        
        @Component({})
        export class FormComponent {
        
        }
        `
        }];
        let result = await generator.generate(input);


        expect(result).toBe(expectedResult);
    });
});
