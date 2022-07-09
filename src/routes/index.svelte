<h1>Convert all the things</h1>

<script>

    import * as converter from '../shared/converter.js';
    import * as file from '../shared/file.js';

    let input = null;
    let output = null;
    let validationError;


    let inputBrowseFile;
    $: {
        if (input) {
            try {
                JSON.parse(input);
                // invalid=false;
                validationError = '';
            } catch (e) {
                validationError = 'Invalid JSON provided, try again'
            }
        } else {
            validationError = 'No JSON provided'
        }
    }

    function convert(i) {
        output = converter.convertJsonToCSV(i);
    }

    function clear() {
        input = null;
        output = null;
    }

    async function fileBrowse(event) {
        let result = await file.readFile(event.target.files[0]);
        input = result;
    }

    async function fileBrowseCsv(event) {
        let result = await file.readFile(event.target.files[0]);
        output = result;
    }

    function convertOutput(output) {
        input = converter.convertCSVToJson(output);

    }
</script>

<div class="container">
    <div id="notifications" class="row">
        <div class="col">
            {#if validationError}
                <p class="center" style="color: red">{validationError}</p>
            {/if}
        </div>
    </div>
    <div class="row">
        <div id="left" class="col">
            <h2>JSON</h2>
            <textarea class="input" rows="6" cols="50" bind:value={input}></textarea>
        </div>
        <div id="conversions" class="col">
            <h2>Conversions</h2>
            <button on:click={convert(input)}> To CSV --></button>
            <button on:click={convertOutput(output)}>  To JSON </button>

            {#if input || output}
                <button on:click={clear(input)}>Clear</button>
            {/if}
        </div>
        <div id="right" class="col">
            <h2>Output</h2>
            <textarea class="output" rows="6" cols="50" bind:value={output}></textarea>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <label for="browseFile">Browse for json file</label>
            <input id="browseFile" type="file" accept=".json"
                   on:change={fileBrowse}/>
        </div>
        <div class="col"></div>
        <div class="col">
            <label for="browseFileCsv">Browse for csv file</label>
            <input id="browseFileCsv" type="file" accept=".csv"
                   on:change={fileBrowseCsv}/>
        </div>
    </div>
</div>
<style>
    .input, .output {
        resize: none;
    }

    .flex-container {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-evenly;
        row-gap: 10px;
        column-gap: 10px;
    }

    .flex-item {
        flex-basis: auto;
    }

    .center {
        justify-content: center;
        align-content: center;
        align-items: center;
    }

    .container {
        width: 100%
    }

    .row {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
    }

    .col {
        flex-direction: column;
        flex-basis: 100%;
        flex: 1;
    }
    .col-2 {
        flex-direction: column;
        flex-basis: 100%;
        flex: 2;
    }
    .col-4 {
        flex-direction: column;
        flex-basis: 100%;
        flex: 4;
    }

</style>
