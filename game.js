let canvas = document.getElementById("canvas");

let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;
let x = 0;
let y = 1;
let timer = 0;
let start = -1;
let delay = 20;

let oArray = [];

let data = oArray.slice();
let outputVal = false;

function speedUp() {
    if (delay > 2) {
        delay -= 2;
    }
    document.getElementById("speed").value = "Delay: " + delay;
}

function slowDown() {
    if (delay < 30) {
        delay += 2;
    }
    document.getElementById("speed").value = "Delay: " + delay;
}

function HFactor() {
    x = width / data.length;
}

function VFactor() {
    let max = Math.max(...data);
    y = (height - 50) / max;
}

function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = arr1.length; i--; ) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

function Trigger(e) {
    start *= -1;
    if (start == 1) {
        let testData = document
            .getElementById("input")
            .value.split(",")
            .map(Number);

        if (
            oArray == 0 ||
            oArray == null ||
            oArray == undefined ||
            !arraysEqual(oArray, testData)
        ) {
            oArray = testData;
            data = oArray.slice();
            HFactor();
            VFactor();
            outputVal = false;
            document.getElementById("output").value = "";
        }
    }
    e.target.innerHTML = start === -1 ? "Start" : "Stop";
}

function Reset(e) {
    start = -1;
    document.getElementById("start").innerHTML = "Start";
    let testData = document
        .getElementById("input")
        .value.split(",")
        .map(Number);
    oArray = testData;
    data = oArray.slice();
    outputVal = false;
    document.getElementById("output").value = "";
    HFactor();
    VFactor();

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    renderBars();
}

function BubbleSort(i) {
    for (let j = 0; j < data.length - i - 1; j++) {
        if (data[j] > data[j + 1]) {
            let temp = data[j];
            data[j] = data[j + 1];
            data[j + 1] = temp;
        }
    }
}

function checkSorted() {
    for (let i = 0; i < data.length; i++) {
        if (data[i] > data[i + 1]) {
            return false;
        }
    }
    return true;
}

function renderBars() {
    timer++;
    let i = 0;

    if (timer > delay) {
        if (start === 1 && !checkSorted()) {
            if (i < data.length) {
                BubbleSort(i);
                i++;
            }
        }

        timer = 0;
    }

    if (checkSorted() && !outputVal) {
        if (data.length > 0) {
            console.log(data);
            document.getElementById("output").value = data.join(", ");
            outputVal = true;
        }
    }
    for (let i = 0; i < data.length; i++) {
        if (!checkSorted()) {
            ctx.fillStyle = "red";
        } else {
            ctx.fillStyle = "green";
        }

        ctx.fillRect(x * i, height - data[i] * y, x - 1, data[i] * y);
    }
}

ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

function Game() {
    if (start === 1) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        renderBars();
    }

    requestAnimationFrame(Game);
}

Game();
