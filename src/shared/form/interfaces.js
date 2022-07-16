export class GeneratorInput {
    controls = []

    constructor(controls) {
        this.controls = controls;
    }
}


export class GeneratorOutput {
    constructor() {
    }
}


export class Control {
    displayName;
    modelName;
    defaultValue;

    constructor(displayName, modelName, defaultValue) {
    }
}
