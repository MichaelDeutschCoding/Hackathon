let landzone = document.getElementsByClassName("landing");
let marbles = document.getElementsByClassName("marble");
let submitButton = document.getElementById("submit");
let resetButton = document.getElementById("reset");
let guessRows = document.getElementsByClassName("guess");
let resultRows = document.getElementsByClassName("result");
const colors = ["A", "B", "C", "D", "E", "F"];
let turnNum;
let code;

function generateRandomCode() {
    let code = []
    for (i=0; i<4; i++) {
        code.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    return code;
}

function newGame() {

    // set board and input display to be visible
    clearGuess();
    for (d of document.getElementsByClassName("peg")){
        d.className = "peg";
    }
    for (d of document.getElementsByClassName("scorePeg")) {
        d.className = "scorePeg";
    }

    turnNum = 0;
    code = generateRandomCode();
}

function onDragStart(event){
    event.dataTransfer.setData("text/plain", event.target.id)
    event.currentTarget.classList.add("holdingSource");
}

function dragEnded(event) {
    event.currentTarget.classList = "marble";
}

function allowDrop(ev) {
    ev.preventDefault();
    ev.target.classList.add("landingHover");
}

function dragLeave(ev) {
    ev.target.classList.remove("landingHover");
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.classList = "landing " + data;
    ev.target.classList.remove("landingHover");
    validate()
}

function clearGuess() {
    for (z of landzone) {
        z.classList = "landing";
    }
    submitButton.className = "submitUnready";
}

function validate() {
    for (z of landzone) {
        if (z.classList.length < 2){
            console.log("not valid")
            // submitButton.className = "submitUnready";
            return false;
        }
    }
    console.log("Ready to roll, boss!")
    submitButton.className = "submitReady";
    return true;
}

function submitGuess() {
    // if (!validate()) {return};                   ADD after Testing
    let currentGuess = [];
    for (elem of landzone) {
        currentGuess.push(elem.classList[1]);
    }
    // currentGuess = ["A", "D", "F", "F"];            // REMOVE after testing
    let result = analyzeGuess(code, currentGuess);
    console.log(result);
    display(result);
    
    clearGuess();

}

function analyzeGuess(code, guess) {
    if (code.length != guess.length) {
        throw "Ya done goofed!";
    }
    let blacks = 0;
    for (let i  in guess) {
        if (code[i] == guess[i]) {blacks++}
    }
    let whites = 0-blacks;
    for (color of colors) {
        let g = 0;
        let c = 0;
        for (let i in guess) {
            if (guess[i] == color) {g++;}
            if (code[i] == color) {c++;}
        }
        whites = (g > c) ? whites+c : whites+g;
    }
    console.log("Blacks:", blacks, "Whites:", whites);
    return [guess, blacks, whites];
}

function display(result) {
    for (let i=0; i<4; i++) {
        console.log(guessRows[turnNum].children[i].classList)
        guessRows[turnNum].children[i].classList.add(result[0][i]);
    }
    let i = 0;
    for (let j=0; j<result[1]; j++){
        resultRows[turnNum].children[i].classList.add("blackPeg");
        i++;
    }
    for (let j=0; j<result[2]; j++) {
        resultRows[turnNum].children[i].classList.add("whitePeg");
        i++;
    }
    turnNum++;
}

resetButton.addEventListener("click", clearGuess);
submitButton.addEventListener("click", submitGuess)

for (c of marbles) {
    c.addEventListener("dragstart",onDragStart);
    c.addEventListener("dragend", dragEnded);
}

for (z of landzone) {
    z.addEventListener("dragover", allowDrop);
    z.addEventListener("dragleave", dragLeave);
    z.addEventListener("drop", drop);
}
turnNum = 0;
code = ["A", "B", "C", "D"];



