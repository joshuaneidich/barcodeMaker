(() => {
    let fileEl = document.getElementById("file")
    fileEl.addEventListener("change", async (e) => {
        let file = e.target.files[0];
        console.dir(file);
        let fileContent = await file.text();
        console.dir(fileContent);
        loopOverFileContents(fileContent)
    })
})()




function loopOverFileContents(fileContents) {
    let barcodeTextArray = fileContents.split(",");
    console.dir(barcodeTextArray);
    for (let i = 0; i < barcodeTextArray.length; i++) {
        let textToWrite = barcodeTextArray[i].trim();
        console.dir(textToWrite);
        console.log(textToWrite.length);
        let canvasId = `canvas${i}`;
        //create the canvas object
        let canvasEl = createBarcodeCanvasElement(canvasId);
        //append the canvas object
        appendBarcodeElement(canvasEl, "barcodeContainer");
        JsBarcode(`#${canvasId}`, textToWrite, {
            format: "CODE128",
            // lineColor: "#0aa",
            // width: 4,
            // height: 40,
            displayValue: true
        });
    }
}


function createBarcodeCanvasElement(canvasId) {
    let canvasEl = document.createElement("canvas");
    canvasEl.setAttribute("id", canvasId);
    return canvasEl;
}

function appendBarcodeElement(elToAppend, parentEl) {
    let appendLocation = document.getElementById(parentEl);
    appendLocation.appendChild(elToAppend);
    return
}