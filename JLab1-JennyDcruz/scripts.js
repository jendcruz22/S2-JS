// OBJECT LITERAL SYNTAX
var logger = {
    message: "Hey there, this is an example of the object literal syntax | A public message", // A PROPERTY
    logMessage: function() {  // METHOD
        console.log(logger.message);
    },
    logError: function() {
        console.error("This is an error");
    }
};
logger.logMessage();

// CHANGING PROPERTY VALUE
logger.message = "Hi";  
logger.logMessage();

// MODULE DESIGN PATTERN
var loggerNS = function() {
    // PRIVATE PROPERTIES AND METHODS
    /*
    By encapsulating your properties and methods within a 
    function, the variable and method can no longer be accessed
    from outside because they're scoped to the function.
    */
    var message = "This is my private message";
    var getMyPrivateMessage = function() {
        console.log(message);
    };
    var setMyPrivateMessage = function(newPrivateMessage) {
        message = newPrivateMessage;
    }

    // PUBLIC PROPERTIES AND METHODS HERE
    return {
        getMessage: getMyPrivateMessage,
        setMessage: function(msg) {
            setMyPrivateMessage(msg);
        }
    }
} ();   // PARANTHESIS IMMEDIATELY INVOKES THE FUNCTION AFTER IT'S DEFINED

loggerNS.getMessage();
loggerNS.setMessage("Changing my private message");
loggerNS.getMessage();