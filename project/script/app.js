$(document).ready(function(){
    
    var arrayHeight = 4;
    var arrayWidth = 4;
    var arrayElements = [];
    arrayElements = getEmptyMatrix(arrayElements, 30, 30);
    var arrayStackMemo = new Array();
    
    //set size button click
    $("#set-size-button").click(function(){
        arrayHeight = $("#set-height-size").attr("value");
        arrayWidth = $("#set-width-size").attr("value");
        $("#elements-container, #div-intro").empty();
        for(var i = 0; i < arrayWidth; i++){
            $("#elements-container").append("<tr>");
            for(var j = 0; j < arrayHeight; j++){
                $("#elements-container").append("<td><div class='dead-square' data-width=" + i + " data-height=" + j + " id=" + i + j + ">");
            }
        }
    });
    
    //toggling between dead and alive
    $(".dead-square").live("click", function(){
        $(this).attr("class", "alive-square");
    });
    $(".alive-square").live("click", function(){
        $(this).attr("class", "dead-square");
    });
    
    //step into function
    $("#step-into").click(function(){
        $(".dead-square, .alive-square").each(function(){
            setInMatrix(this);            
        });
        for(var i = 0; i < arrayWidth; i++){
            for(var j = 0; j < arrayHeight; j++){
                if(arrayElements[i][j] == 0){
                    deadTransition(i, j);
                }else if(arrayElements[i][j] == 1){
                    aliveTransition(i, j);
                }                
            }            
        }
        arrayStackMemo.push(JSON.parse(JSON.stringify(arrayElements)));  
        console.log(arrayStackMemo);
    });
    
    //go back with one step
    $("#step-back").click(function(){
        if(arrayStackMemo[0]){      
            console.log(arrayStackMemo);
            console.log("up is memo");
            arrayElements = arrayStackMemo.pop();
            console.log(arrayElements);
            console.log("up is elements");

            arrayHeight = $("#set-height-size").attr("value");
            arrayWidth = $("#set-width-size").attr("value");
            for(var i = 0; i < arrayHeight; i++ ){        
                for(var k = 0; k < arrayWidth; k++){
                    if((arrayElements[i][k] == 0) && ($("#" + i + "" + k).attr("class")) == "alive-square"){
                        $("#" + i + "" + k).switchClass("alive-square", "dead-square", 500);
                    }else if((arrayElements[i][k] == 1) && ($("#" + i + "" + k).attr("class")) == "dead-square"){
                        $("#" + i + "" + k).switchClass("dead-square", "alive-square", 500);
                    }
                }
            }
        }
    });
    
    //reset the board
    $("#step-reset").click(function(){
        if(!isDead()){
            resetBoard();
        }
    });
    
    // checks if any alive transition can be made
    function aliveTransition(i, j){
        var count = 0;
        for(var row = i-1; row <= i+1; row++){
            for(var col = j-1; col <= j + 1; col++){
                if(
                    ((row == i ) && (col == j)) ||
                    (row < 0 ) || 
                    (row >= arrayWidth ||
                    (col < 0 ) || 
                    (col >= arrayHeight)
                   ) 
                  ){
                    continue;
                }
                if(arrayElements[row][col] == 1 ){
                    count++;
                }
            }
        }
        if((count != 3) && (count != 2)){
            $("#" + i + "" + j).switchClass("alive-square", "dead-square", 500);
        }
        
    }
    
    //checks if any deadTransition can be made
    function deadTransition(i, j){
        var count = 0;
        for(var row = i-1; row <= i+1; row++){
            for(var col = j-1; col <= j + 1; col++){
                if(
                    ((row == i ) && (col == j)) ||
                    (row < 0 ) || 
                    (row >= arrayWidth ||
                    (col < 0 ) || 
                    (col >= arrayHeight)
                   ) 
                  ){
                    continue;
                }
                if(arrayElements[row][col] == 1 ){
                    count++;
                }
            }
        }
        if(count == 3){
            $("#" + i + "" + j).switchClass("dead-square", "alive-square", 500);
        }
    }
    
    //sets the value of the square in the main matrix
    function setInMatrix(elementId){
        //var value = $(elementId).attr("id");
        var j = $(elementId).attr("data-height");            
        var i = $(elementId).attr("data-width"); 
        if($(elementId).attr("class") == "dead-square"){
            arrayElements[i][j] = 0;
        }else if($(elementId).attr("class") == "alive-square"){
            arrayElements[i][j] = 1;

        }        
    }
    
    //check if board is cleared
    function isDead(){
        var temp;
        for(var i = 0; i < arrayWidth; i++){
            for(var j = 0; j < arrayHeight; j++){
                temp = $("#" + i + "" + j).attr("class");
                if(temp != "dead-square"){
                    return false;
                }
            }            
        }
        return true;
    }
    
    //reset board
    function resetBoard(){
        for(var i = 0; i < arrayWidth; i++){
            for(var j = 0; j < arrayHeight; j++){
             $("#" + i + "" +  j).attr("class", "dead-square");   
            }            
        }
    }
    //Returns an empty Matrix nxn
    function getEmptyMatrix(inputMatrix, width, height) {
        for (var i = 0; i < width; i++) {
            inputMatrix[i] = new Array(height);
        }
        return inputMatrix;
    }
});