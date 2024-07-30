const sectionNumbers = document.getElementsByClassName('sectionNumbers');
const nextBtns = document.getElementsByClassName('nextBtn');
const errors = document.getElementsByClassName('errors');
const inputs = document.getElementsByTagName('input');
let sectionNumbersCount = 0;

//Line 5 to 49 are for sectionNumbers styling while clicking nextBtn or moving to next section if all conditions are satisfied...
setBackgoundColor(); //Setting style for 1st section...

//Checking is input fields are empty or not...
Array.from(nextBtns).forEach(nextBtn => {
    nextBtn.addEventListener("click", () => {
        let isError = false; 
        resetErrors();
        //Checking the inout fields and displayinf error if it is empty...
        Array.from(inputs).forEach(input => {
            if (input.value.length === 0) {
                const index = Array.from(inputs).indexOf(input);
                errors[index].style.display = "block";
                isError = true;
            }
        });
        if (!isError) { //Moving to next section if there is no errors...
            sectionNumbersCount++;
            setBackgoundColor();
        }
    });
});

function resetErrors() {
    for(let i = 0; i < errors.length; i++) {
        errors[i].style.display = "none";
    }
}

function setBackgoundColor() {
    resetBackgoundColor(); //Reseting all style before styling the displayed section...
    sectionNumbers[sectionNumbersCount].style.backgroundColor = "var(--pastelBlue)";
    sectionNumbers[sectionNumbersCount].style.borderColor = "var(--pastelBlue)";
    sectionNumbers[sectionNumbersCount].style.color = "var(--marineBlue)";
};

//Reseting style function...
function resetBackgoundColor() {
    for(let i = 0; i < sectionNumbers.length; i++) {
        sectionNumbers[i].style.backgroundColor = "transparent";
        sectionNumbers[i].style.borderColor = "var(--white)";
        sectionNumbers[i].style.color = "var(--white)";
    }
}