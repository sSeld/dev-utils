<h1>Convert all the things</h1>

<script>
    import * as converter from '../shared/converter.js';

    let input = null;
    let output = null;
    let validationError;

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

</script>

<div class="flex-container" style="height: 40em; width: 100%;">
    <section class="flex-item input">
        <h2>JSON</h2>
        {#if validationError}
            <p style="color: red">{validationError}</p>
        {/if}
        <textarea class="input" rows="10" cols="50" bind:value={input}></textarea>
    </section>
    <section>
        <h2>Conversions</h2>
        <button on:click={convert(input)}> To CSV --></button>
    </section>
    <section class="flex-item output">
        <h2>Output</h2>
        <textarea class="output" rows="10" cols="50" bind:value={output} disabled></textarea>
    </section>
    <section class="flex-item">
        <h2>Output Actions</h2>
        {#if input || output}
            <button on:click={clear(input)}>Clear</button>
        {/if}
    </section>
</div>
<style>
    .input, .output {
        height: 100%;
        width: 50%;
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
</style>
