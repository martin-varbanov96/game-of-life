$(document).ready(function(){
    
    var arrayHeight = 4;
    var arrayWidth = 4;
    var arrayElements = getEmptyMatrix([], 200, 200);
    
    //set size button click
    $("#set-size-button").click(function(){
        arrayHeight = $("#set-height-size").attr("value");
        arrayWidth = $("#set-width-size").attr("value");
        $("#elements-container").empty();
        for(var i = 0; i < arrayWidth; i++){
            $("#elements-container").append("<tr>");
            for(var j = 0; j < arrayHeight; j++){
                $("#elements-container").append("<td><div class='dead-square' id=" + i + j + ">");
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
    
    //might have to change click() -> live()
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
    });
    //TODO- step back
//    $("#step-back").click(function(){
//        $(".dead-square, .alive-square").each(function(){
//            setInMatrix(this);
//            for(var i = 0; i < Math.sqrt(arraySize); i++){
//                for(var j = 0; j < Math.sqrt(arraySize); j++){
//                    if(arrayElements[i][j] == 0){
//                        reverseDeadTransition(i, j);
//                    }else if(arrayElements[i][j] == 1){
//                        aliveTransition(i, j);
//                    }                
//                }            
//            }
//        });
//        
//    });
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
        var value = $(elementId).attr("id");
        var j = value%10;            
        var i = Math.floor(value/10);
        if($(elementId).attr("class") == "dead-square"){
            arrayElements[i][j] = 0;
        }else if($(elementId).attr("class") == "alive-square"){
            arrayElements[i][j] = 1;

        }        
    }
    //TODO- reverses the value of the previous dead transition
    function reverseDeadTransition(i, j){
        
    }
    //Returns an empty Matrix nxn
    function getEmptyMatrix(inputMatrix, width, height) {
        for (var i = 0; i < width; i++) {
            inputMatrix[i] = new Array(height);
        }
        return inputMatrix;
    }
});