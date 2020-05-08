const goal = [[0,1,2], [3,4,5], [6,7,8]];

class State {
    
    constructor (nodeStart) {
        this.father = 0;
        this.deep = 0;
        this.action = "ação";
        this.h = 0;
        this.availableMoves = [];
        //this.tab = [[8,7,6], [5,4,3], [2,1,0]];
        //this.tab = [[8,7,6], [5,4,3],[2,1,0]];
        this.tab = nodeStart;
        this.row0 = 0;
        this.column0 = 0;
    }

    describe () {
        console.log(this.father);
        console.log(this.deep);
        console.log(this.action);
        console.log(this.h); 
        console.log(this.row0);
        console.log(this.column0);
        console.log(this.availableMoves);
        console.log(this.h);
    }

    printTab () {
        console.log(this.tab[0]);
        console.log(this.tab[1]);
        console.log(this.tab[2]);
        
    }

    search0 (){
        for (var i = 0; i < 3; i++){
            for (var j = 0; j < 3; j++){
                if (this.tab[i][j] == 0){
                    this.row0 = i;
                    this.column0 = j;
                    break;
                }
            }
        }
    }

    possibleMoves() {
        if (this.row0 == 0){this.availableMoves.push("ArrowDown");}
        if (this.row0 == 1){this.availableMoves.push("ArrowDown");this.availableMoves.push("ArrowUp");}
        if (this.row0 == 2){this.availableMoves.push("ArrowUp");}
        if (this.column0 == 0){this.availableMoves.push("ArrowRight");}
        if (this.column0 == 1){this.availableMoves.push("ArrowRight");this.availableMoves.push("ArrowLeft")}
        if (this.column0 == 2){this.availableMoves.push("ArrowLeft")}
    }

    heuristica () {
        let distance = 0;
        for (var i = 0; i < 3; i++){
            for (var j = 0; j < 3; j++){
                let value = this.tab[i][j];
                if (value !== 0){
                    let posX = parseInt(value/3);
                    let posY = value%3;
                    distance += Math.abs(posX - i) + Math.abs(posY - j);
                }
            }
        }
        this.h = distance + this.deep;
    }

    fim(){
        
    }
}

function start() {
    const positions = ["00", "01", "02", "10", "11", "12", "20", "21", "22"];
    let nodeStart =[[0,0,0], [0,0,0], [0,0,0]];
    const blocks = document.querySelectorAll(".block");
    for (var block of blocks) {
        var row = block.id[3];
        var  column = block.id[4];
        nodeStart[row][column] = block.innerHTML;
    }
    console.log(nodeStart);
    node = new State(nodeStart);
    node.heuristica();
    node.search0();
    node.possibleMoves();
    //node.describe()

    var frontier = [node];
    var visiteds = [];

    while (frontier.length > 0 ){
        console.log("VISITADOS :", visiteds.length);
        
        let menor = frontier[0].h;
        var melhor = 0;
        for (var i = 0; i < frontier.length; i++) {
            if (menor >= frontier[i].h){
                menor = frontier[i].h;
                melhor = i;
            }
        }

        //let noAtual = frontier[melhor];
        let noAtual = frontier.splice(melhor,1)[0];
        //console.log(noAtual);
        
        if (noAtual.h >= 29){
            console.log("Não há solução para a configuração inserida.");
            return;
        }
        //console.log(noAtual);
        //noAtual.printTab();
        noAtual.heuristica();
        noAtual.search0();
        visiteds.push(noAtual);
        //noAtual.possibleMoves();
        console.log(noAtual.action);    
        console.log(noAtual.h);
        noAtual.printTab();
        
        
        if (JSON.stringify(noAtual.tab)==JSON.stringify(goal)){
            console.log("FIM");
            break;
        }
        var lista = [];
        for (var movimento of noAtual.availableMoves) {
            //console.log(movimento);
            var atual = noAtual;
            let newMatriz = move(noAtual, movimento);
            newNode = new State();
            newNode.father = atual;
            newNode.tab = newMatriz;
            newNode.deep = atual.deep + 1;
            newNode.action = movimento;
            newNode.search0();
            newNode.heuristica();
            newNode.possibleMoves();
            var insere = true;
            for (var no of visiteds){
                if (JSON.stringify(no.tab)==JSON.stringify(newNode.tab)) {
                    //console.log('igual');                
                    if (JSON.stringify(no.deep)==JSON.stringify(newNode.deep)){
                        insere = false;
                        break;
                    }
                }
            }

            if(insere == true){
                frontier.push(newNode);
            }else {
                console.log("Não inseri");
                
            }
            
            lista.push(newMatriz);
            if (JSON.stringify(newNode.tab)==JSON.stringify(goal)){
                console.log("FIM");
                newNode.printTab();
                return;
                break;
            }       
        }
    }
    console.log("Empty frontier");




    // Moviments 
    function move(state, direction){
        let matriz = state.tab.slice();
        matriz = JSON.stringify(matriz);
        matriz = JSON.parse(matriz);
        let row = state.row0;
        var column = state.column0;
        switch (direction) {
            case "ArrowUp":
                var aux = matriz[row - 1][column];
                matriz[row - 1][column] = 0;
                matriz[row][column] = aux;
                return matriz;
                break;
            case "ArrowDown":
                var aux = matriz[row + 1][column];
                matriz[row + 1][column] = 0;
                matriz[row][column] = aux;          
                return matriz;
                break;
            case "ArrowLeft":
                var aux = matriz[row][column - 1];
                matriz[row][column - 1] = 0;
                matriz[row][column] = aux;
                return matriz;
                break;
            case "ArrowRight":
                var aux = matriz[row][column + 1];
                matriz[row][column + 1] = 0;
                matriz[row][column] = aux;
                return matriz;
                break;
        }
    }
}

//start();