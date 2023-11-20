import { ref } from 'vue'

/* 2,4,8,16,32,64,
   128,256,512,1024,2048 */
var TileColors = ["#eee4da", "#eee1c9", "#f3b27a", "#f69664", "#f77c5f", "#f75f3b",
    "#edd073", "#edcc62", "#edc950", "#edc53f", "#edc22e", "#00f5d4"];

function getCellMap(_ins) {
    var CellMap = _ins.GCells.value;
    var ret = [];
    if(CellMap == null){
        return ret;
    }
    for (var i = 0; i < _ins.CellMap.length; i++) {
        ret.push({ x: CellMap[i].offsetLeft, y: CellMap[i].offsetTop });
    }
    return ret;
}

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

function addNewTile(_ins) {
    var ret = false;
    if (_ins.TileMap != null && _ins.EmptyMap != null && _ins.EmptyMap.length > 0) {
        var num = Math.round(Math.random() * (_ins.EmptyMap.length - 1));
        var val = _ins.EmptyMap[num];
        _ins.EmptyMap.splice(num, 1)
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
            let index = _ins.CellMap.indexOf(val);
            if (_ins.DataMap != null && index != -1) {
                let x = Math.floor(index / 4);
                let y = index % 4;
                _ins.DataMap[x][y].val = num;
                _ins.DataMap[x][y].tile = node;
            }
            _ins.TileMap.appendChild(node);
            ret = true;
        }
    }
    return ret;
}

function changeTile(_ins,existdata, existindex, curdata, curindex) {
    curdata.val = existdata.val;
    curdata.tile = existdata.tile;
    var pos = _ins.CellMap[curindex];
    curdata.tile.style.transform = `translate(${pos.x}px, ${pos.y}px)`;

    var index = _ins.EmptyMap.indexOf(pos);
    if (index !== -1) {
        pos = CellMap[existindex];
        _ins.EmptyMap[index] = pos;
    }

    existdata.val = 0;
    existdata.tile = null;
}

function mergeTile(_ins,existdata, existindex, curdata, curindex) {
    curdata.val += existdata.val;
    _ins.CurScoreVal += curdata.val;
    if (_ins.CurScoreVal > _ins.BestScoreVal) {
        _ins.BestScoreVal = _ins.CurScoreVal;
    }

    // 
    var pos = _ins.CellMap[curindex];
    existdata.tile.style.transform = `translate(${pos.x}px, ${pos.y}px)`;

    _ins.EmptyMap.push(CellMap[existindex]);
    _ins.WaitToDelList.push(existdata.tile);
    _ins.WaitToChange.push(curdata);

    existdata.val = 0;
    existdata.tile = null;

}

function moveTile(_ins,direction) {
    var ret = false;
    var letbreak = false;
    if (direction == "up") {
        for (var row = 0; row < 4; row++) {
            for (var col = 0; col < 4; col++) {
                var current_tile = _ins.DataMap[row][col];
                letbreak = false;
                if (current_tile.val === 0) {
                    for (var row_buf = row + 1; row_buf < 4; row_buf++) {
                        var exist_tile = _ins.DataMap[row_buf][col];
                        if (exist_tile.val !== 0 && exist_tile.tile !== null) {
                            changeTile(_ins,exist_tile, row_buf * 4 + col, current_tile, row * 4 + col);
                            ret = true;
                            row--;
                            letbreak = true;
                            break;
                        }
                    }
                }
                else {
                    for (var row_buf = row + 1; row_buf < 4; row_buf++) {
                        var exist_tile = _ins.DataMap[row_buf][col];
                        if (exist_tile.val == current_tile.val && exist_tile.tile !== null) {
                            mergeTile(_insexist_tile, row_buf * 4 + col, current_tile, row * 4 + col);
                            ret = true;
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
                var current_tile = _ins.DataMap[row][col];
                letbreak = false;
                if (current_tile.val === 0) {
                    for (var row_buf = row - 1; row_buf > -1; row_buf--) {
                        var exist_tile = _ins.DataMap[row_buf][col];
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
                        var exist_tile = _ins.DataMap[row_buf][col];
                        if (exist_tile.val == current_tile.val && exist_tile.tile !== null) {
                            mergeTile(_insexist_tile, row_buf * 4 + col, current_tile, row * 4 + col);
                            ret = true;
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
                var current_tile = _ins.DataMap[row][col];
                letbreak = false;
                if (current_tile.val === 0) {
                    for (var col_buf = col + 1; col_buf < 4; col_buf++) {
                        var exist_tile = _ins.DataMap[row][col_buf];
                        if (exist_tile.val !== 0 && exist_tile.tile !== null) {
                            _ins.DataMap(_insexist_tile, row * 4 + col_buf, current_tile, row * 4 + col);
                            ret = true;
                            col--;
                            letbreak = true;
                            break;
                        }
                    }
                }
                else {
                    for (var col_buf = col + 1; col_buf < 4; col_buf++) {
                        var exist_tile = _ins.DataMap[row][col_buf];
                        letbreak = false;
                        if (exist_tile.val == current_tile.val && exist_tile.tile !== null) {
                            mergeTile(_insexist_tile, row * 4 + col_buf, current_tile, row * 4 + col);
                            ret = true;
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
                var current_tile = _ins.DataMap[row][col];
                letbreak = false;
                if (current_tile.val === 0) {
                    for (var col_buf = col - 1; col_buf > -1; col_buf--) {
                        var exist_tile = _ins.DataMap[row][col_buf];
                        if (exist_tile.val !== 0 && exist_tile.tile !== null) {
                            _ins.DataMap(_insexist_tile, row * 4 + col_buf, current_tile, row * 4 + col);
                            ret = true;
                            col++;
                            letbreak = true;
                            break;
                        }
                    }
                }
                else {
                    for (var col_buf = col - 1; col_buf > -1; col_buf--) {
                        var exist_tile = _ins.DataMap[row][col_buf];
                        letbreak = false;
                        if (exist_tile.val == current_tile.val && exist_tile.tile !== null) {
                            mergeTile(_insexist_tile, row * 4 + col_buf, current_tile, row * 4 + col);
                            ret = true;
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

function resetGame(_ins) {
    if (_ins.GameInfo != null && _ins.GameInfo.value != null) {
        _ins.GameInfo.value.style.display = 'none';
    }
    _ins.EmptyMap = _ins.CellMap.slice(0);
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            _ins.DataMap[i][j].val = 0;
            _ins.DataMap[i][j].tile = null;
        }
    }
    if (_ins.TileMap != null) {
        console.log(_ins.TileMap);
        var len = _ins.TileMap.childNodes.length;  // 子元素的个数
        for (var i = len - 1; i > 0; i--) {       // 遍历
            _ins.TileMap.removeChild(_ins.TileMap.childNodes[i]);  // 从第一个元素开始删除
        }
    }
    _ins.CurScoreVal = 0;
    addNewTile(_ins);
    addNewTile(_ins);
    _ins.GameState = true;
}

function DirectionCtrl(_ins,_event){
    if(_ins.GameState == false || _ins.Anima == true){
        return;
    }
    var e = _event || arguments.callee.caller.arguments[0];
    var movestate = false;
    switch (e.code) {
        /* up */
        case "KeyW":
        case "ArrowUp": {
            movestate = moveTile(_ins,"up");
        } break;
        /* down */
        case "KeyS":
        case "ArrowDown": {
            movestate = moveTile(_ins,"down");
        } break;
        /* left */
        case "KeyA":
        case "ArrowLeft": {
            movestate = moveTile(_ins,"left");
        } break;
        /* right */
        case "KeyD":
        case "ArrowRight": {
            movestate = moveTile(_ins,"right");
        } break;
        case "KeyN": {
            resetGame(_ins);
        } break;
        default: break;
    }
    if (movestate == true) {
        Anima = true;
        // 等待0.2秒后，执行
        setTimeout(function () {
            if (_ins.WaitToChange != null) {
                for (var i = 0; i < _ins.WaitToChange.length; i++) {
                    var scorevalue = _ins.WaitToChange[i].val;
                    var index = Math.log2(_ins.WaitToChange[i].val) - 1;
                    if (index < 0) {
                        index = 0;
                    }
                    else if (index > TileColors.length - 1) {
                        index = TileColors.length - 1;
                    }
                    _ins.WaitToChange[i].tile.childNodes[0].style.backgroundColor = TileColors[index];
                    _ins.WaitToChange[i].tile.childNodes[0].textContent = scorevalue;
                    if (scorevalue > 999) {
                        _ins.WaitToChange[i].tile.childNodes[0].style.fontSize = '32px';
                    }
                }
            }
            if (_ins.WaitToDelList != null && _ins.WaitToDelList.length > 0) {
                for (var i = _ins.WaitToDelList.length - 1; i > -1; i--) {
                    _ins.TileMap.removeChild(_ins.WaitToDelList[i]);
                }
                _ins.WaitToDelList = [];
            }
            _ins.WaitToChange = [];
            addNewTile(_ins);
            Anima = false;
        }, 200); // 等待0.2秒
    }
    else{
        var full = true;
        for(var row = 0;row < 4;row++){
            for(var col = 0;col < 4;col++){
                if(_ins.DataMap[row][col].val == 0){
                    full = false;
                    break;
                }
            }
            if(full == false){
                break;
            }
        }
        if(full){
            _ins.GameState = false;
            if (_ins.GameInfo.value != null) {
                _ins.GameInfo.value.style.display = 'inline';
            }
        }
    }
}

export default {
    name: 'GameCtrl',
    data() {
        return {
            GameState : false,
            Anima : false,
            CurScoreVal: 0,
            BestScoreVal: 0,
            GCells: ref([]),
            TileContainer:ref([]),
            GameInfo:ref(null),
            CellMap:[],
            EmptyMap:[],
            TileMap:[],
            WaitToDelList : [],
            WaitToChange : [],
            DataMap : [
                [{ val: 0, tile: null }, { val: 0, tile: null }, { val: 0, tile: null }, { val: 0, tile: null }],
                [{ val: 0, tile: null }, { val: 0, tile: null }, { val: 0, tile: null }, { val: 0, tile: null }],
                [{ val: 0, tile: null }, { val: 0, tile: null }, { val: 0, tile: null }, { val: 0, tile: null }],
                [{ val: 0, tile: null }, { val: 0, tile: null }, { val: 0, tile: null }, { val: 0, tile: null }]],
            message: 'Hello from Mixin Module!',
        };
    },
    methods: {
        restart() {
            resetGame(this);
        },
        retry(){
            resetGame(this);
        },
        keydownevent(_event){
            DirectionCtrl(this,_event);
        },
    },
    created() {
      // 在组件创建时添加全局键盘按键监听器
      window.addEventListener('keydown', this.keydownevent);
    },
    destroyed() {
      // 在组件销毁时移除全局键盘按键监听器，以防止内存泄漏
      window.removeEventListener('keydown', this.keydownevent);
    },
    mounted(){
        this.$nextTick(()=>{
            this.TileMap = this.TileContainer.val;
            this.CellMap = getCellMap(this);
            this.EmptyMap = this.CellMap.slice(0);
    
            resetGame(this);
        });
    },
};