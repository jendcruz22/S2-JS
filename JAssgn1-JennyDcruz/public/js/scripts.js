// ON LOAD FUNCTION
window.onload = function() {
    // VARIABLES
    var formHandle = document.forms.form_book;

    var fNameInput = formHandle.fName;
    var lNameInput = formHandle.lName;
    var roomTypeInput = formHandle.roomType;

    var tyMsg = document.getElementById("thanksMsg");

    formHandle.onsubmit = processForm;

    // FUNCTION TO PROCESS THE FORM ON SUBMISSION 
    function processForm() {

        // ON SUBMISSION, HIDE THE FORM AND DISPLAY ONLY CONFIRMATION/THANK YOU MESSAGE
        formHandle.style.display = "none";

        tyMsg.style.display = "block";
        document.getElementById("fNameOutput").innerHTML = fNameInput.value;
        document.getElementById("lNameOutput").innerHTML = lNameInput.value;
        document.getElementById("roomTypeOutput").innerHTML = roomTypeInput[roomType.selectedIndex].text;

        return false;
    }
}