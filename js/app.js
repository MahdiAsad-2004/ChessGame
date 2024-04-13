// import Pieces from "./pieces.js";
// import * as pieceMoves from "./Moves.js";

// var btn = document.getElementsByTagName('button')[0];
// var s = document.getElementById('1234');

// btn.onclick = () => {
//     s.setAttribute('onclick','alert(222)');
// }

const PiecesContainer = document.getElementById('pieces-container');


let IsWhiteTurn = true;
var img = null;
let checkColor = 'null';


const OutPiecesContainer = document.querySelector('.out-pieces-container');

let xxx = [];
function ChangeTurn(){
    BlackAreasSet = BlackAreas();
    WhiteAreasSet = WhiteAreas();

    if(IsWhiteCheck(BlackAreasSet , WhiteKing.Index)){
        checkColor = 'white';
    }
    else if(IsBlackCheck(WhiteAreasSet,BlackKing.Index)){
        checkColor = 'black';
    }
    else{
        checkColor = null;
    }    
    console.log('check Color: ' + checkColor);
    Pieces.forEach(p => {
        img = document.getElementById(`${p.Name}-${p.IsWhite ? "white" : "black"}`);
        if(IsWhiteTurn){
            if(p.IsWhite){
                if(checkColor == 'white'){
                    p.Moves = StopCheckMoves(p);
                    if(p.Name.includes('king')){
                        p.CastleMoves = [];
                    }
                }
                else if(IsLimitedPiece(p)){
                    p.Moves = LimitedMoves(p);
                    if(p.Name.includes('king')){
                        p.CastleMoves = [];
                    }
                }
                else{
                    p.Moves = PieceMoves(p);
                    if(p.Name.includes('king')){
                        p.CastleMoves = CalculateCastleMoves(p);
                    }
                }
                img.addEventListener('click' , PieceClick);
            }
            else{
                img.removeEventListener('click',PieceClick);
            }
        }
        else{
            if(p.IsWhite){  
                img.removeEventListener('click',PieceClick);
            }
            else{
                if(checkColor == 'black'){
                    p.Moves = StopCheckMoves(p);
                    if(p.Name.includes('king')){
                        p.CastleMoves = [];
                    }
                }
                else if(IsLimitedPiece(p)){
                    p.Moves = LimitedMoves(p);
                    if(p.Name.includes('king')){
                        p.CastleMoves = [];
                    }
                }
                else{
                    p.Moves = PieceMoves(p);
                    if(p.Name.includes('king')){
                        p.CastleMoves = CalculateCastleMoves(p);
                    }
                }
                img.addEventListener('click' , PieceClick);            
            }
        }
    })
    console.log(Pieces);
    UpdateStorage();
    if(IsCheckMate(checkColor) == true){
        localStorage.clear();
        setTimeout(() => {
            if(IsWhiteTurn){
                document.getElementById('modal-white-win-button').click();
            }
            else{
                document.getElementById('modal-black-win-button').click();
            }
            
        }, 500);      
        //alert(`${(IsWhiteTurn ? 'Black' : 'White')} Wins .....`);
    }
    IsWhiteTurn = !IsWhiteTurn;
    //console.log(`Turn: ${IsWhiteTurn ? "White" : "Black"}`);
}




function UpdateStorage(){
    localStorage.setItem('Pieces' , JSON.stringify(Pieces));
    localStorage.setItem('IsWhiteTurn' , JSON.stringify(IsWhiteTurn));
}

window.onload = () => {
    if(localStorage.getItem('Pieces')){
        Pieces = JSON.parse(localStorage.getItem('Pieces'));
        console.log(Pieces);
    }
    if(localStorage.getItem('IsWhiteTurn')){
        IsWhiteTurn = JSON.parse(localStorage.getItem('IsWhiteTurn'));
        //IsWhiteTurn = !IsWhiteTurn;
        //console.log(IsWhiteTurn);
    }

    var rowElem = null;
    for(var i = 1; i <= 8; i++){
        rowElem = document.querySelector(`[data-row="${i}"]`);
        //console.log(rowElem);
        for(var j =1; j <=8; j++){
            rowElem.children[j-1].setAttribute('id', `index-${i}${j}`);
        }
    }; 

    Pieces.forEach(p => {
        if(p.Index != 0){
            document.getElementById(`index-${p.Index}`).insertAdjacentHTML('afterbegin' , `
                <img style="background-color:inherit;" id="${p.Name}-${p.IsWhite ? "white" : "black"}" name="${p.Name}" data-IsWhite="${p.IsWhite}" 
                src="images/${p.Image}" style="background-color: inherit;"/>`);
        }
        else{
            PiecesContainer.insertAdjacentHTML('afterbegin' , `
                <img id="${p.Name}-${p.IsWhite ? "white" : "black"}" name="${p.Name}" data-IsWhite="${p.IsWhite}" 
                src="images/${p.Image}" style="background-color: inherit;"/>`)
        }        
    });

    ChangeTurn();

};

let SelectedPiece = null;

function PieceClick(e){
    //Array.from(document.getElementsByClassName('active')).forEach(a => a.style.border = '1px black solid');
    document.querySelectorAll('.active').forEach(a => {
        a.classList.remove('active');
        a.removeAttribute('onclick');
    });
    document.querySelectorAll('.piece-selected').forEach(a => {
        a.classList.remove('piece-selected');
    });
    var indexes = null
    if(SelectedPiece == null)
    {
        SelectedPiece = Pieces.find(p => p.Name == e.target.name && e.target.getAttribute('data-IsWhite') == `${p.IsWhite}`);
        indexes = SelectedPiece.Moves;
        e.target.classList.add('piece-selected');
        if(SelectedPiece.Name.includes('king')){
            indexes = indexes.concat(SelectedPiece.CastleMoves)
        }
        ShowEnableSquares(indexes);
    }
    else{
        if(SelectedPiece.Name != e.target.name){
            SelectedPiece = Pieces.find(p => p.Name == e.target.name && e.target.getAttribute('data-IsWhite') == `${p.IsWhite}`);        
            indexes = SelectedPiece.Moves;
            e.target.classList.add('piece-selected');
            if(SelectedPiece.Name.includes('king')){
                indexes = indexes.concat(SelectedPiece.CastleMoves)
            }
            ShowEnableSquares(indexes);
        }
        else{

            SelectedPiece = null;
        }
    }
}



function ShowEnableSquares(indexes){
    Array.from(indexes)
    .forEach(index => {
        document.getElementById(`index-${index}`).classList.add('active');
        document.getElementById(`index-${index}`).setAttribute('onclick' , 'PieceMove(event)');
    });
}

let ExChangePawnIndex = 1;
var targetSquare = null;
var targetSquareIndex = null;
function PieceMove(event){
    targetSquare = event.target;
    if(event.target.tagName == "IMG"){
        targetSquare = event.target.parentElement;
    }
    targetSquareIndex = Number(targetSquare.id.replace('index-',''));
    var currentSquare = document.getElementById(`index-${SelectedPiece.Index}`);
    if(targetSquare.children[0]){
        //console.log(targetSquare.children[0])
        Pieces.find(p => p.Index == targetSquareIndex).Index = 0;
    }
    PiecesContainer.insertAdjacentHTML('beforeend' , targetSquare.innerHTML);
    targetSquare.innerHTML = currentSquare.innerHTML;
    currentSquare.innerHTML = '';
    
    HandlePieceMoveCastle(SelectedPiece);
    UpdateMoveCount(SelectedPiece);
    Pieces.find(a => a.Name == SelectedPiece.Name && a.IsWhite == SelectedPiece.IsWhite).Index = Number(targetSquare.id.replace('index-',''));
    var isSelectNewPiece = false; 
    if(SelectedPiece.Name.includes('pawn')){
        if(SelectedPiece.IsWhite){
            if(targetSquareIndex >= 81 && targetSquareIndex <= 88){
                Pieces.filter(a => a.IsWhite == true && a.Index == 0 && a.Name.includes('pawn') == false).forEach(p => {
                    OutPiecesContainer.insertAdjacentHTML('beforeend' , `
                        <div onclick="OutPieceSuareClick(event)" class="out-piece-square">
                            <img src="/images/${p.Image}" name="${p.Name}" data-IsWhite="${p.IsWhite}" style="background-color: inherit;"/>
                        </div>
                    `);
                })
                OutPiecesContainer.insertAdjacentHTML('afterend' , `<input hidden id="change-pawn-index" value="${targetSquare.id.replace('index-','')}"/>`)
                ExChangePawnIndex = SelectedPiece.Index;
                document.getElementById('modal-button').click();
                isSelectNewPiece = true;
            }
        }
        else{
            if(targetSquareIndex >= 11 && targetSquareIndex <= 18){
                Pieces.filter(a => a.IsWhite == false && a.Index == 0 && a.Name.includes('pawn') == false).forEach(p => {
                    OutPiecesContainer.insertAdjacentHTML('beforeend' , `
                    <div onclick="OutPieceSuareClick(event)" class="out-piece-square">
                    <img src="/images/${p.Image}" name="${p.Name}" data-IsWhite="${p.IsWhite}" style="background-color: inherit;"/>
                    </div>
                    `);
                })
                OutPiecesContainer.insertAdjacentHTML('afterend' , `<input hidden id="change-pawn-index" value="${targetSquare.id.replace('index-','')}"/>`)
                ExChangePawnIndex = SelectedPiece.Index;
                document.getElementById('modal-button').click();
                isSelectNewPiece = true;
            }
        }
    }
    document.querySelectorAll('.active').forEach(a => {
        a.classList.remove('active');
        a.removeAttribute('onclick');
    });
    document.querySelectorAll('.piece-selected').forEach(a => {
        a.classList.remove('piece-selected');
    });
    if(SelectedPiece.Name == 'king'){
        if(SelectedPiece.IsWhite){
            WhiteKing = GetKing('white');
        }
        else{
            BlackKing = GetKing('black');   
        }
    }
    SelectedPiece = null;
    CheckerPieces = [];
    var king = Pieces.find(a => a.Name == 'king' && a.IsWhite == IsWhiteTurn);
    //console.log(king);
    Pieces.filter(a => a.IsWhite != IsWhiteTurn).forEach(p => {
        if(CalculatePieceArea(p).some(index => index == king.Index)){
            CheckerPieces.push(p);
        }
    })
    //CheckerPieces = GetCheckerPieces();
    //console.log(CheckerPieces);
    if(isSelectNewPiece == false){
        ChangeTurn();
    }
    //alert(SelectedPiece.Name);
}


function UpdateMoveCount(piece){
    if(piece.Name.includes('king') || piece.Name.includes('rook'))
    Pieces.find(a => a.Index == piece.Index).MoveCount++;
}

function HandlePieceMoveCastle(piece){
    if(piece.Name.includes('king')){
        if(piece.CastleMoves.includes(targetSquareIndex)){
            var currentRookSquare=null;
            var targetRookSquare=null;
            var rookCurrentIndex=1;
            var rookTargetIndex=1;
            if(targetSquareIndex == 13){
                currentRookSquare = document.getElementById('index-11');
                targetRookSquare = document.getElementById('index-14');
                rookCurrentIndex = 11;
                rookTargetIndex = 14;
            }
            else if(targetSquareIndex == 17){
                currentRookSquare = document.getElementById('index-18');
                targetRookSquare = document.getElementById('index-16');
                rookCurrentIndex = 18;
                rookTargetIndex = 16;
            }
            else if(targetSquareIndex == 83){
                currentRookSquare = document.getElementById('index-81');
                targetRookSquare = document.getElementById('index-84');
                rookCurrentIndex = 81;
                rookTargetIndex = 84;
            }
            else if(targetSquareIndex == 87){
                currentRookSquare = document.getElementById('index-88');
                targetRookSquare = document.getElementById('index-86');
                rookCurrentIndex = 88;
                rookTargetIndex = 86;
            }
            targetRookSquare.innerHTML = currentRookSquare.innerHTML;
            currentRookSquare.innerHTML = '';
            Pieces.find(a => a.Index == rookCurrentIndex).Index = rookTargetIndex;
        }
    }
}


let IsBlackArea = false;
let IsWhiteArea = false;

function ShowBlackArea(){
    if(IsWhiteArea == true){
        WhiteAreas().forEach(index => {
            document.getElementById(`index-${index}`).classList.remove('white-area');
        })
    }
    if(IsBlackArea == false){
        BlackAreas().forEach(index => {
            document.getElementById(`index-${index}`).classList.add('black-area');
        })
    }
    else{
        BlackAreas().forEach(index => {
            document.getElementById(`index-${index}`).classList.remove('black-area');
        })
    }
    IsBlackArea = !IsBlackArea;
    IsWhiteArea = false;
}

function ShowWhiteArea(){
    if(IsBlackArea == true){
        BlackAreas().forEach(index => {
            document.getElementById(`index-${index}`).classList.remove('black-area');
        })
    }
    if(IsWhiteArea == false){
        WhiteAreas().forEach(index => {
            document.getElementById(`index-${index}`).classList.add('white-area');
        })
    }
    else{
        WhiteAreas().forEach(index => {
            document.getElementById(`index-${index}`).classList.remove('white-area');
        })
    }
    IsWhiteArea = !IsWhiteArea;
    IsBlackArea = false;
}


const SubmitSelectOutPiece = document.getElementById('submit-select-outPiece');

let outPieceSquareSelected = null;
let outPieceSelected = null;
function OutPieceSuareClick(e){
    var targetSquare = e.target;
    if(e.target.tagName == 'IMG'){
        var targetSquare = e.target.parentElement;
    }
    if(targetSquare.classList.contains('out-piece-square-selected')){
        targetSquare.classList.remove('out-piece-square-selected');
        outPieceSquareSelected = null;
        SubmitSelectOutPiece.disabled = true;
    }
    else{
        document.querySelectorAll('.out-piece-square').forEach(a => a.classList.remove('out-piece-square-selected'));
        targetSquare.classList.add('out-piece-square-selected');
        outPieceSquareSelected = targetSquare;
        SubmitSelectOutPiece.disabled = false;
    } 
}

document.getElementById('close-modal-button').onclick = () => {
    console.log('close modal');
    ChangeTurn();
}

SubmitSelectOutPiece.onclick = () => {
    //console.log(document.querySelector('.out-piece-square-selected'));
    console.log(outPieceSquareSelected);
    //if(outPieceSquareSelected)
    var outSelectedPieceImg = outPieceSquareSelected.children[0];
    var outSelectedPieceIsWhite = outSelectedPieceImg.getAttribute('data-IsWhite') == 'true' ? true : false;
    outPieceSelected = Pieces.find(a => a.Name == outSelectedPieceImg.getAttribute('Name') && a.IsWhite ==outSelectedPieceIsWhite);
    
    console.log(outPieceSelected);

    var pawnIndex = Number(document.getElementById('change-pawn-index').value);
    var targetSqaure = document.getElementById(`index-${pawnIndex}`);
    console.log(pawnIndex);
    console.log(targetSqaure);
    PiecesContainer.insertAdjacentHTML('beforeend' , targetSqaure.innerHTML);
    targetSquare.innerHTML = '';
    var pieceImg = document.getElementById(`${outPieceSelected.Name}-${outPieceSelected.IsWhite ? "white" : "black"}`);
    console.log(pieceImg);
    document.getElementById(`${outPieceSelected.Name}-${outPieceSelected.IsWhite ? "white" : "black"}`).remove();
    targetSquare.insertAdjacentElement('beforeend' , pieceImg);
    
    Pieces.find(a => a.Index == pawnIndex).Index = 0;
    Pieces.find(a => a.Name == outSelectedPieceImg.getAttribute('Name') && a.IsWhite == outSelectedPieceIsWhite).Index = pawnIndex;
    
    document.getElementById('close-modal-button').click(); 
}





//alert(`85 => ${GetRowFromIndex(85)} , ${GetColumnFromIndex(85)}`)