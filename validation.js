exports.validateInt = function(data){
    //if variable is not a number it will return true
    if (typeof data == 'undefined' || data.length < 1){
        return("empty field");
    }
    else if(isNaN(data) == true){
        return("invalid")
    }
    else{
        return;
    }
}

exports.validateStr = function(data){
    if (typeof data == 'undefined' || data.length < 1){
        return("empty field");
    }
    else if(typeof data !== "string"){
        return("invalid");
    }
    else if (data.length > 20){
        return("string too long");
    }
}
