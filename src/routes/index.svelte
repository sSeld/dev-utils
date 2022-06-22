<h1>Convert all the things</h1>

<script>
    let input = null;
    let output = null;
    function convert(i) {
        console.log('convert', i);
        let obj = JSON.parse(i);
        if (obj instanceof Array){
            console.log('array as root');
            output = obj[0];
        }
        else {
            console.log('obj as root');
        }
    }

</script>

<div class="flex-container" style="height: 40em; width: 100%;">
    <section class="flex-item input">
        <h2>JSON</h2>
        <input type="text" class="input" bind:value={input}/>
    </section>
    <section>
        <h2>Conversions</h2>
        <button on:click={convert(input)}> To CSV --></button>
    </section>
    <section class="flex-item output">
        <h2>Output</h2>
        <input type="text" class="output" bind:value={output} disabled/>
    </section>
</div>
<style>
    .input, .output {
        height: 100%;
        width: 50%;
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
