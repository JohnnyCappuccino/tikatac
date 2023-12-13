const startGameButton = document.querySelector(".start");
const container = document.querySelector(".container");
const ai = document.querySelectorAll("#ai");
const human = document.querySelectorAll("#human");
const game = document.querySelector(".game");
const warning = document.querySelector("#warning");
const gameStats = document.querySelector(".gameStats");
const score = document.querySelector("#score");
const restart = document.querySelector("#restart");
const exit = document.querySelector("#exit");
const exitAndRestart = document.querySelector("#exitAndRestart");


//grid
let topRow = [];
let middleRow = [];
let botRow = [];

let leftCollum = [];
let middleCollum = [];
let rightCollum = [];

let leftRightDia = [];
let righLeftDia = [];

let grid = [topRow,middleRow,botRow,leftCollum,rightCollum,middleCollum,leftRightDia,righLeftDia];

let player1 = "";
let player2 = "";

let currentMark = "x.jpg";
let xScore = 0;
let oScore = 0;

let moves = 0;

let gameOver = false;
//ai
for(let i = 0; i <ai.length;i++){
  ai[i].addEventListener("click",()=>{
    if(ai[i].parentElement.id == "one"){
      player1 = "ai"
      ai[i].setAttribute("class", "active");
      human[i].setAttribute("class", "unActive");
    }
    else if(ai[i].parentElement.id == "two"){
      player2 = "ai"
      ai[i].setAttribute("class", "active");
      human[i].setAttribute("class", "unActive");
    }
  });

}

//human
for(let i = 0; i <human.length;i++){
  human[i].addEventListener("click",()=>{
    if(human[i].parentElement.id == "one"){
      player1 = "human"
      human[i].setAttribute("class", "active");
      ai[i].setAttribute("class", "unActive");
    }
    else if(human[i].parentElement.id == "two"){
      player2 = "human"
      human[i].setAttribute("class", "active");
      ai[i].setAttribute("class", "unActive");
    }
  });
}

//ui changes
for(let i = 0; i < game.children.length; i++){
  game.children[i].addEventListener("click", ()=>{
    if(gameOver === false){
      if(game.children[i].firstChild.scr === undefined){
        moves++;
        game.children[i].firstChild.style.opacity = 1;
        game.children[i].firstChild.setAttribute("src","img/"+currentMark);
        if(currentMark == "x.jpg"){
          currentMark = "o.png"
          game.children[i].firstChild.scr = "img/x.jpg"
          game.children[i].firstChild.id = "x";
          updateRowsAndCollums();
          checkGame();
        } 
        else{
          currentMark = "x.jpg";
          game.children[i].firstChild.scr = "img/o.png"
          game.children[i].firstChild.id = "o";
          updateRowsAndCollums();
          checkGame();
        }
      }
      else{
        console.log("nemoze");
      }
    }
  });
}

//ai is bad
function getBestMove(){
  console.log("bestMove");
  let bestMove =  Math.floor(Math.random() * game.children.length);

  console.log(bestMove);
  if(game.children[bestMove].firstChild.scr === undefined){
    moves++;
    game.children[bestMove].firstChild.style.opacity = 1;
    game.children[bestMove].firstChild.setAttribute("src","img/"+currentMark);
    if(currentMark == "x.jpg"){
      currentMark = "o.png"
      game.children[bestMove].firstChild.scr = "img/x.jpg"
      game.children[bestMove].firstChild.id = "x";
      updateRowsAndCollums();
      checkGame();
    } 
    else{
      currentMark = "x.jpg";
      game.children[bestMove].firstChild.scr = "img/o.png"
      game.children[bestMove].firstChild.id = "o";
      updateRowsAndCollums();
      checkGame();
    }
  }
  else{
    getBestMove();
  }
}


//startGame
startGameButton.addEventListener("click", () =>{
  if(player1 != "" && player2 != ""){
    console.log(player1 + player2);
    container.style.display = "none";
    startGameButton.style.display = "none";
    warning.style.display = "none";
    game.style.display = "flex";
    gameStats.style.display = "flex";
    score.innerHTML = `${xScore} : ${oScore}`;

    if(player1 === "ai"){
      getBestMove();
    }
  }
  else{
    warning.style.display = "flex";
  }
});


//checking if game is over
function allAreEqual(array) {
  const result = array.every(element => {
    if (element === array[0]) {

      return true;
    }
  });

  return result;
}

function checkGame(){
  console.log(moves);
  for(let i = 0; i <grid.length; i++){
    if(allAreEqual(grid[i]) === true){
      if(grid[i][0] == "x"){
        xScore++;
        exitAndRestart.style.display ="flex";
        gameOver = true;
        score.innerHTML = `${xScore} : ${oScore}`;
        return;
      }
      else if(grid[i][0] == "o"){
        oScore++;
        exitAndRestart.style.display ="flex";
        gameOver = true;
        score.innerHTML = `${xScore} : ${oScore}`;
        return;
      }
    }
    else if(moves === 9){
      exitAndRestart.style.display ="flex";
      gameOver = true;
      score.innerHTML = `${xScore} : ${oScore}`;
      return;
    }
  }
  if(player2 === "ai" && (moves % 2 !== 0)){
    getBestMove();
  }
  else if(player1 === "ai" && (moves % 2 === 0)){
    getBestMove();
  }
}


function updateRowsAndCollums(){
  topRow = [];
  middleRow = [];
 
  leftCollum = [];
  middleCollum = [];
  rightCollum = [];
 
  leftRightDia = [];
  righLeftDia = [];

  grid = [];

   topRow = [game.children[0].firstChild.id,game.children[1].firstChild.id,game.children[2].firstChild.id];
   middleRow = [game.children[3].firstChild.id,game.children[4].firstChild.id,game.children[5].firstChild.id];
   botRow = [game.children[6].firstChild.id,game.children[7].firstChild.id,game.children[8].firstChild.id];
  
   leftCollum = [game.children[0].firstChild.id,game.children[3].firstChild.id,game.children[6].firstChild.id];
   middleCollum = [game.children[1].firstChild.id,game.children[4].firstChild.id,game.children[7].firstChild.id];
   rightCollum = [game.children[2].firstChild.id,game.children[5].firstChild.id,game.children[8].firstChild.id];
  
   leftRightDia = [game.children[0].firstChild.id,game.children[4].firstChild.id,game.children[8].firstChild.id];
   righLeftDia = [game.children[2].firstChild.id,game.children[4].firstChild.id,game.children[6].firstChild.id];

  grid = [topRow,middleRow,botRow,leftCollum,rightCollum,middleCollum,leftRightDia,righLeftDia]
}

function resetGrid(){
  for(let i = 0; i < game.children.length; i++){

    game.children[i].firstChild.setAttribute("src",undefined);
    game.children[i].firstChild.scr = undefined;
    game.children[i].firstChild.id = "none";
    updateRowsAndCollums();
    
    
  }
}

function resetGame(){
  moves = 0;
  exitAndRestart.style.display ="flex";
  resetGrid();
  currentMark = "x.jpg";
  exitAndRestart.style.display ="none";
  gameOver = false;
  if(player2 === "ai" && (moves % 2 !== 0)){
    getBestMove();
  }
  else if(player1 === "ai" && (moves % 2 === 0)){
    getBestMove();
  }
}

function exitGame(){

location.reload();
}

restart.addEventListener("click", ()=>{

  resetGame();
});

exit.addEventListener("click", ()=>{

  exitGame();
});
