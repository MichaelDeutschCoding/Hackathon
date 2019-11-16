let landzone = document.getElementsByClassName("landing");
let marbles = document.getElementsByClassName("marble");
let guessRows = document.getElementsByClassName("guess");
let resultRows = document.getElementsByClassName("result");
let secretPegs = document.getElementsByClassName("secretPeg");
let submitButton = document.getElementById("submit");
let muteButton = document.getElementById("mute");
const colors = ["A", "B", "C", "D", "E", "F"];
let turnNum = 0;
let theme = "X";
let code;
let mute = false;

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

function addEventListeners() {
    document.getElementById("reset").addEventListener("click", clearGuess);
    submitButton.addEventListener("click", submitGuess);
    document.getElementById("newGame").addEventListener("click", newGame);
    document.getElementById("info").addEventListener("click", function () {
        $("#infoModal").modal("show");
    });
    muteButton.addEventListener("click", toggleSoundEffects);
    document.getElementById("revealCode").addEventListener("click", function () {
        if (confirm("You really want to give up?"))
            reveal();
    });
    for (c of marbles) {
        c.addEventListener("dragstart", onDragStart);
        c.className = "marble " + c.id + theme;
    }
    for (z of landzone) {
        z.addEventListener("dragover", allowDrop);
        z.addEventListener("dragleave", dragLeave);
        z.addEventListener("drop", drop);
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
        secretPegs[i].classList.add(code[i]+theme);
    }
}

function won() {
    console.log("You win!");
    if(!mute) soundEffects["won_game"].play();    
    reveal();
    $('#winningModal').modal('show');
}

function lost() {
    console.log("You Lose!");
    if(!mute) soundEffects["lost_game"].play();
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
    soundEffects["drop_piece"].currentTime = 0;
    if(!mute) {soundEffects["drop_piece"].play()};
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
    if(!mute) soundEffects["submit_guess"].play();
    display(result);
    clearGuess();
}

function analyzeGuess(code, guess) {
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
    if ((blacks + whites == 0) && (!mute)) {
        soundEffects["none_correct"].play();
    }

    console.log("Blacks:", blacks, "Whites:", whites);
    return [guess, blacks, whites];
}

function display(result) {

    let currRow = 9-turnNum;

    // Display guess pegs
    for (let i=0; i<4; i++) {
        guessRows[currRow].children[i].classList.add(result[0][i] + theme);
    }

    // Display result black pegs
    let i = 0;
    for (let j=0; j<result[1]; j++){
        resultRows[currRow].children[i].classList.add("blackPeg");
        i++;
    }

    // Display result  white pegs
    for (let j=0; j<result[2]; j++) {
        resultRows[currRow].children[i].classList.add("whitePeg");
        i++;
    }

    // Check for win/loss conditions
    if (result[1] == 4) {won();}
    else if (turnNum == 9) {lost();}
    else{turnNum++;}
}

function changeTheme(newTheme) {
    if (turnNum > 0) {
        if (!confirm("This will start a new game. Are you sure?")){
            return;
        }
    }
    theme = newTheme;
    for (c of marbles) {
        c.className = "marble " + c.id + theme;
    }
    if (!mute) {soundEffects["switch_theme"].play()};
    newGame();
}

const toggleSoundEffects = () => {
    mute = (!mute);
    muteButton.classList.toggle("mute-pressed");
}

let soundEffects = {}

function addSoundEffect(effect) {
    let new_audio = document.createElement("audio");
    let source = document.createElement("source");
    source.type = "audio/wav";
    source.src = "sounds/" + effect +".wav";
    new_audio.appendChild(source);
    document.body.appendChild(new_audio);
    soundEffects[effect] = new_audio;
}

addSoundEffect("drop_piece");
addSoundEffect("submit_guess");
addSoundEffect("won_game");
addSoundEffect("lost_game");
addSoundEffect("none_correct");
addSoundEffect("switch_theme");


populateBoard();
addEventListeners();

//for testing --> remove before release
code = ["A", "B", "C", "D"];

// $("#infoModal").modal("show")
