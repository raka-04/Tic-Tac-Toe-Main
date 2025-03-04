const bx = document.querySelectorAll(".inbox");
const resetBtn = document.querySelector(".reset");
const newGameBtn = document.querySelector(".new-game");
const mgsContainer = document.querySelector("#mgs-container");
const mgs = document.querySelector("#mgs");

let currentPlayer = "X"; 
let gameActive = true;

const winPtrns = [
    [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], 
    [2,5,8], [0,4,8], [2,4,6]
];

bx.forEach((button, index) => {
    button.addEventListener("click", () => handleClick(button, index));
});

function handleClick(button, index) {
    if (!gameActive || button.innerText !== "") return;

    button.innerText = currentPlayer;
    button.classList.add(currentPlayer === "X" ? "text-cyan-500" : "text-red-500");

    if (checkWinner()) {
        showWinner(currentPlayer === "X" ? "Player 1" : "Player 2");
        gameActive = false;
        return;
    }

    if ([...bx].every(btn => btn.innerText !== "")) {
        showDraw();
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner() {
    return winPtrns.some(pattern => {
        const [a, b, c] = pattern;
        return bx[a].innerText && bx[a].innerText === bx[b].innerText && bx[a].innerText === bx[c].innerText;
    });
}

function showWinner(winner) {
    mgs.innerText = `🎉 Congratulations! ${winner} Wins!`;
    mgsContainer.classList.remove("hidden");
    mgsContainer.classList.add("flex");
}

function showDraw() {
    mgs.innerText = "🤝 It's a Draw!";
    mgsContainer.classList.remove("hidden");
    mgsContainer.classList.add("flex");
}

function resetGame() {
    bx.forEach(button => {
        button.innerText = "";
        button.classList.remove("text-cyan-500", "text-red-500");
    });

    mgsContainer.classList.add("hidden");
    mgsContainer.classList.remove("flex");
    gameActive = true;
    currentPlayer = "X";
}

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
