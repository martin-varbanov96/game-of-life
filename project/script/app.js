$(document).ready(function(){
    
    var arrayHeight = 4;
    var arrayWidth = 4;
    var arrayElements = [];
    arrayElements = getEmptyMatrix(arrayElements, 30, 30);
    var arrayStackMemo = new Array();
    var loopInterval;
    
    //toggling between dead and alive
    $(".dead-square").live("click", function(){
        $(this).attr("class", "alive-square");
    });
    $(".alive-square").live("click", function(){
        $(this).attr("class", "dead-square");
    });
    
    //loop step into
    $("#step-loop").live("click",function(){
        $(this).attr("id", "step-canceled").html("Stop loop");
        loopInterval = setInterval(function(){
            if(isDead()){
                $("#step-canceled").attr("id", "step-loop").html("Start Loop");        
                clearInterval(loopInterval);                
            }
            stepIntoTrasition();
            console.log("looping"); //TEMP CLEAN LATER
        }, 500);
    });
    
    $("#step-canceled").live("click", function(){
        $(this).attr("id", "step-loop").html("Start Loop");
        clearInterval(loopInterval);
    });
    
    //step into function
    $("#step-into").click(function(){
        stepIntoTrasition();
    });
    
    //go back with one step
    $("#step-back").click(function(){
        if(arrayStackMemo[0]){      
            arrayElements = arrayStackMemo.pop();
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
    
    //reset the board
    $("#step-reset").click(function(){
        if(!isDead()){
            resetBoard();
        }
    });
    
    //
    function stepIntoTrasition(){        
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
    }
    
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