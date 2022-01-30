// PART 1: MODULARITY
console.log("=====PART 1: MODULARITY=====");
var privateMethod = function() {
    /*
    By encapsulating your properties and methods within a 
    function, the variable and method can no longer be accessed
    from outside because they're scoped to the function.
    */
    let arrayOfStrings1 = ['grapes', 'oranges', 'bananas']; // PROPERTY STORING AN ARRAY OF ITEMS

    // PRIVATE METHOD TO ADD A NEW STRING
    var addToCollection = function(newValue) {
        arrayOfStrings1.push(newValue);
        console.log("Array: "+arrayOfStrings1);
    }

    // PRIVATE METHOD RETURNING NUMBER OF ITEMS IN THE ARRAY
    var lengthOfCollection = function(arrayOfStrings1) {
        let noOfItems = arrayOfStrings1.length;  // PROPERTY STORING THE COUNT OF ITEMS IN THE ARRAY
        console.log("Length of collection: "+noOfItems);
    };

    // PUBLIC PROPERTIES AND METHODS HERE
    return {
        // PUBLIC METHOD TO ADD A NEW ITEM TO THE ARRAY 
        setMessage: function(valueEntered) {
            addToCollection(valueEntered);
        },

        // PUBLIC METHOD TO GET THE NUMBER OF ITEMS IN THE ARRAY
        getMessage: function() {
            lengthOfCollection(arrayOfStrings1);
        }
    }
} ();   // PARANTHESIS IMMEDIATELY INVOKES THE FUNCTION AFTER IT'S DEFINED

privateMethod.getMessage(); 
privateMethod.setMessage("watermelon");
privateMethod.getMessage();

// PART 2: BLOCKING VS NON BLOCKING
console.log("=====PART 2: BLOCKING VS NON BLOCKING=====");

// STATEMENTS BLOCKED BY THE setTimeout FUNCTION
setTimeout(() => {
        console.log("Printing the blocked statement next");
        console.log("World!");  
    },
    1000)   // TIME IN MILLISECONDS

console.log("Printing the Non-blocked statement first");
console.log("Hello,");
  
  
