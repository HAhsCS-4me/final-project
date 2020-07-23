//Math Extensions Library
Math.randomDec = function (low, high) {
    //return a random decimal between low (inclusive) and high (exlusive)
    return Math.random() * (high - low) + low;
}

Math.randomInt = function (low, high) {
    //return a random integer between low (inclusive) and high (exlusive)
    return Math.floor(Math.random() * (high - low) + low);
}

Math.roundTo = function(num, numPlaces) {
    //Round num off to the nearest numPlaces
    num = num * 10 ** numPlaces; 
    num = Math.round(num); 
    return num / 10 ** numPlaces; 
}

Math.randomElement = function(anArray) {
    //Randomly select and return an element from anArray
    return anArray[Math.randomInt(0, anArray.length)];  
}