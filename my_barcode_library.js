const BARCODE = (() => {


    function renderRectangle(x, y = 0, width, height, fillStyle, element) {
        var ctx = element.getContext("2d");
        ctx.fillStyle = fillStyle;
        ctx.fillRect(x, y, width, height);
    }

    //using code b for now
    const CODE128 = {
        pattern: {
            0: "212222",
            1: "222122",
            2: "222221",
            3: "121223",
            4: "121322",
            5: "131222",
            6: "122213",
            7: "122312",
            8: "132212",
            9: "221213",
            10: "221312",
            11: "231212",
            12: "112232",
            13: "122132",
            14: "122231",
            15: "113222",
            16: "123122",
            17: "123221",
            18: "223211",
            19: "221132",
            20: "221231",
            21: "213212",
            22: "223112",
            23: "312131",
            24: "311222",
            25: "321122",
            26: "321221",
            27: "312212",
            28: "322112",
            29: "322211",
            30: "212123",
            31: "212321",
            32: "232121",
            33: "111323",
            34: "131123",
            35: "131321",
            36: "112313",
            37: "132113",
            38: "132311",
            39: "211313",
            40: "231113",
            41: "231311",
            42: "112133",
            43: "112331",
            44: "132131",
            45: "113123",
            46: "113321",
            47: "133121",
            48: "313121",
            49: "211331",
            50: "231131",
            51: "213113",
            52: "213311",
            53: "213131",
            54: "311123",
            55: "311321",
            56: "331121",
            57: "312113",
            58: "312311",
            59: "332111",
            60: "314111",
            61: "221411",
            62: "431111",
            63: "111224",
            64: "111422",
            65: "121124",
            66: "121421",
            67: "141122",
            68: "141221",
            69: "112214",
            70: "112412",
            71: "122114",
            72: "122411",
            73: "142112",
            74: "142211",
            75: "241211",
            76: "221114",
            77: "413111",
            78: "241112",
            79: "134111",
            80: "111242",
            81: "121142",
            82: "121241",
            83: "114212",
            84: "124112",
            85: "124211",
            86: "411212",
            87: "421112",
            88: "421211",
            89: "212141",
            90: "214121",
            91: "412121",
            92: "111143",
            93: "111341",
            94: "131141",
            95: "114113",
            96: "114311",
            97: "411113",
            98: "411311",
            99: "113141",
            100: "114131",
            101: "311141",
            102: "411131",
            103: "211412",
            104: "211214",
            105: "211232",
            106: "233111"
        },
        A: {

        },
        B: {
            " ": 0,
            "!": 1,
            '"': 2,
            "#": 3,
            "$": 4,
            "%": 5,
            "&": 6,
            "'": 7,
            "(": 8,
            ")": 9,
            "*": 10,
            "+": 11,
            ",": 12,
            "-": 13,
            ".": 14,
            "/": 15,
            "0": 16,
            "1": 17,
            "2": 18,
            "3": 19,
            "4": 20,
            "5": 21,
            "6": 22,
            "7": 23,
            "8": 24,
            "9": 25,
            ":": 26,
            ";": 27,
            "<": 28,
            "=": 29,
            ">": 30,
            "?": 31,
            "@": 32,
            "A": 33,
            "B": 34,
            "C": 35,
            "D": 36,
            "E": 37,
            "F": 38,
            "G": 39,
            "H": 40,
            "I": 41,
            "J": 42,
            "K": 43,
            "L": 44,
            "M": 45,
            "N": 46,
            "O": 47,
            "P": 48,
            "Q": 49,
            "R": 50,
            "S": 51,
            "T": 52,
            "U": 53,
            "V": 54,
            "W": 55,
            "X": 56,
            "Y": 57,
            "Z": 58,
            "[": 59,
            "\\": 60,
            "]": 61,
            "^": 62,
            "_": 63,
            "`": 64,
            "a": 65,
            "b": 66,
            "c": 67,
            "d": 68,
            "e": 69,
            "f": 70,
            "g": 71,
            "h": 72,
            "i": 73,
            "j": 74,
            "k": 75,
            "l": 76,
            "m": 77,
            "n": 78,
            "o": 79,
            "p": 80,
            "q": 81,
            "r": 82,
            "s": 83,
            "t": 84,
            "u": 85,
            "v": 86,
            "w": 87,
            "x": 88,
            "y": 89,
            "z": 90,
            "{": 91,
            "|": 92,
            "}": 93,
            "~": 94,
            "DEL": 95,
            "FNC 3": 96,
            "FNC 2": 97,
            "Shift A": 98,
            "Code C": 99,
            "FUNC 4": 100,
            "Code A": 101,
            "FNC 1": 102
        },
        C: {},
        common: {
            "Start Code A": 103,
            "Start Code B": 104,
            "Start Code C": 105,
            "Stop": 106
        }
    }


    //pass the string to make a barcode
    //call renderBarcodeLetter per letter in the string
    function renderBarcode(dataToRender, elementToRender) {
        //keep a reference to the context
        let elementToRenderContext = elementToRender.getContext("2d");
        //get width and height of the element to clear the rectangle in case someone wants to run a new barcode
        let width = elementToRender.width;
        let height = elementToRender.height;
        //clear the canvas
        elementToRenderContext.clearRect(0, 0, width, height);
        let offScreenCanvas = document.createElement("canvas");
        offScreenCanvas.width = elementToRender.width;
        offScreenCanvas.height = elementToRender.height;
        //keep track of current position
        let currentPosition = 0;
        //need to keep track of a running sum
        let sum = 0;
        currentPosition = renderBarcodeLetter(0, 'Start Code B', offScreenCanvas);
        sum += CODE128.common['Start Code B'];
        Array.from(dataToRender).forEach((letter, idx) => {
            currentPosition = renderBarcodeLetter(currentPosition, letter, offScreenCanvas);
            let value = (CODE128.B[letter] * (idx + 1))
            //add 1 to index since barcode position is not 0 based
            sum += value

        })

        let checksum = sum % 103;
        console.log({
            checksum: checksum
        })
        currentPosition = renderBarcodeLetter(currentPosition, checksum, offScreenCanvas)

        currentPosition = renderBarcodeLetter(currentPosition, 'Stop', offScreenCanvas, true)
        elementToRenderContext.drawImage(offScreenCanvas, 0, 0);
    }


    //Draws a barcode per letter and
    function renderBarcodeLetter(currentPosition, letter, offscrenElementToRender, end) {
        //look up symbology and call the render rectangle 
        //use this var to track current coordinate based on the pattern
        let position = currentPosition;
        let pattern;
        if (typeof letter == 'string') {
            let letterValue = CODE128.common[letter] ? CODE128.common[letter] : CODE128.B[letter];
            pattern = CODE128.pattern[letterValue];
        }
        if (typeof letter === "number") {
            console.log("number")
            pattern = CODE128.pattern[letter]
        }

        Array.from(pattern).forEach((number, idx) => {
            let fillStyle = (idx + 1) % 2 === 0 ? 'white' : 'black';
            //todo: make the settings configurable, including the width and height
            let width = parseInt(number) * 2;
            renderRectangle(position, 0, width, 50, fillStyle, offscrenElementToRender)
            position += width;
        })

        if (end) {
            renderRectangle(position, 0, 2, 50, "black", offscrenElementToRender)
        }
        return position
    }

    //todo: make the whole thing inside of a module so no global variables

    //create a function to switch between sets A, B, C if character needed not discovered in current set
    return renderBarcode
})();

export default BARCODE;