let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let player1 = '';
let player2 = '';
let xWins = 0;
let oWins = 0;

function startGame() {
  player1 = document.getElementById('player1Input').value;
  player2 = document.getElementById('player2Input').value;
  if (player1 && player2) {
    document.getElementById('usernamePage').style.display = 'none';
    document.getElementById('gamePage').style.display = 'flex';
    document.getElementById('turnIndicator').textContent = `Turn : ${player1} [ X ]`;
  } else {
    alert('Please enter both player names');
  }
}

function makeMove(index) {
  if (gameBoard[index] === '' && gameActive) {
    gameBoard[index] = currentPlayer;
    document.querySelectorAll('.cell')[index].textContent = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('turnIndicator').textContent = `Turn : ${currentPlayer === 'X' ? player1 : player2} [ ${currentPlayer} ]`;
  }
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      gameActive = false;
      if (gameBoard[a] === 'X') {
        xWins++;
        showResult(`${player1} wins!`);
      } else {
        oWins++;
        showResult(`${player2} wins!`);
      }
      return;
    }
  }

  if (!gameBoard.includes('')) {
    gameActive = false;
    showResult('It\'s a draw!');
  }
}

function showResult(message) {
  document.getElementById('gamePage').style.display = 'none';
  document.getElementById('resultPage').style.display = 'block';
  document.getElementById('resultMessage').textContent = message;
  document.getElementById('scoreBoard').textContent = `${player1} Wins: ${xWins} | ${player2} Wins: ${oWins}`;
}

function playAgain() {
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
  document.getElementById('resultPage').style.display = 'none';
  document.getElementById('gamePage').style.display = 'flex';
  document.getElementById('turnIndicator').textContent = `${player1}'s turn [ X ]`;
}


