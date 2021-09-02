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
    let barcodeRow = fileContents.split('\n');
    let separator = '|'
    for (let i = 0; i < barcodeRow.length; i++) {
        console.log(barcodeRow[i])
        let barcodeTextArray = barcodeRow[i].split(separator);
        let page = document.createElement("div");
        let pageId = `page-${i}`;
        page.setAttribute("id", pageId);
        page.classList.add("page");
        console.log(page)
        appendElement(page, "barcodeContainer");
        for (let j = 0; j < barcodeTextArray.length; j++) {
            let textToWrite = barcodeTextArray[j].trim();
            let canvasId = `canvas${j}`;
            //create the canvas object
            let canvasEl = createBarcodeCanvasElement(canvasId);
            //append the canvas object
            appendElement(canvasEl, pageId);
            JsBarcode(`#${canvasId}`, textToWrite, {
                format: "CODE128",
                // lineColor: "#0aa",
                // width: 4,
                height: 40,
                displayValue: true
            });
        }

    }

}

//  reference  https://www.sitepoint.com/css-printer-friendly-pages/

function createBarcodeCanvasElement(canvasId) {
    let canvasEl = document.createElement("canvas");
    canvasEl.setAttribute("id", canvasId);
    return canvasEl;
}

function appendElement(elToAppend, parentEl) {
    let appendLocation = document.getElementById(parentEl);
    appendLocation.appendChild(elToAppend);
    return
}