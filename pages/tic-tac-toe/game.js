console.log("Welcome to Tic-Tac-Toe! Enjoy!")

// Variables
let cells = document.getElementsByTagName("td")
let gameIsOver = false
let message = document.getElementById("subtitle")
let playerXturn = Math.random() >= 0.5
let score = {
  playerX: 0,
  playerO: 0  
}

// Sound effects
let sonar = new Audio("media/sonar-ping-95840.mp3")
let airhorn = new Audio("media/dj-airhorn-sound-39405.mp3")
let sadTrombone = new Audio("media/wah-wah-sad-trombone-6347.mp3")
sonar.volume = 0.5
airhorn.volume = 0.5
sadTrombone.volume = 0.5

// Event Listeners
for (let i=0; i<cells.length; i++){
  let cell = cells[i]
  cell.onclick = cellClicked
}

document.getElementById("reset").onclick = resetGame


// Functions
function playerSymbol(){
  if(playerXturn){
    return 'X'
  } else {
    return 'O'
  }
}


function cellIsEmpty(cell) {
  return cell.innerHTML === ""
}


function cellClicked (i) {
  let cell = i.target
  
  if (gameIsOver) return
  if (!cellIsEmpty(cell)) return
  
  cell.innerHTML = playerSymbol()
  checkForWin()

  if (gameIsOver) {

    message.innerHTML = `Player ${playerSymbol()} has won!`
    airhorn.play()
    addWin(playerSymbol())
    updateScoreboard()
    showHideReset()

  } else if (boardIsFull()) {

    message.innerHTML = "Stalemate!"
    sadTrombone.play()
    showHideReset()

  } else {

  playerXturn = !playerXturn
  message.innerHTML = `It's Player ${playerSymbol()}'s turn`
  sonar.cloneNode().play()

  }

}


function checkForWin() {

  let symbol = playerSymbol()
 
  // HORIZONTAL LINES //
  if (cells[0].innerHTML == symbol && cells[1].innerHTML == symbol && cells[2].innerHTML == symbol)
      gameIsOver = true

  else if (cells[3].innerHTML == symbol && cells[4].innerHTML == symbol && cells[5].innerHTML == symbol)
      gameIsOver = true

  else if (cells[6].innerHTML == symbol && cells[7].innerHTML == symbol && cells[8].innerHTML == symbol)
      gameIsOver = true

  // VERTICAL LINES //
  else if (cells[0].innerHTML == symbol && cells[3].innerHTML == symbol && cells[6].innerHTML == symbol)
    gameIsOver = true

  else if (cells[1].innerHTML == symbol && cells[4].innerHTML == symbol && cells[7].innerHTML == symbol)
    gameIsOver = true

  else if (cells[2].innerHTML == symbol && cells[5].innerHTML == symbol && cells[8].innerHTML == symbol)
    gameIsOver = true

  // DIAGONAL LINES //
  else if (cells[0].innerHTML == symbol && cells[4].innerHTML == symbol && cells[8].innerHTML == symbol)
    gameIsOver = true

  else if (cells[2].innerHTML == symbol && cells[4].innerHTML == symbol && cells[6].innerHTML == symbol)
    gameIsOver = true

}


function boardIsFull() {

  let cellValues = []

  for (let i=0; i<cells.length; i++){
    value = cells[i].innerHTML
    cellValues.push(value)
  }

  return cellValues.every((val) => val !== "")

}


function resetGame() {

  for (let i=0; i<cells.length; i++){
    let cell = cells[i]
    cell.innerHTML = ""
  }

  gameIsOver = false
  message.innerHTML = "Click on a cell to start again!"

  showHideReset()
  
}


function showHideReset() {
  document.getElementById("reset").classList.toggle("hidden")
}


function addWin(symbol) { 
  let player = "player"+symbol
  score[player]++
}


function updateScoreboard() {
  document.getElementById("playerX").innerHTML = `Player X wins: ${score.playerX}`
  document.getElementById("playerO").innerHTML = `Player O wins: ${score.playerO}`
}

