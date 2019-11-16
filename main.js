let landzone = document.getElementsByClassName("landing");
let marbles = document.getElementsByClassName("marble");
let guessRows = document.getElementsByClassName("guess");
let resultRows = document.getElementsByClassName("result");
let secretPegs = document.getElementsByClassName("secretPeg");
let submitButton = document.getElementById("submit");
const colors = ["A", "B", "C", "D", "E", "F"];
let turnNum = 0;
let theme = "X";
let code;

function populateBoard() {
    let ga = document.getElementsByClassName("guessArea")[0];
    let ra = document.getElementsByClassName("resultsArea")[0];
    for (let i = 0; i < 10; i++) {
        let guess = document.createElement("div");
        guess.classList.add("guess");
        ga.appendChild(guess);
        let result = document.createElement("div");
        result.classList.add("result");
        ra.appendChild(result);
        for (let j = 0; j < 4; j++) {
            let p = document.createElement("div");
            p.classList.add("peg");
            let s = document.createElement('div');
            s.classList.add("scorePeg");
            guess.appendChild(p);
            result.appendChild(s);
        }
    }
}

function generateRandomCode() {
    let code = []
    for (i=0; i<4; i++) {
        code.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    return code;
}

function newGame() {

    $('#winningModal').modal('hide');
    $('#losingModal').modal('hide');

    clearGuess();
    for (elem of document.getElementsByClassName("peg")){
        elem.className = "peg";
    }
    for (elem of document.getElementsByClassName("scorePeg")) {
        elem.className = "scorePeg";
    }
    for (elem of secretPegs){
        elem.className = "secretPeg";
    }

    turnNum = 0;
    code = generateRandomCode();
}

function reveal() {
    for (i in code) {
        secretPegs[i].classList.add(code[i]);
    }
}

function won() {
    console.log("You win!");
    reveal();
    $('#winningModal').modal('show');
}

function lost() {
    console.log("You Lose!");
    reveal();
    $('#losingModal').modal('show');
}

function onDragStart(event){
    event.dataTransfer.setData("text/plain", event.target.id + theme);
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
    submitButton.classList.remove("submitReady");
}

function validate() {
    for (z of landzone) {
        if (z.classList.length < 2){
            submitButton.classList.remove("submitReady");
            return false;
        }
    }
    console.log("Ready to roll, boss!")
    submitButton.classList.add("submitReady");
    return true;
}

function submitGuess() {
    if (!validate()) {return};
    let currentGuess = [];
    for (elem of landzone) {
        currentGuess.push(elem.classList[1][0]);
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

    let currRow = 9-turnNum;
    for (let i=0; i<4; i++) {
        guessRows[currRow].children[i].classList.add(result[0][i] + theme);
    }
    let i = 0;
    for (let j=0; j<result[1]; j++){
        resultRows[currRow].children[i].classList.add("blackPeg");
        i++;
    }
    for (let j=0; j<result[2]; j++) {
        resultRows[currRow].children[i].classList.add("whitePeg");
        i++;
    }

    if (result[1] == 4) {won();}
    else if (turnNum == 9) {lost();}
    else{turnNum++;}
}

function changeTheme(newTheme){
    if (turnNum > 0) {
        if (!confirm("This will start a new game. Are you sure?")){
            return;
        }
    }
    theme = newTheme;
    for (c of marbles) {
        c.className = "marble " + c.id + theme;
    }
    newGame();
}

populateBoard();

document.getElementById("reset").addEventListener("click", clearGuess);
submitButton.addEventListener("click", submitGuess);
document.getElementById("newGame").addEventListener("click", newGame);

for (c of marbles) {
    c.addEventListener("dragstart",onDragStart);
    c.className = "marble " + c.id + theme;
}

for (z of landzone) {
    z.addEventListener("dragover", allowDrop);
    z.addEventListener("dragleave", dragLeave);
    z.addEventListener("drop", drop);
}


//for testing --> remove before release
code = ["A", "B", "C", "D"];

let g1 = ["B", "B", "D", "A"];
let g2 = ["D", "C", "D", "F"];

// $("#infoModal").modal("show")
