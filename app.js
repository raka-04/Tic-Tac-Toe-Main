let bx = document.querySelectorAll(".inbox");
let resetBtn = document.querySelector(".reset");
let newGame = document.querySelector(".New-game");
let mgsContainer = document.querySelector("#mgs-container");
let mgs = document.querySelector("#mgs");

let currentPlayer = "X"; 
let gameActive = true; // Track if the game is still ongoing

const winPtrns = [
    [0,1,2], [0,3,6], [0,4,8], [1,4,7], [2,5,8], 
    [2,4,6], [3,4,5], [6,7,8]
];

function handleClick(bx) {
    if (!gameActive || bx.innerText !== "") return; // Stop clicks after game ends

    bx.innerText = currentPlayer;
    bx.classList.add(currentPlayer === 'X' ? "text-cyan-500" : "text-red-500"); // Add color

    if (checkWinner()) {
        showWinner(currentPlayer);
        gameActive = false; // Disable further moves
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch player
}

const showWinner = (winner) => {
    mgs.innerText = `🎉 Congratulations! ${winner} Wins!`;
    mgsContainer.classList.remove("hidden"); // Show the message container

    // Disable all buttons after the game ends
    bx.forEach(button => button.disabled = true);
};

const checkWinner = () => {
    let boxes = document.querySelectorAll(".inbox");

    for (let p of winPtrns) {
        let p1 = boxes[p[0]].innerText;
        let p2 = boxes[p[1]].innerText;
        let p3 = boxes[p[2]].innerText;

        if (p1 !== "" && p1 === p2 && p2 === p3) {
            return true; // A winner is found
        }
    }
    return false;
};

// Reset game function
const resetGame = () => {
    bx.forEach(button => {
        button.innerText = "";
        button.classList.remove("text-cyan-500", "text-red-500");
        button.disabled = false;
    });

    mgsContainer.classList.add("hidden"); // Hide message container
    gameActive = true; // Enable game again
    currentPlayer = "X"; // Reset player
};

// Attach reset function to button
resetBtn.addEventListener("click", resetGame);
newGame.addEventListener("click", resetGame);
