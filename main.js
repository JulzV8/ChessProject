import {Piece,Board} from "./app.js";
let board = new Board()
board.initializeBoard();

// function addPiece(board,id,type) {
//   board.squares[i]=new Piece(type,id)
// }

// for (let i = 0; i < 17; i++) {
//   if (i>15 && i<48)
//     continue
//   switch (i) {
//     case 0:
//     case 7:
//       addPiece(this,i,"r")
//       break;
//     case 1:
//     case 6:
//       addPiece("this,i,kn")
//       break;
//     case 2:
//     case 5:
//       addPiece(this,i,"b")
//       break;
//     case 3:
//       addPiece(this,i,"q")
//       break;
//     case 4:
//       addPiece(this,i,"k")
//       break;
//     default:
//       addPiece(this,i,"p")
//       break;
//   }
// }

$(()=>{
$("#renderButton").click(()=>{console.log("renderburon")})
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
$("#moveButton").click(()=>{
  let pieza = new Piece("q","black")
  console.log(pieza);
})
})

function renderPieces(board){
let tableSquares = $(".square")
board.squares.forEach((element,i) => {
  if (element.type!="0") {
    $("#"+i).children().replaceWith(`<img class="piece img-fluid position-absolute top-50 start-50 translate-middle" id="${element.type}" src="img/${element.type}${element.color}.png"></img>`)
  }
});
tableSquares.hover((e)=>{
  $("#"+e.currentTarget.id).removeClass("border-dark");
  $("#"+e.currentTarget.id).addClass("border-danger");
},(e)=>{
  $("#"+e.currentTarget.id).removeClass("border-danger");
  $("#"+e.currentTarget.id).addClass("border-dark");
});
}

function createBoard(){
let table = $("#board");
let counter = 0;
for (let index = 1; index < 9; index++) {
  if(index%2){
    for (let i = 1; i < 9; i++) {
      if(i%2)
      table.append(`<div class="border border-2 border-dark position-relative square white" id="${counter}"><div></div></div>`);
      else
      table.append(`<div class="border border-2 border-dark position-relative square black" id="${counter}"><div></div></div>`);
      counter++;
    }
  }
  else{
    for (let i = 1; i < 9; i++) {
      if(i%2)
      table.append(`<div class="border border-2 border-dark position-relative square black" id="${counter}"><div></div></div>`);
      else
      table.append(`<div class="border border-2 border-dark position-relative square white" id="${counter}"><div></div></div>`);
      counter++;
    }
  }
}
}