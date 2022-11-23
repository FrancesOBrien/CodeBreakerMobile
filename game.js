//global variable for guesses
let guesses = []
let guess = [] 
let guessIndex = 0
let feedbackIndex = guessIndex

//generate code one time for each round of the game
//function getCode will generate an array of 4 randomly from colors[]
//function displayCode will load the generated code (secret) into the circles in the solution div
const colors = ['orangered', 'rgb(49, 164, 222)', 'rgb(236, 217, 14)', 'rgb(30, 179, 57)', 'black', 'lightgoldenrodyellow']

let getCode = (colors) => {
const code = []
    for (let i = 0; i < 4; i++){
    code.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    return code
}
let secret = getCode(colors)


let soln = (document.querySelector(".code"))

let displayCode = () => {
    for (let i = 0; i < secret.length; i++){
        soln.children[i].style.backgroundColor = secret[i]
    }
}

getCode(colors)
// console.log(secret) //comment this out when going live or people can inspect and cheat!
displayCode() //loads the secret code into the solution div

//getFeedback compares the guess[] to the code[] and creates feedback[], which is stored in the global variable clues, which is then used to update the feedback DOM. This function compares Each element of the guess for 2 conditions, which eliminates a feedback problem I had in earlier versions where a correct color, correct position could possibly give a red and a black dot.
function getFeedback(guess, secret){ 
    const feedback = [] 
    guess.forEach((element, index) => {
        if (element === secret[index] && secret.includes(element)){
            feedback.push('red')
        } else if (secret.includes(element)){
            feedback.push('black')
        } else {
            feedback.push('blanchedalmond')
        }
    })
    feedback.sort()
    feedback.reverse()
    return feedback
}

//clues is a global variable that contains the feedback array
let clues = getFeedback(guess, secret)

//check win checks the feedback row and if there is no red or if it includes black you win. adding blanchedalmond to getFeedback fixed a situation where an empty feedback row resulted in a win modal (because no red)
function checkWin(){
    let win = true
    for (let i = 0; i < clues.length; i++){
        if (clues[i] !== 'red' || clues.includes('black')){ //win case needs to cover doubles in guess[]
            win = false
        }
    } return win
}

//calculate guess: 
//function to record each guess on a separate guessIndex in the array of guesses
//then update the DOM so guesses appear as colors
//then update the DOM so the feedback clues appear as colors
//then check for a win
//then move to the next guessIndex after 4 guesses

let calculateGuess = () => {
    guesses[guessIndex] = guess
    updateGuessDOM()
    if (guess.length >= 4){
        // console.log(`the guess is ${guess}`)
        // console.log(`the secret is ${secret}`)
        clues = getFeedback(guess, secret)
        // console.log(`the clues are ${clues}`)
        // console.log(feedbackElements)
        updateFeedbackDOM()
        if (checkWin() == true){
            console.log('you win! play again?')
            winModal.style.display = "flex"
            cover.style.display = "none"
            solution.style.display = "flex"
        }
        guess = [] //resets guess array for next guessIndex
        guessIndex++
        if (guessIndex == 10){
            console.log('you lose, try again?')
            loseModal.style.display = "flex"
            cover.style.display = "none"
            solution.style.display = "flex"
        }
    } }


//2D array for guess board so the guess changes the guessIndex row in the DOM

let circles = Array.from(document.querySelectorAll(".guess"))
let guessElements = circles.map(el => {
    return el.children
})

let updateGuessDOM = () => {
    for (let i = 0; i < guesses.length; i++){
        for (let j = 0; j < guess.length; j++){
            guessElements[i][j].style.backgroundColor = guesses[i][j]
            guessElements[i][j].style.border = guesses[i][j]
        }
    }
}
//feedback array and circles to update the feedback row in the DOM
let reply = Array.from(document.querySelectorAll(".feedback"))
let feedbackElements = reply.map(el => {
    // console.log(el.children)
    return el.children
})

let updateFeedbackDOM = () => { 
        for (let j = 0; j < feedbackElements[guessIndex].length; j++){
        feedbackElements[guessIndex][j].style.backgroundColor = clues[j]
    }
}
//listen for click on color buttons, update DOM with guesses
const blackBtn = document.getElementById("button-black");
blackBtn.addEventListener('click', () => {
    guess.push("black")
    calculateGuess()
})
const blueBtn = document.getElementById("button-blue");
blueBtn.addEventListener('click', () => {
    guess.push("rgb(49, 164, 222)")
    calculateGuess()
})
const yellBtn = document.getElementById("button-yellow");
yellBtn.addEventListener('click', () => {
    guess.push("rgb(236, 217, 14)")
    calculateGuess()
})
const redBtn = document.getElementById("button-red");
redBtn.addEventListener('click', () => {
    guess.push("orangered")
    calculateGuess()
})
const greenBtn = document.getElementById("button-green");
greenBtn.addEventListener('click', () => {
    guess.push("rgb(30, 179, 57)")
    calculateGuess()
})
const whiteBtn = document.getElementById("button-white");
whiteBtn.addEventListener('click', () => {
    guess.push("lightgoldenrodyellow")
    calculateGuess()
})

//other buttons and modals
//restart button
const restartBtn = document.getElementById("restartBtn");
restartBtn.addEventListener("click", () => {
    window.location.reload();
})

//open help modal
const helpBtn = document.getElementById("helpBtn");
helpBtn.addEventListener("click", (openHelp))
function openHelp(){
    helpModal.style.display = 'flex';
}

//close help modal
const closeBtn = document.getElementsByClassName("closeBtn")[0];
closeBtn.addEventListener("click", (closeModal));
function closeModal(){
    helpModal.style.display = 'none';
}
const lxBtn = document.getElementById("lxBtn");
lxBtn.addEventListener('click', (closeLose));
function closeLose(){
    loseModal.style.display = 'none'
}
const tryAgainBtn = document.getElementById("tryAgainBtn");
tryAgainBtn.addEventListener("click", () => {
    window.location.reload();
})

const wxBtn = document.getElementById("wxBtn");
wxBtn.addEventListener("click", (winClose));
function winClose(){
    winModal.style.display = 'none'
}
const playAgainBtn = document.getElementById("playAgainBtn");
playAgainBtn.addEventListener("click", () => {
    window.location.reload();
})
