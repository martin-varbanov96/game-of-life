$(document).ready(function(){
    
    var arraySize = 9; //TEMP, change dynamically
    var arrayElements = getEmptyMatrix([], arraySize);
    
    //toggling between dead and alive
    $(".dead-square").live("click", function(){
        $(this).attr("class", "alive-square");
    });
    $(".alive-square").live("click", function(){
        $(this).attr("class", "dead-square");
    });
    
    //might have to change click() -> live()
    $("#main-menu").click(function(){
        $(".dead-square, .alive-square").each(function(){
            setInMatrix(this);            
        });
        for(var i = 0; i < Math.sqrt(arraySize); i++){
            for(var j = 0; j < Math.sqrt(arraySize); j++){
                if(arrayElements[i][j] == 0){
                    deadTransition(i, j);
                }else if(arrayElements[i][j] == 1){
                    aliveTransition(i, j);
                }                
            }            
        }
        console.log(arrayElements);

    });

    // checks if any alive transition can be made
    function aliveTransition(i, j){
        var count = 0;
        for(var row = i-1; row <= i+1; row++){
            for(var col = j-1; col <= j + 1; col++){
                if(
                    ((row == i ) && (col == j)) ||
                    (row < 0 ) || 
                    (row >= Math.sqrt(arraySize) ||
                    (col < 0 ) || 
                    (col >= Math.sqrt(arraySize))
                   ) 
                  ){
                    continue;
                }
                if(arrayElements[row][col] == 1 ){
                    count++;
                }
            }
        }
        console.log(count);
        if((count != 3) && (count != 2)){
            $("#" + i + "" + j).attr("class", "dead-square");
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
                    (row >= Math.sqrt(arraySize) ||
                    (col < 0 ) || 
                    (col >= Math.sqrt(arraySize))
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
            $("#" + i + "" + j).attr("class", "alive-square");
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
    
    //Returns an empty Matrix nxn
    function getEmptyMatrix(inputMatrix, n) {
        for (var i = 0; i < Math.sqrt(n); i++) {
            inputMatrix[i] = new Array(Math.sqrt(n));
        }
        return inputMatrix;
    }
});