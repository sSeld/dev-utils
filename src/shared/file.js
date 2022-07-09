export async function readFile(file) {
    let reader = new FileReader();
    // return reader.readAsText(file);
    return new Promise((res,rej)=> {
        reader.addEventListener('load', (event) => {
            const result = event.target.result;
            res(result);
        });
        reader.readAsText(file);
    });
}
