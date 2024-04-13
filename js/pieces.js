let Pieces = [
    {Name:'rook-1',IsWhite: true, Index:11, Image:'rook-white.png' , Moves:[], MoveCount:0 },
    {Name:'knight-1',IsWhite:true, Index:12, Image:'knight-white.png' , Moves:[] },
    {Name:'bishop-1',IsWhite:true, Index:13, Image:'bishop-white.png' , Moves:[] },
    {Name:'queen',IsWhite:true, Index:14, Image:'queen-white.png' , Moves:[] },
    {Name:'king',IsWhite:true, Index:15, Image:'king-white.png' , Moves:[] , MoveCount:0,CastleMoves:[] },
    {Name:'bishop-2',IsWhite:true, Index:16, Image:'bishop-white.png' , Moves:[] },
    {Name:'knight-2',IsWhite:true, Index:17, Image:'knight-white.png' , Moves:[] },
    {Name:'rook-2',IsWhite:true, Index:18, Image:'rook-white.png' , Moves:[], MoveCount:0 },
    {Name:'pawn-1',IsWhite:true, Index:21, Image:'pawn-white.png' , Moves:[] },
    {Name:'pawn-2',IsWhite:true, Index:22, Image:'pawn-white.png' , Moves:[] },
    {Name:'pawn-3',IsWhite:true, Index:23, Image:'pawn-white.png' , Moves:[] },
    {Name:'pawn-4',IsWhite:true, Index:24, Image:'pawn-white.png' , Moves:[] },
    {Name:'pawn-5',IsWhite:true, Index:25, Image:'pawn-white.png' , Moves:[] },
    {Name:'pawn-6',IsWhite:true, Index:26, Image:'pawn-white.png' , Moves:[] },
    {Name:'pawn-7',IsWhite:true, Index:27, Image:'pawn-white.png' , Moves:[] },
    {Name:'pawn-8',IsWhite:true, Index:28, Image:'pawn-white.png' , Moves:[] },

    {Name:'pawn-1',IsWhite: false, Index:71, Image:'pawn-black.png' , Moves:[] },
    {Name:'pawn-2',IsWhite: false, Index:72, Image:'pawn-black.png' , Moves:[] },
    {Name:'pawn-3',IsWhite: false, Index:73, Image:'pawn-black.png' , Moves:[] },
    {Name:'pawn-4',IsWhite: false, Index:74, Image:'pawn-black.png' , Moves:[] },
    {Name:'pawn-5',IsWhite: false, Index:75, Image:'pawn-black.png' , Moves:[] },
    {Name:'pawn-6',IsWhite: false, Index:76, Image:'pawn-black.png' , Moves:[] },
    {Name:'pawn-7',IsWhite: false, Index:77, Image:'pawn-black.png' , Moves:[] },
    {Name:'pawn-8',IsWhite: false, Index:78, Image:'pawn-black.png' , Moves:[] },
    {Name:'rook-1',IsWhite: false, Index:81, Image:'rook-black.png' , Moves:[] , MoveCount:0},
    {Name:'knight-1',IsWhite: false, Index:82, Image:'knight-black.png' , Moves:[]  },
    {Name:'bishop-1',IsWhite: false, Index:83, Image:'bishop-black.png' , Moves:[]  },
    {Name:'queen',IsWhite: false, Index:84, Image:'queen-black.png' , Moves:[]  },
    {Name:'king',IsWhite: false, Index:85, Image:'king-black.png' , Moves:[], MoveCount:0,CastleMoves:[] },
    {Name:'bishop-2',IsWhite: false, Index:86, Image:'bishop-black.png' , Moves:[] },
    {Name:'knight-2',IsWhite: false, Index:87, Image:'knight-black.png' , Moves:[] },
    {Name:'rook-2',IsWhite: false, Index:88, Image:'rook-black.png' , Moves:[], MoveCount:0},
]

let WhiteKing = GetKing('white');
let BlackKing = GetKing('black');

var row = 0;
var column = 0;
function IsValidIndex(index){
    index = Number(index);
    row = GetRowFromIndex(index);
    column = GetColumnFromIndex(index);
    if(row < 1 || row > 8) {
        return false;
    }
    if(column < 1 || column > 8){
        return false;
    }
    return true;
}


function GetRowFromIndex(index){
    return Math.floor(index / 10);
}

function GetColumnFromIndex(index){
    return index % 10;
}


function GetKing(color){
    if(color.toLowerCase() == 'white'){
        return Pieces.find(a=> a.Name == 'king' && a.IsWhite == true);
    }
    else if(color.toLowerCase() == 'black'){
        return Pieces.find(a=> a.Name == 'king' && a.IsWhite == false);
    }
    throw new Error('invalid color');
}



function GetPieceString(piece){
    return `${piece.Name}-${piece.IsWhite ? "white" : "black"}`;
}




function IsWhiteCheckMate(){
    return Pieces.filter(a => a.IsWhite == true).every(a => a.Moves.length < 1);
}

function IsBlackCheckMate(){
    return Pieces.filter(a => a.IsWhite == false).every(a => a.Moves.length < 1);
}

function IsCheckMate(color){
    if(color){
        if(color.toLowerCase() == 'white'){
            console.log('checkng white is checkmate ?');
            return IsWhiteCheckMate();
        }
        else if(color.toLowerCase() == 'black'){
            console.log('checkng black is checkmate ?');
            return IsBlackCheckMate();
        }   
    }
    return false;
}