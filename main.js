let landzone = document.getElementsByClassName("landing");
let colorPal = document.getElementsByClassName("color");
let submitButton = document.getElementById("submit");


function onDragStart(event){
    event.dataTransfer.setData("text/plain", event.target.id)
    event.currentTarget.style.border = "3px dashed yellow";
    console.log("lifting! Data transferring:", event.dataTransfer.getData("text"))
}
function dragEnded(event) {
    event.currentTarget.style.border = "2px solid black";
}

function allowDrop(ev) {
    ev.preventDefault();
    ev.target.style.border = "3px dashed yellow";
}

function dragLeave(ev) {
    ev.target.style.border = "2px solid black";
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log("dropping:", data)
    // ev.target.style.background = data;
    ev.target.classList = "box landing " + data;
    ev.target.style.border = "2px solid black";
    validate()

}

function clearColors() {
    for (z of landzone) {
        z.classList = "box landing";
    }
    validate();
}

function validate() {
    for (z of landzone) {
        if (z.classList.length < 3){
            console.log("not valid")
            submitButton.className = "submitUnready";
            return false;
        }
    }
    console.log("All good boss!")
    submitButton.className = "submitReady";
    return true;
}

for (c of colorPal) {
    c.addEventListener("dragstart",onDragStart);
    c.addEventListener("dragend", dragEnded);
}

for (z of landzone) {
    z.addEventListener("dragover", allowDrop);
    z.addEventListener("dragleave", dragLeave);
    z.addEventListener("drop", drop);
}

const colors = ["A", "B", "C", "D", "E", "F"]
const code = ["B", "B", "D", "E"];

let g1 = ["A", "B", "A", "C"];
let g2 = ["B", "E", "A", "E"];
let g3 = ["E", "B", "D", "A"]

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
            if (guess[i] == color) {
                g++;
            }
            if (code[i] == color) {
                c++;
            }
        }
        whites = (g > c) ? whites+c : whites+g;
    }
    console.log("Blacks:", blacks, "Whites:", whites);
}
analyzeGuess(g1, code)
analyzeGuess(g3, code)

console.log(generateRandomCode());