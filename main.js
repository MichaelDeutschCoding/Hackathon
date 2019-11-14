let landzone = document.getElementsByClassName("landing");
let marbles = document.getElementsByClassName("marble");
let submitButton = document.getElementById("submit");
let resetButton = document.getElementById("reset");
const colors = ["A", "B", "C", "D", "E", "F"]


function onDragStart(event){
    event.dataTransfer.setData("text/plain", event.target.id)
    event.currentTarget.classList.add("holdingSource");
    console.log("lifting! Data transferring:", event.dataTransfer.getData("text"))
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
    console.log("dropping:", data)
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
    let currentGuess = [];
    for (zone of landzone) {
        currentGuess.push(zone.classList.item(1));
    }
    // console.log(currentGuess);
    return currentGuess;
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



function generateRandomCode() {
    let code = []
    for (i=0; i<4; i++) {
        code.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    return code;
}

function analyzeGuess(guess, code) {
    let blacks = 0;
    for (let i  in guess) {
        if (code[i] == guess[i]) {
            blacks++
        }
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
    return [blacks, whites]
}

let allDivs = document.getElementsByTagName("div")

function removeBorders () {
    for (elem of allDivs) {
        elem.style.border = "none";
    }
}

