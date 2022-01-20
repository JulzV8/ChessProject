export class Piece {
  constructor(type,id){
  this.type=type;
  if (id<16)
    this.color = "black";
  else
    this.color = "white";
  this.moveCount=0;
  this.id=0;
  }
}

export class Board {
  constructor(){
    let squareArray = new Array(64)
    this.squares = squareArray.fill(new Piece("0")) 
    this.blackPieces = 16;
    this.whitePieces = 16;
    this.turnCount = 0;
    }
    initializeBoard(){
      this.squares[0]= this.squares[7]= new Piece("r","black")
      this.squares[56]= this.squares[63]= new Piece("r","white")
      this.squares[1]= this.squares[6]= new Piece("kn","black")
      this.squares[57]= this.squares[62]= new Piece("kn","white")
      this.squares[2]= this.squares[5]= new Piece("b","black")
      this.squares[58]= this.squares[61]= new Piece("b","white")
      this.squares[3]= new Piece("q","black") 
      this.squares[59]= new Piece("q","white")
      this.squares[4]= new Piece("k","black")
      this.squares[60]= new Piece("k","white")
      for (let i = 0; i < 8; i++) {
        this.squares[8+i] = new Piece("p","black")
        this.squares[48+i] = new Piece("p","white")
      }
    }
  }