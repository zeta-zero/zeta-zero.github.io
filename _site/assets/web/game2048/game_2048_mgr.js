// 获取页面中的元素
var numberDisplay = document.querySelector(".score-container");
var BestScore = document.querySelector(".best-container");
var changeNumberButton = document.getElementById("btn-restart");
var GameInfoScreen = document.getElementsByClassName("game-info")[0];
var RetryButton = document.getElementById("btn-retry");
var CurrenceScoreValue = 0;
var BestScoreValue = 0;
var GameState = false;
var Anima = false;
/* 2,4,8,16,32,64,
   128,256,512,1024,2048 */
var TileColors = ["#eee4da", "#eee1c9", "#f3b27a", "#f69664", "#f77c5f", "#f75f3b",
    "#edd073", "#edcc62", "#edc950", "#edc53f", "#edc22e"];

function getCellMap() {
    var CellMap = document.getElementsByClassName("grid-cell");
    ret = [];
    for (var i = 0; i < CellMap.length; i++) {
        ret.push({ x: CellMap[i].offsetLeft, y: CellMap[i].offsetTop });
    }
    return ret;
}
var CellMap = getCellMap();
var EmptyMap = CellMap.slice(0);
var DataMap = [
    [{ val: 0, tile: null }, { val: 0, tile: null }, { val: 0, tile: null }, { val: 0, tile: null }],
    [{ val: 0, tile: null }, { val: 0, tile: null }, { val: 0, tile: null }, { val: 0, tile: null }],
    [{ val: 0, tile: null }, { val: 0, tile: null }, { val: 0, tile: null }, { val: 0, tile: null }],
    [{ val: 0, tile: null }, { val: 0, tile: null }, { val: 0, tile: null }, { val: 0, tile: null }]];

function createTile(pos, val) {
    var ret = null;
    if (pos != null) {
        ret = document.createElement("div");
        var incontent = document.createElement("div");
        incontent.className = "tile-inner";
        incontent.innerText = val || 2;
        ret.className = "tile";
        ret.appendChild(incontent);
        ret.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
        ret.style.backgroundColor = TileColors[Math.log2(val) - 1];
    }
    return ret;
}

var TileMap = document.getElementsByClassName("tile-container")[0];

function addNewTile() {
    var ret = false;
    if (TileMap != null && EmptyMap != null && EmptyMap.length > 0) {
        var num = Math.round(Math.random() * (EmptyMap.length - 1));
        var val = EmptyMap[num];
        EmptyMap.splice(num, 1)
        var num = 0;
        var randomval = Math.random();
        if (randomval < 0.7) {
            num = 2;
        }
        else if (randomval < 0.998) {
            num = 4;
        }
        else {
            num = 8;
        }
        var node = createTile(val, num);
        if (node != null) {
            let index = CellMap.indexOf(val);
            if (DataMap != null && index != -1) {
                let x = Math.floor(index / 4);
                let y = index % 4;
                DataMap[x][y].val = num;
                DataMap[x][y].tile = node;
            }
            TileMap.appendChild(node);
            ret = true;
        }
    }
    return ret;
}

var WaitToDelList = [];
var WaitToChange = [];

function changeTile(existdata, existindex, curdata, curindex) {
    curdata.val = existdata.val;
    curdata.tile = existdata.tile;
    var pos = CellMap[curindex];
    curdata.tile.style.transform = `translate(${pos.x}px, ${pos.y}px)`;

    var index = EmptyMap.indexOf(pos);
    if (index !== -1) {
        pos = CellMap[existindex];
        EmptyMap[index] = pos;
    }

    existdata.val = 0;
    existdata.tile = null;
}

function mergeTile(existdata, existindex, curdata, curindex) {
    curdata.val += existdata.val;
    CurrenceScoreValue += curdata.val;
    numberDisplay.textContent = CurrenceScoreValue;
    if (CurrenceScoreValue > BestScoreValue) {
        BestScoreValue = CurrenceScoreValue;
        BestScore.textContent = BestScoreValue;
    }

    // 
    var pos = CellMap[curindex];
    existdata.tile.style.transform = `translate(${pos.x}px, ${pos.y}px)`;

    EmptyMap.push(CellMap[existindex]);
    WaitToDelList.push(existdata.tile);
    WaitToChange.push(curdata);

    existdata.val = 0;
    existdata.tile = null;

}

function moveTile(direction) {
    var ret = false;
    var letbreak = false;
    if (direction == "up") {
        for (var row = 0; row < 4; row++) {
            for (var col = 0; col < 4; col++) {
                var current_tile = DataMap[row][col];
                letbreak = false;

                if (current_tile.val === 0) {
                    for (var row_buf = row + 1; row_buf < 4; row_buf++) {
                        var exist_tile = DataMap[row_buf][col];

                        if (exist_tile.val !== 0 && exist_tile.tile !== null) {
                            changeTile(exist_tile, row_buf * 4 + col, current_tile, row * 4 + col);
                            ret = true;
                            row--;
                            letbreak = true;
                            break;
                        }
                    }
                }
                else {
                    for (var row_buf = row + 1; row_buf < 4; row_buf++) {
                        var exist_tile = DataMap[row_buf][col];
                        if (exist_tile.val == current_tile.val && exist_tile.tile !== null) {
                            mergeTile(exist_tile, row_buf * 4 + col, current_tile, row * 4 + col);
                            ret = true;
                            row--;
                            letbreak = true;
                            break;
                        }
                        else if(exist_tile.val == 0){
                            continue;
                        }
                        else{
                            break;
                        }
                    }
                }
                if(letbreak){
                    break;
                }
            }
        }
    }
    else if (direction == "down") {
        for (var row = 3; row > -1; row--) {
            for (var col = 0; col < 4; col++) {
                var current_tile = DataMap[row][col];
                letbreak = false;
                if (current_tile.val === 0) {
                    for (var row_buf = row - 1; row_buf > -1; row_buf--) {
                        var exist_tile = DataMap[row_buf][col];
                        if (exist_tile.val !== 0 && exist_tile.tile !== null) {
                            changeTile(exist_tile, row_buf * 4 + col, current_tile, row * 4 + col);
                            ret = true;
                            row++;
                            letbreak = true;
                            break;
                        }
                    }
                }
                else {
                    for (var row_buf = row - 1; row_buf > -1; row_buf--) {
                        var exist_tile = DataMap[row_buf][col];
                        if (exist_tile.val == current_tile.val && exist_tile.tile !== null) {
                            mergeTile(exist_tile, row_buf * 4 + col, current_tile, row * 4 + col);
                            ret = true;
                            row++;
                            letbreak = true;
                            break;
                        }
                        else if(exist_tile.val == 0){
                            continue;
                        }
                        else{
                            break;
                        }
                    }
                }
                if(letbreak){
                    break;
                }
            }
        }
    }
    else if (direction == "left") {
        for (var col = 0; col < 4; col++) {
            for (var row = 0; row < 4; row++) {
                var current_tile = DataMap[row][col];
                letbreak = false;
                if (current_tile.val === 0) {
                    for (var col_buf = col + 1; col_buf < 4; col_buf++) {
                        var exist_tile = DataMap[row][col_buf];
                        if (exist_tile.val !== 0 && exist_tile.tile !== null) {
                            changeTile(exist_tile, row * 4 + col_buf, current_tile, row * 4 + col);
                            ret = true;
                            col--;
                            letbreak = true;
                            break;
                        }
                    }
                }
                else {
                    for (var col_buf = col + 1; col_buf < 4; col_buf++) {
                        var exist_tile = DataMap[row][col_buf];
                        letbreak = false;
                        if (exist_tile.val == current_tile.val && exist_tile.tile !== null) {
                            mergeTile(exist_tile, row * 4 + col_buf, current_tile, row * 4 + col);
                            ret = true;
                            col--;
                            letbreak = true;
                            break;
                        }
                        else if(exist_tile.val == 0){
                            continue;
                        }
                        else {
                            break;
                        }
                    }
                }
                if(letbreak){
                    break;
                }
            }
        }
    }
    else if (direction == "right") {
        for (var col = 3; col > -1; col--) {
            for (var row = 0; row < 4; row++) {
                var current_tile = DataMap[row][col];
                letbreak = false;
                if (current_tile.val === 0) {
                    for (var col_buf = col - 1; col_buf > -1; col_buf--) {
                        var exist_tile = DataMap[row][col_buf];
                        if (exist_tile.val !== 0 && exist_tile.tile !== null) {
                            changeTile(exist_tile, row * 4 + col_buf, current_tile, row * 4 + col);
                            ret = true;
                            col++;
                            letbreak = true;
                            break;
                        }
                    }
                }
                else {
                    for (var col_buf = col - 1; col_buf > -1; col_buf--) {
                        var exist_tile = DataMap[row][col_buf];
                        letbreak = false;
                        if (exist_tile.val == current_tile.val && exist_tile.tile !== null) {
                            mergeTile(exist_tile, row * 4 + col_buf, current_tile, row * 4 + col);
                            ret = true;
                            col++;
                            letbreak = true;
                            break;
                        }
                        else if(exist_tile.val == 0){
                            continue;
                        }
                        else {
                            break;
                        }
                    }
                }
                if(letbreak){
                    break;
                }
            }
        }
    }

    return ret;
}


function resetGame() {
    if (GameInfoScreen != null) {
        GameInfoScreen.style.display = 'none';
    }
    EmptyMap = CellMap.slice(0);
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            DataMap[i][j].val = 0;
            DataMap[i][j].tile = null;
        }
    }
    if (TileMap != null) {
        var len = TileMap.childNodes.length;  // 子元素的个数
        for (var i = len - 1; i > 0; i--) {       // 遍历
            TileMap.removeChild(TileMap.childNodes[i]);  // 从第一个元素开始删除
        }
    }
    CurrenceScoreValue = 0;
    numberDisplay.textContent = 0;
    addNewTile();
    addNewTile();
    GameState = true;
}

if (changeNumberButton != null) {
    // 添加按钮点击事件的处理程序
    changeNumberButton.addEventListener("click", function () {
        resetGame();
    });
}

if (RetryButton != null) {
    // 添加按钮点击事件的处理程序
    RetryButton.addEventListener("click", function () {
        resetGame();
    });
}

window.onload = function () {
    resetGame();
}

/* 按键事件 */
document.onkeydown = function (event) {
    if(GameState == false || Anima == true){
        return;
    }
    var e = event || arguments.callee.caller.arguments[0];
    var movestate = false;
    switch (e.code) {
        /* up */
        case "KeyW":
        case "ArrowUp": {
            movestate = moveTile("up");
        } break;
        /* down */
        case "KeyS":
        case "ArrowDown": {
            movestate = moveTile("down");
        } break;
        /* left */
        case "KeyA":
        case "ArrowLeft": {
            movestate = moveTile("left");
        } break;
        /* right */
        case "KeyD":
        case "ArrowRight": {
            movestate = moveTile("right");
        } break;
        case "KeyN": {
            resetGame();
        } break;
        default: break;
    }
    if (movestate == true) {
        Anima = true;
        // 等待0.2秒后，执行
        setTimeout(function () {
            if (WaitToChange != null) {
                for (var i = 0; i < WaitToChange.length; i++) {
                    var scorevalue = WaitToChange[i].val;
                    var index = Math.log2(WaitToChange[i].val) - 1;
                    if (index < 0) {
                        index = 0;
                    }
                    else if (index > TileColors.length - 1) {
                        index = TileColors.length - 1;
                    }
                    WaitToChange[i].tile.childNodes[0].style.backgroundColor = TileColors[index];
                    WaitToChange[i].tile.childNodes[0].textContent = scorevalue;
                }
            }
            if (WaitToDelList != null && WaitToDelList.length > 0) {
                for (var i = WaitToDelList.length - 1; i > -1; i--) {
                    TileMap.removeChild(WaitToDelList[i]);
                }
                WaitToDelList = [];
            }
            WaitToChange = [];
            addNewTile();
            Anima = false;
        }, 200); // 等待0.2秒
    }
    else{
        var full = true;
        for(var row = 0;row < 4;row++){
            for(var col = 0;col < 4;col++){
                if(DataMap[row][col].val == 0){
                    full = false;
                    break;
                }
            }
            if(full == false){
                break;
            }
        }
        if(full){
            GameState = false;
            if (GameInfoScreen != null) {
                GameInfoScreen.style.display = 'inline';
            }
        }
    }
}