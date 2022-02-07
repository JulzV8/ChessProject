import {Piece,Board} from "./app.js";

let board = new Board()
board.initializeBoard();

let gameManager = {};
let gameManagerProxy = new Proxy (gameManager,{
  set: function (target,key,value) {
    if (key == "selectedSquare" && !(target[key] === value)) {
      let previousSquareObj = $("#"+target[key]);
      previousSquareObj.removeClass("border-warning");
      previousSquareObj.addClass("border-danger");
      previousSquareObj.addClass("border-dark");
      previousSquareObj.on({
        mouseenter: function () {
          previousSquareObj.removeClass("border-dark");
        },
        mouseleave: function () {
          previousSquareObj.addClass("border-dark");
        }
      });
      let currentSquareObj=$("#"+value);
      currentSquareObj.removeClass("border-danger");
      currentSquareObj.addClass("border-warning");
      currentSquareObj.off("mouseenter mouseleave");
      checkMoves(currentSquareObj.attr("id"),currentSquareObj.children().attr("id"))
    }
    target[key]=value;
    return true
  }
})

$(()=>{
  $("#renderButton").click(()=>{console.log(gameManagerProxy.selectedSquare)})
  console.log(board);
  $("#startButton").fadeIn();
  $("#startButton").click(()=>{
    console.log("started")
    $("#startButton").fadeOut(()=>{
      $(".body").append(`<div class="border border-dark border-2 mx-auto m-2" style="display: none;" id="board"></div>`);
      createBoard();
      $("#board").fadeIn(renderPieces(board));
      $("#buttonContainer").remove();
    })
  })
})

function renderPieces(board){
  let tableSquares = $(".square")
  board.squares.forEach((element,i) => {
    if (element.type!="empty") {
      $("#"+i).children().replaceWith(`<img class="piece img-fluid position-absolute top-50 start-50 translate-middle" id="${element.type}" src="img/${element.type}${element.color}.png"></img>`)
      $("#"+i).click(()=>{
        gameManagerProxy.selectedSquare = i;
      })
      $("#"+i).on({
        mouseenter: function () {
          $("#"+i).removeClass("border-dark");
        },
        mouseleave: function () {
          $("#"+i).addClass("border-dark");
        }
      });
    }
  });
}

function createBoard(){
  let table = $("#board");
  let counter = 0;
  for (let index = 1; index < 9; index++) {
    if(index%2){
      for (let i = 1; i < 9; i++) {
        if(i%2)
        table.append(`<div class="border border-2 border-danger border-dark position-relative square white" id="${counter}"><div></div></div>`);
        else
        table.append(`<div class="border border-2 border-danger border-dark position-relative square black" id="${counter}"><div></div></div>`);
        counter++;
      }
    }
    else{
      for (let i = 1; i < 9; i++) {
        if(i%2)
        table.append(`<div class="border border-2 border-danger border-dark position-relative square black" id="${counter}"><div></div></div>`);
        else
        table.append(`<div class="border border-2 border-danger border-dark position-relative square white" id="${counter}"><div></div></div>`);
        counter++;
      }
    }
  }
}

function checkMoves(currentPosition,pieceType) {
  
  console.log("current position "+currentPosition);
  console.log("pieceType "+pieceType);
  let possibleMoves = []
  let piece = board.squares[currentPosition];
  switch (piece.type) {
    case "p":
      if (piece.color == "black") {
        possibleMoves.push(parseInt(currentPosition)+8)
        if (piece.moveCount == 0) {possibleMoves.push(parseInt(currentPosition)+16)}
        console.log(possibleMoves);
        possibleMoves.forEach(element => {
          $("#"+element).addClass("selected");
          $("#"+element).click(()=>{
            // tryMove(element,currentPosition)
          })
        });
      }
      break;
  }
}