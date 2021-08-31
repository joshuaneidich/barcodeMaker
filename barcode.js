(() => {
    let fileEl = document.getElementById("file")
    fileEl.addEventListener("change", async (e) => {
        let file = e.target.files[0];
        console.dir(file);
        let fileContent = await file.text();
        console.dir(fileContent);
        loopOverFileContents(fileContent)
    })
    JsBarcode(".title", "Barcode Maker");
})()




function loopOverFileContents(fileContents) {
    // split separator out into its own variable so we can later change options in the interface
    console.log(fileContents.split('\n')) //test to add an outer loop for creating a separator page for printing purposes.
    let separator = '|'
    let barcodeTextArray = fileContents.split(separator);
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

// add an element and reference  https://www.sitepoint.com/css-printer-friendly-pages/
function createSeparatePageEl() {

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