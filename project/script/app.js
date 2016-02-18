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
            console.log(arrayElements);

    });
    
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