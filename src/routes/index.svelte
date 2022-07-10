<script>

    import * as converter from '../shared/converter.js';
    import * as file from '../shared/file.js';

    let leftInput = null;
    let rightInput = null;
    let leftNotification, rightNotification;


    let inputBrowseFile;
    $: {
        if (leftInput) {
            try {
                JSON.parse(leftInput);
                leftNotification = '';
            } catch (e) {
                leftNotification = 'Invalid JSON provided, try again'
            }
        } else {
            leftNotification = 'No JSON provided'
        }

        if (rightInput) {
            //todo: validate csv
        }
    }

    function convert(i) {
        rightInput = converter.convertJsonToCSV(i);
    }

    function clear() {
        leftInput = null;
        rightInput = null;
    }

    async function fileBrowse(event) {
        let result = await file.readFile(event.target.files[0]);
        leftInput = result;
    }

    async function fileBrowseCsv(event) {
        let result = await file.readFile(event.target.files[0]);
        rightInput = result;
    }

    function convertOutput(output) {
        leftInput = converter.convertCSVToJson(output);
    }
</script>

<div class="container mx-auto px-4">
    <div id="notifications" class="grid grid-cols-3 grid-rows-1">
        <div class="w-full">
            {#if leftNotification}
                <p>{leftNotification}</p>
            {/if}
        </div>
        <div class="w-full">
        </div>
        <div class="w-full">
            {#if rightNotification}
                <p>{rightNotification}</p>
            {/if}
        </div>
    </div>


    <div class="grid grid-cols-2 grid-rows-1">

        <div class="card w-96 bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="card-title">JSON</h2>
                <textarea class="textarea textarea-primary resize-none" bind:value={leftInput}></textarea>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary" on:click={convert(leftInput)}>To CSV</button>
                </div>

                    <input type="file" accept=".json" class="file-input" on:change={fileBrowse}/>

            </div>
        </div>
        <div class="card w-96 bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="card-title">CSV</h2>
                <textarea class="textarea textarea-primary resize-none" bind:value={rightInput}></textarea>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary" on:click={convertOutput(rightInput)}>To JSON</button>
                </div>
                <input type="file" accept=".json" class="file-input" on:change={fileBrowse}/>
            </div>
        </div>

        <div class="grid grid-cols-1 grid-rows-1">
            <button class="btn btn-primary" on:click={clear(leftInput)} disabled="{!leftInput && !rightInput}">Clear</button>
        </div>
    </div>


</div>
<style>
</style>
