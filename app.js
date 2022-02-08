export class Piece {
  constructor(type,id){
  this.type=type;
  this.color = "white";
  if (id<16)
    this.color = "black";
  this.moveCount=0;
  this.id=id;
  }

}

export class Board {
  constructor(){
    let squareArray = new Array(64)
    this.squares = squareArray.fill(new Piece("empty",-1)) 
    this.blackPieces = 16;
    this.whitePieces = 16;
    this.turnCount = 0;
    }
  initializeBoard(){
    for (let i = 0; i<65; i++) {
      if (i>15 && i<48)
        continue
      switch (i) {
        case 0: case 7: case 56: case 63:
          addPiece(this,i,"r")
          break;
        case 1: case 6: case 57: case 62:
          addPiece(this,i,"kn")
          break; 
        case 2: case 5: case 58: case 61:
          addPiece(this,i,"b")
          break;
        case 3: case 59:
          addPiece(this,i,"q")
          break;
        case 4: case 60:
          addPiece(this,i,"k")
          break;
        default:
          addPiece(this,i,"p")
          break;
      }
    }
  }
  checkPossibleMoves(currentPosition){
    let currentPositionInt = parseInt(currentPosition);
    let possibleMoves = [-1];
    let piece = this.squares[currentPosition];
    switch (piece.type) {
      case "p":
        possibleMoves = this.checkPawnDestination(currentPositionInt,piece);
      break;
    }
    return possibleMoves
  }
  checkPawnDestination(currentPosition, piece){
    let positionsArray;
    if (piece.color == "black") {positionsArray=[currentPosition+8,currentPosition+8+1,currentPosition+8-1]
      if (piece.moveCount == 0) {positionsArray.push(currentPosition+16)}}
    else{positionsArray=[currentPosition-8,currentPosition-8+1,currentPosition-8-1]
      if (piece.moveCount == 0) {positionsArray.push(currentPosition-16)}};
    for (let i = positionsArray.length -1 ; i >-1; i--) {
      switch (i) {
        case 3:
          if (this.squareIsEmpty(positionsArray[0]) && this.squareIsEmpty(positionsArray[i])) 
            continue
          break;
        case 0:
          if (this.squareIsEmpty(positionsArray[i]) && !this.squareHasOpponentPiece(positionsArray[i],piece.color))
            continue
          break;
        default:
          if (this.squareHasOpponentPiece(positionsArray[i],piece.color))
            continue
          break;
      }
      if (positionsArray.length==1) {
        positionsArray=[-1]
      }
      positionsArray.splice(i,1);
    }
    return positionsArray
  }
  squareIsEmpty(position){
    if (this.squares[position].type == "empty") {return true}
    else{return false}
  }
  squareHasOpponentPiece(position,color){
    if (this.squares[position].type != "empty" && this.squares[position].color != color) {return true}
    else{return false}
  }
}
function addPiece(board,id,type) {
  board.squares[id]=new Piece(type,id)
}

