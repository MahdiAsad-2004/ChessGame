let moves = [];
var nextMoveIndex = 0;
var nextPiece = null;



function PawnMoves(piece){
    moves = [];
    nextMoveIndex = piece.Index;
    nextPiece = null;
    if((piece.IsWhite == true && GetRowFromIndex(piece.Index) == 2) || (piece.IsWhite == false && GetRowFromIndex(piece.Index) == 7)){
        for(var i=1; i<=2; i++){
            nextMoveIndex = piece.IsWhite == true ? nextMoveIndex+10 : nextMoveIndex-10;
            if(IsValidIndex(nextMoveIndex)){
                nextPiece = Pieces.find(p => p.Index == nextMoveIndex);
                if(nextPiece){
                    break;
                }
                else{
                    moves.push(nextMoveIndex);
                }
            }
            else{
                break;
            }
        }
    }
    else{
        nextMoveIndex = piece.IsWhite == true ? nextMoveIndex+10 : nextMoveIndex-10;
        if(IsValidIndex(nextMoveIndex)){
            nextPiece = Pieces.some(p => p.Index == nextMoveIndex);
            if(Pieces.some(p => p.Index == nextMoveIndex) == false){
                moves.push(nextMoveIndex);
            }
        }
    }
    if(piece.IsWhite){
        nextMoveIndex = piece.Index + 10 + 1;
        if(Pieces.filter(p => p.IsWhite != piece.IsWhite).some(p => p.Index == nextMoveIndex)){
            moves.push(nextMoveIndex);
        }
        nextMoveIndex = piece.Index + 10 - 1;
        if(Pieces.filter(p => p.IsWhite != piece.IsWhite).some(p => p.Index == nextMoveIndex)){
            moves.push(nextMoveIndex);
        }
    }
    else{
        nextMoveIndex = piece.Index - 10 + 1;
        if(Pieces.filter(p => p.IsWhite != piece.IsWhite).some(p => p.Index == nextMoveIndex)){
            moves.push(nextMoveIndex);
        }
        nextMoveIndex = piece.Index - 10 - 1;
        if(Pieces.filter(p => p.IsWhite != piece.IsWhite).some(p => p.Index == nextMoveIndex)){
            moves.push(nextMoveIndex);
        }
    }

    return moves;
}



function KnightMoves(piece){
    var x = [];
    moves = [];
    x.push(Number(`${piece.Index - 20 - 1}`));
    x.push(Number(`${piece.Index - 20 + 1}`));
    x.push(Number(`${piece.Index - 10 - 2}`));
    x.push(Number(`${piece.Index - 10 + 2}`));
    x.push(Number(`${piece.Index + 20 - 1}`));
    x.push(Number(`${piece.Index + 20 + 1}`));
    x.push(Number(`${piece.Index + 10 - 2}`));
    x.push(Number(`${piece.Index + 10 + 2}`));
    x.forEach(index => {
        if(IsValidIndex(index)){
            if(Pieces.some(p => p.IsWhite == piece.IsWhite && p.Index == index) == false){
                moves.push(index);
            }
        }
    })
    return moves;
}


function BishopMoves(piece){
    moves = [];
    BishopPaths(piece).forEach(a => {
        moves = moves.concat(a);
    })
    return moves;
}

function BishopPaths(piece){
    var paths = [];
    var path1 = [];
    var path2 = [];
    var path3 = [];
    var path4 = [];

    nextMoveIndex = piece.Index;
    for(var i = 1; i <= 7 ; i++){
        nextMoveIndex = nextMoveIndex + 10 + 1;
        if(IsValidIndex(nextMoveIndex) == false){
            break;
        }
        nextPiece = Pieces.find(p => p.Index == nextMoveIndex);
        if(nextPiece){
            if(nextPiece.IsWhite != piece.IsWhite){
                path1.push(nextMoveIndex)   
            }
            break;
        }
        else{
            path1.push(nextMoveIndex)   
        }
    }

    nextMoveIndex = piece.Index;
    for(var i = 1; i <= 7 ; i++){
        nextMoveIndex = nextMoveIndex + 10 - 1;
        if(IsValidIndex(nextMoveIndex) == false){
            break;
        }
        nextPiece = Pieces.find(p => p.Index == nextMoveIndex);
        if(nextPiece){
            if(nextPiece.IsWhite != piece.IsWhite){
                path2.push(nextMoveIndex)   
            }
            break;
        }
        else{
            path2.push(nextMoveIndex)   
        }
    }

    nextMoveIndex = piece.Index;
    for(var i = 1; i <= 7 ; i++){
        nextMoveIndex = nextMoveIndex - 10 + 1;
        if(IsValidIndex(nextMoveIndex) == false){
            break;
        }
        nextPiece = Pieces.find(p => p.Index == nextMoveIndex);
        if(nextPiece){
            if(nextPiece.IsWhite != piece.IsWhite){
                path3.push(nextMoveIndex)   
            }
            break;
        }
        else{
            path3.push(nextMoveIndex)   
        }
    }

    nextMoveIndex = piece.Index;
    for(var i = 1; i <= 7 ; i++){
        nextMoveIndex = nextMoveIndex - 10 - 1;
        if(IsValidIndex(nextMoveIndex) == false){
            break;
        }
        nextPiece = Pieces.find(p => p.Index == nextMoveIndex);
        if(nextPiece){
            if(nextPiece.IsWhite != piece.IsWhite){
                path4.push(nextMoveIndex)   
            }
            break;
        }
        else{
            path4.push(nextMoveIndex)   
        }
    }
    paths.push(path1);
    paths.push(path2);
    paths.push(path3);
    paths.push(path4);
    return paths;
}



function RookMoves(piece){
    moves = [];
    RookPaths(piece).forEach(a => {
        moves = moves.concat(a);
    })
    return moves;
}

function RookPaths(piece){
    var paths = [];
    var path1 = [];
    var path2 = [];
    var path3 = [];
    var path4 = [];

    nextMoveIndex = piece.Index;
    for(var i = 1; i <= 7 ; i++){
        nextMoveIndex = nextMoveIndex + 10;
        if(IsValidIndex(nextMoveIndex) == false) break;
        nextPiece = Pieces.find(p => p.Index == nextMoveIndex);
        if(nextPiece){
            if(nextPiece.IsWhite != piece.IsWhite){
                path1.push(nextMoveIndex)   
            }
            break;
        }
        else{
            path1.push(nextMoveIndex)   
        }
    }

    nextMoveIndex = piece.Index;
    for(var i = 1; i <= 7 ; i++){
        nextMoveIndex = nextMoveIndex - 10;
        if(IsValidIndex(nextMoveIndex) == false){
            break;
        }
        nextPiece = Pieces.find(p => p.Index == nextMoveIndex);
        if(nextPiece){
            if(nextPiece.IsWhite != piece.IsWhite){
                path2.push(nextMoveIndex)   
            }
            break;
        }
        else{
            path2.push(nextMoveIndex)   
        }
    }

    nextMoveIndex = piece.Index;
    for(var i = 1; i <= 7 ; i++){
        nextMoveIndex = nextMoveIndex + 1;
        if(IsValidIndex(nextMoveIndex) == false){
            break;
        }
        nextPiece = Pieces.find(p => p.Index == nextMoveIndex);
        if(nextPiece){
            if(nextPiece.IsWhite != piece.IsWhite){
                path3.push(nextMoveIndex)   
            }
            break;
        }
        else{
            path3.push(nextMoveIndex)   
        }
    }

    nextMoveIndex = piece.Index;
    for(var i = 1; i <= 7 ; i++){
        nextMoveIndex = nextMoveIndex - 1;
        if(IsValidIndex(nextMoveIndex) == false){
            break;
        }
        nextPiece = Pieces.find(p => p.Index == nextMoveIndex);
        if(nextPiece){
            if(nextPiece.IsWhite != piece.IsWhite){
                path4.push(nextMoveIndex)   
            }
            break;
        }
        else{
            path4.push(nextMoveIndex)   
        }
    }
    paths.push(path1);
    paths.push(path2);
    paths.push(path3);
    paths.push(path4);
    return paths;

}



function QueenPaths(piece){
    var path1 = [...RookPaths(piece)] 
    var path2 = [...BishopPaths(piece)] 
    return path1.concat(path2);
}

function QueenMoves(piece){    
    moves = [];
    QueenPaths(piece).forEach(a => {
        moves = moves.concat(a);
    })
    return moves;
}




function KingMoves(piece){
    moves = [];
    var kingArea = new Set(KingArea(piece));
    var opponiteArea = null;
    if(piece.IsWhite){
        opponiteArea = new Set(BlackAreas());
    }
    else{
        opponiteArea = new Set(WhiteAreas());
    } 
    moves = [];
    kingArea = kingArea.difference(opponiteArea); 
    kingArea.forEach(index => {
        if(Pieces.some(a => a.Index == index && a.IsWhite == piece.IsWhite) == false){
            moves.push(index);
        }
    });
    return moves;
}




function PawnArea(piece){
    moves = [];
    nextMoveIndex = piece.Index;
    if(piece.IsWhite){
        nextMoveIndex = piece.Index + 10 + 1;
        if(IsValidIndex(nextMoveIndex)){
            moves.push(nextMoveIndex);
        }
        nextMoveIndex = piece.Index + 10 - 1;
        if(IsValidIndex(nextMoveIndex)){
            moves.push(nextMoveIndex);
        }
    }
    else{
        nextMoveIndex = piece.Index - 10 + 1;
        if(IsValidIndex(nextMoveIndex)){
            moves.push(nextMoveIndex);
        }
        nextMoveIndex = piece.Index - 10 - 1;
        if(IsValidIndex(nextMoveIndex)){
            moves.push(nextMoveIndex);
        }
    }
    return moves;
}


function KnightArea(piece){
    var x = [];
    moves = [];
    x.push(Number(`${piece.Index - 20 - 1}`));
    x.push(Number(`${piece.Index - 20 + 1}`));
    x.push(Number(`${piece.Index - 10 - 2}`));
    x.push(Number(`${piece.Index - 10 + 2}`));
    x.push(Number(`${piece.Index + 20 - 1}`));
    x.push(Number(`${piece.Index + 20 + 1}`));
    x.push(Number(`${piece.Index + 10 - 2}`));
    x.push(Number(`${piece.Index + 10 + 2}`));
    x.forEach(index => {
        if(IsValidIndex(index)){
            moves.push(index);
        }
    })
    return moves;    
}


function BishopArea(piece){
    moves = [];
    nextMoveIndex = piece.Index;
    for(var i = 1; i <= 7 ; i++){
        nextMoveIndex = nextMoveIndex + 10 + 1;
        if(IsValidIndex(nextMoveIndex) == false){
            break;
        }
        nextPiece = Pieces.find(p => p.Index == nextMoveIndex);
        if(nextPiece){
            moves.push(nextMoveIndex)   
            break;
        }
        else{
            moves.push(nextMoveIndex)   
        }
    }

    nextMoveIndex = piece.Index;
    for(var i = 1; i <= 7 ; i++){
        nextMoveIndex = nextMoveIndex + 10 - 1;
        if(IsValidIndex(nextMoveIndex) == false){
            break;
        }
        nextPiece = Pieces.find(p => p.Index == nextMoveIndex);
        if(nextPiece){
            moves.push(nextMoveIndex)   
            break;
        }
        else{
            moves.push(nextMoveIndex)   
        }
    }

    nextMoveIndex = piece.Index;
    for(var i = 1; i <= 7 ; i++){
        nextMoveIndex = nextMoveIndex - 10 + 1;
        if(IsValidIndex(nextMoveIndex) == false){
            break;
        }
        nextPiece = Pieces.find(p => p.Index == nextMoveIndex);
        if(nextPiece){
            moves.push(nextMoveIndex)   
            break;
        }
        else{
            moves.push(nextMoveIndex)   
        }
    }

    nextMoveIndex = piece.Index;
    for(var i = 1; i <= 7 ; i++){
        nextMoveIndex = nextMoveIndex - 10 - 1;
        if(IsValidIndex(nextMoveIndex) == false){
            break;
        }
        nextPiece = Pieces.find(p => p.Index == nextMoveIndex);
        if(nextPiece){
            moves.push(nextMoveIndex)   
            break;
        }
        else{
            moves.push(nextMoveIndex)   
        }
    }

    return moves;  
}


function RookArea(piece){
    moves = [];
    nextMoveIndex = piece.Index;
    for(var i = 1; i <= 7 ; i++){
        nextMoveIndex = nextMoveIndex + 10;
        if(IsValidIndex(nextMoveIndex) == false){
            break;
        }
        nextPiece = Pieces.find(p => p.Index == nextMoveIndex);
        if(nextPiece){
            moves.push(nextMoveIndex);   
            break;
        }
        else{
            moves.push(nextMoveIndex)   
        }
    }

    nextMoveIndex = piece.Index;
    for(var i = 1; i <= 7 ; i++){
        nextMoveIndex = nextMoveIndex - 10;
        if(IsValidIndex(nextMoveIndex) == false){
            break;
        }
        nextPiece = Pieces.find(p => p.Index == nextMoveIndex);
        if(nextPiece){
            moves.push(nextMoveIndex);
            break;
        }
        else{
            moves.push(nextMoveIndex)   
        }
    }

    nextMoveIndex = piece.Index;
    for(var i = 1; i <= 7 ; i++){
        nextMoveIndex = nextMoveIndex + 1;
        if(IsValidIndex(nextMoveIndex) == false){
            break;
        }
        nextPiece = Pieces.find(p => p.Index == nextMoveIndex);
        if(nextPiece){
            moves.push(nextMoveIndex);
            break;
        }
        else{
            moves.push(nextMoveIndex)   
        }
    }

    nextMoveIndex = piece.Index;
    for(var i = 1; i <= 7 ; i++){
        nextMoveIndex = nextMoveIndex - 1;
        if(IsValidIndex(nextMoveIndex) == false){
            break;
        }
        nextPiece = Pieces.find(p => p.Index == nextMoveIndex);
        if(nextPiece){
            moves.push(nextMoveIndex);
            break;
        }
        else{
            moves.push(nextMoveIndex)   
        }
    }

    return moves;   
}


function QueenArea(piece){
    var x = BishopArea(piece);
    return x.concat(RookArea(piece));
}


function KingArea(piece){
    moves = [];
    var x = [];
    x.push(Number(piece.Index + 10 + 0));
    x.push(Number(piece.Index + 10 + 1));
    x.push(Number(piece.Index + 10 - 1));
    x.push(Number(piece.Index + 1));
    x.push(Number(piece.Index - 1));
    x.push(Number(piece.Index - 10 + 0));
    x.push(Number(piece.Index - 10 + 1));
    x.push(Number(piece.Index - 10 - 1));
    x.forEach(index => {
        if(IsValidIndex(index)){
            moves.push(index);
        }
    })
    return moves;
}




function BlackAreas(){
    moves = [];
    Pieces.filter(a => a.IsWhite == false && a.Index > 0).forEach(p => {
        moves = moves.concat(CalculatePieceArea(p));
    })
    return new Set(moves);
}
function WhiteAreas(){
    moves = [];
    Pieces.filter(a => a.IsWhite == true && a.Index > 0).forEach(p => {
        moves = moves.concat(CalculatePieceArea(p));
    })
    return new Set(moves);
}


function CalculatePieceArea(piece){
    if(piece.Name.includes('pawn')){
        return PawnArea(piece);
    }
    else if(piece.Name.includes('knight')){
        return KnightArea(piece);
    }
    else if(piece.Name.includes('bishop')){
        return BishopArea(piece);
    }
    else if(piece.Name.includes('rook')){
        return RookArea(piece);
    }
    else if(piece.Name.includes('queen')){
        return QueenArea(piece);
    }
    else if(piece.Name.includes('king')){
        return KingArea(piece);
    }
    throw new Error('invalid piece');
}


function CalculateCastleMoves(piece){
    console.log(`${GetPieceString(piece)} castle moves`);
    var x =[];
    var kingAndRooks = [];
    if(piece.IsWhite){
        kingAndRooks = Pieces.filter(a => a.IsWhite == true && (a.Name.includes('king') || a.Name.includes('rook')));
        if(kingAndRooks.every(a => a.MoveCount == 0)){
            //console.log('move count condition is passed');
            if(Pieces.some(a => a.Index >= 12 && a.Index <= 14) == false){
                x.push(13);
            }
            if(Pieces.some(a => a.Index >= 16 && a.Index <= 17) == false){
                x.push(17);
            }
        }
    }
    else{
        kingAndRooks = Pieces.filter(a => a.IsWhite == false && (a.Name.includes('king') || a.Name.includes('rook')));
        if(kingAndRooks.every(a => a.MoveCount == 0)){
            //console.log('move count condition is passed');
            if(Pieces.some(a => a.Index >= 82 && a.Index <= 84) == false){
                x.push(83);
            }
            if(Pieces.some(a => a.Index >= 86 && a.Index <= 87) == false){
                x.push(87);
            }
        }
    }
    if(x.length > 0){
        console.log(`${GetPieceString(piece)} has castle moves: ${x}`);
    }
    return x;
}


function PieceMoves(piece){
    //console.log(`${GetPieceString(piece)} piece moves`);
    if(piece.Name.includes('pawn')){
        return PawnMoves(piece);
    }
    else if(piece.Name.includes('knight')){
        return KnightMoves(piece);
    }
    else if(piece.Name.includes('bishop')){
        return BishopMoves(piece);
    }
    else if(piece.Name.includes('rook')){
        return RookMoves(piece);
    }
    else if(piece.Name.includes('queen')){
        return QueenMoves(piece);
    }
    else if(piece.Name.includes('king')){
        return KingMoves(piece);
    }
}



//console.log(KingArea({Index:15}));

let WhiteAreasSet = [];
let BlackAreasSet = [];


let CheckColor = null;


var king = null;
function IsBlackCheck(whiteAreasSet , kingIndex){
    // console.log('black king: '+ kingIndex);
    // console.log(whiteAreasSet);
    if(whiteAreasSet.has(kingIndex)){
        //console.log('black is check');
        return true;
    }
    return false;
}

function IsWhiteCheck(blackAreasSet , kingIndex){
    // console.log('white king: '+ kingIndex);
    // console.log(blackAreasSet);
    if(blackAreasSet.has(kingIndex)){
        //console.log('white is check');
        return true;
    }
    return false;
}




function IsLimitedPiece(piece){
    if(piece.Name.includes('king')){
        return false;
    }
    var currentIndex = piece.Index;
    var flag = false;
    Pieces.find(a => a.Index == currentIndex).Index = -10;
    if(piece.IsWhite){
        flag = IsWhiteCheck(BlackAreas() , WhiteKing.Index);
    }
    else{
        flag = IsBlackCheck(WhiteAreas(),BlackKing.Index);   
    }
    Pieces.find(a => a.Index == -10).Index = currentIndex;
    if(flag == true){
        //console.log(`${GetPieceString(piece)} is limit.`);
    }
    return flag;
}


function LimitedMoves(piece){
    //console.log(`${GetPieceString(piece)} limited moves`);
    var currentIndex = piece.Index;

    Pieces.find(a => a.Index == currentIndex).Index = -10;
    
    var checkPathsWhenMove = [];
    if(piece.IsWhite === true){
        //console.log(GetBlackCheckerPieces());
        checkPathsWhenMove = GetCheckPaths(GetBlackCheckerPieces())
    }
    else{
       //console.log(GetWhiteCheckerPieces());
        checkPathsWhenMove = GetCheckPaths(GetWhiteCheckerPieces())
    }
    //checkPathsWhenMove = piece.IsWhite ? GetCheckPaths(GetBlackCheckerPieces()) : GetCheckPaths(GetWhiteCheckerPieces());
    
    //console.log(GetCheckerPieces());
    //console.log(checkPathsWhenMove);
    
    Pieces.find(a => a.Index == -10).Index = currentIndex;
    
    var moves = new Set(PieceMoves(piece));
    var targetPath = checkPathsWhenMove.find(a => a.some(b => moves.has(b)));
    //console.log(moves);
    //console.log(targetPath);
    //console.log(moves.intersection(new Set(targetPath)));
    return Array.from(moves.intersection(new Set(targetPath)));   
}


function GetBlackCheckerPieces(){
    var x = [];
    Pieces.filter(a => a.IsWhite == false).forEach(p => {
        if(CalculatePieceArea(p).some(index => index == WhiteKing.Index)){
            x.push(p);
        }
    })
    return x;
}

function GetWhiteCheckerPieces(){
    var x = [];
    Pieces.filter(a => a.IsWhite == true).forEach(p => {
        if(CalculatePieceArea(p).some(index => index == BlackKing.Index)){
            x.push(p);
        }
    })
    return x;
}




let CheckPaths = [];


function CanStopCheck(piece){
    //console.log('can stop check ?');
    if(piece.Name == 'king'){
        return KingMoves(piece).length > 0;
    }
    else{
        var moves = new Set(PieceMoves(piece));
        var targetPath = GetCheckPaths(CheckerPieces).find(a => a.some(b => moves.has(b)));
        return moves.intersection(new Set(targetPath)).size > 0 ;   
    }
    //return Array.from(moves.intersection(new Set(targetPath)));
}


function StopCheckMoves(piece){
    //console.log(`${GetPieceString(piece)} stop check moves`);
    if(piece.Name == 'king'){
        return KingMoves(piece);
    }
    else{
        var moves = new Set(PieceMoves(piece));
        var targetPath = GetCheckPaths(CheckerPieces).find(a => a.some(b => moves.has(b)));
        return Array.from(moves.intersection(new Set(targetPath)));   
    }
}






let CheckerPieces = [];


function GetCheckPaths(checkerPieces){
    var paths = [];
    checkerPieces.forEach(p => {
        paths.push(CalculatePieceCheckPath(p));
    })
    return paths;
}





function PawnCheckPath(piece){
    var king = piece.IsWhite ? GetKing('black') : GetKing('white');
    var x = [];
    x.push(PawnArea(piece).find(index => index == king.Index));
    x.push(piece.Index);
    return x;
}


function KnightCheckPath(piece){
    var x = [];
    x.push(piece.Index);
    return x;
}


function BishopCheckPath(piece){
    var king = piece.IsWhite ? GetKing('black') : GetKing('white');
    var path = BishopPaths(piece).find(a => a.includes(king.Index));
    path.push(piece.Index);
    path.splice(path.indexOf(king.Index),1);
    return path;
}


function RookCheckPath(piece){
    var king = piece.IsWhite ? GetKing('black') : GetKing('white');
    var path = RookPaths(piece).find(a => a.includes(king.Index));
    path.push(piece.Index);
    path.splice(path.indexOf(king.Index),1);
    return path;
}

function QueenCheckPath(piece){
    var king = piece.IsWhite ? GetKing('black') : GetKing('white');
    var path = QueenPaths(piece).find(a => a.includes(king.Index));
    path.push(piece.Index);
    path.splice(path.indexOf(king.Index),1);
    return path;
}

function CalculatePieceCheckPath(piece){
    if(piece.Name.includes('pawn')){
        return PawnCheckPath(piece);
    }
    else if(piece.Name.includes('knight')){
        return KnightCheckPath(piece);
    }
    else if(piece.Name.includes('bishop')){
        return BishopCheckPath(piece);
    }
    else if(piece.Name.includes('rook')){
        return RookPaths(piece);
    }
    else if(piece.Name.includes('queen')){
        return QueenCheckPath(piece);
    }
    throw new Error('invalid piece');
}
