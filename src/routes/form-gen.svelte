<script>
    import {saveAs} from 'file-saver';
    import * as generator from '../shared/form/generator.js';

    let generatedCode;

    async function save() {

        console.log('running save');
        let view = {
            interface: {
                type: '{name: string}'
            },
            controls: [
                {
                    displayName: "Name",
                    modelName: "name",
                    defaultValue: ""
                },
                {
                    displayName: "Username",
                    modelName: "username",
                    defaultValue: ""
                },
                {
                    displayName: "Github profile",
                    modelName: "github",
                    defaultValue: ""
                },
                {
                    displayName: "Favorite Language",
                    modelName: "favLanguage",
                    defaultValue: ""
                }
            ]
        };


        // event.preventDefault();
        let text = await generator.generate(view);
        generatedCode = text;
        let filename = 'form.component.ts'
        let blob = new Blob([text], {type: "text/plain;charset=utf-8"});
        // saveAs(blob, filename);
    }

</script>
<div class="container mx-auto px-4">
    <div class="grid grid-cols-2 grid-rows-1">
        <div class="form-control">
            <label class="label cursor-pointer">
                <span class="label-text">Form value should match interface</span>
                <input type="checkbox" checked="checked" class="checkbox checkbox-primary"/>
            </label>
            <label class="label cursor-pointer">
                <span class="label-text">should strongly type</span>
                <input type="checkbox" checked="checked" class="checkbox checkbox-primary"/>
            </label>

        </div>

        <div class="mockup-window border bg-base-300">
            <div class="flex justify-center px-4 py-16 bg-base-200">
                <pre>{generatedCode}</pre>
            </div>
        </div>

    </div>
    <button id="btn-save" type="submit" class="btn btn-primary" on:click={save}>Save to file</button>


</div>
<style></style>

