import BARCODE from './my_barcode_library.js';

document.getElementById("submit").addEventListener("click", (e) => {
    BARCODE(document.getElementById("text").value, document.getElementById("canvas"));
})