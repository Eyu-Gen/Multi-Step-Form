const sectionNumbers = document.getElementsByClassName('sectionNumbers');
const nextBtns = document.getElementsByClassName('nextBtn');
const goBackBtns = document.getElementsByClassName('goBackBtn');
const errors = document.getElementsByClassName('errors');
const subcontainers = document.getElementsByClassName('leftSubcontainer');
const inputs = document.getElementsByTagName('input');
const plans = document.getElementsByClassName('plans');
const toggleBtn = document.getElementById('toggleBtn');
const toggleBtnInnerCircle = document.getElementById('toggleBtnInnerCircle');
const toggleMonthly = document.getElementById('toggleMonthly');
const toggleYearly = document.getElementById('toggleYearly');
const pricePerMonth = document.getElementsByClassName('pricePerMonth');
const pricePerYear = document.getElementsByClassName('pricePerYear');
const discount = document.getElementsByClassName('discount');
const options = document.getElementsByClassName('options');
const monthlyPrices = document.getElementsByClassName('monthlyPrice');
const yearlyPrices = document.getElementsByClassName('yearlyPrice');
let sectionNumbersCount = 0;

setBackgoundColor();

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
            switchingSections(sectionNumbersCount);
        }
    });
});

//Moving to pre. section while clicking goBackBtn...
Array.from(goBackBtns).forEach(goBackBtn => {
    goBackBtn.addEventListener("click", () => {
        sectionNumbersCount--;
        setBackgoundColor();
        switchingSections(sectionNumbersCount);
    })
})

//Styling while clicking the plans...
Array.from(plans).forEach(plan => {
    plan.addEventListener("click", () => {
        resetPlanClicked();
        plan.style.borderColor = "var(--marineBlue)";
        plan.style.backgroundColor = "var(--Magnolia)";
    });
});

//Changing the details when toggle button is clicked...
let isToggled = false;
toggleBtn.addEventListener("click", () => {
    console.log(isToggled);
    isToggled = !isToggled;
    toggled(isToggled);
});

//Changing the style of options when it is clicked...
let isChecked = true;
Array.from(options).forEach(option => {
    option.addEventListener('click', event => {
            const checkbox = option.querySelector('input[type="checkbox"]');
            checkbox.checked = !checkbox.checked;
        // Toggle the 'checked' class based on the checkbox state...
        if (option.querySelector('input[type="checkbox"]').checked) {
            option.classList.add('checked');
        } else {
            option.classList.remove('checked');
        }
    });
})

//ERROR... while toggling yearlyPrice is not displayed...
if(isToggled){
    console.log(isToggled);
    console.log('IF');
    Array.from(monthlyPrices).forEach(monthlyPrice => {
        monthlyPrice.classList.add('notChoosed');
        monthlyPrice.classList.remove('choosed');
    })
    Array.from(yearlyPrices).forEach(yearlyPrice => {
        yearlyPrice.classList.add('chossed');
        yearlyPrice.classList.remove('notChossed');
    })
} else {
    console.log(isToggled);
    console.log('ELSE');
    Array.from(monthlyPrices).forEach(monthlyPrice => {
        monthlyPrice.classList.add('choosed');
        monthlyPrice.classList.remove('notChoosed');
    })
    Array.from(yearlyPrices).forEach(yearlyPrice => {
        yearlyPrice.classList.add('notChossed');
        yearlyPrice.classList.remove('chossed');
    })
}

//............................FUNCTIONS...........................//
//Section switching...
function switchingSections(sectionNumbersCount) {
    switch (sectionNumbersCount) {
        case 0:
            subcontainers[0].style.display = "block";
            subcontainers[1].style.display = "none";
            break;
        case 1:
            subcontainers[0].style.display = "none";
            subcontainers[1].style.display = "block";
            subcontainers[2].style.display = "none";
            break;
        case 2:
            subcontainers[1].style.display = "none";
            subcontainers[2].style.display = "block";
            subcontainers[3].style.display = "none";
            break;
        case 3:
            subcontainers[2].style.display = "none";
            subcontainers[3].style.display = "block";
            break;
        default:
            alert("NO SECTION ADDED!!");
    };
};

//Hidding all errors...
function resetErrors() {
    for (let i = 0; i < errors.length; i++) {
        errors[i].style.display = "none";
    }
}

//Setting style for 1st section...
function setBackgoundColor() {
    resetBackgoundColor(); //Reseting all style before styling the displayed section...
    sectionNumbers[sectionNumbersCount].style.backgroundColor = "var(--pastelBlue)";
    sectionNumbers[sectionNumbersCount].style.borderColor = "var(--pastelBlue)";
    sectionNumbers[sectionNumbersCount].style.color = "var(--marineBlue)";
};

//Reseting style function...
function resetBackgoundColor() {
    for (let i = 0; i < sectionNumbers.length; i++) {
        sectionNumbers[i].style.backgroundColor = "transparent";
        sectionNumbers[i].style.borderColor = "var(--white)";
        sectionNumbers[i].style.color = "var(--white)";
    }
}

//Reseting style for all plan...
function resetPlanClicked() {
    for (let i = 0; i < plans.length; i++) {
        plans[i].style.backgroundColor = "transparent";
        plans[i].style.borderColor = "var(--lightGray)";
    }
}

//Price displaying when toggle btn is clicked...
function toggled(isToggled) {
    if (isToggled) {
        toggleBtnInnerCircle.style.right = "0";
        toggleBtnInnerCircle.style.left = "auto";
        toggleMonthly.classList.add('notChoosed');
        toggleMonthly.classList.remove('choosed');
        toggleYearly.classList.add('choosed');
        toggleYearly.classList.remove('notChoosed');
       
        for(let i = 0; i < discount.length; i++) {
            pricePerMonth[i].style.display = "none";
            pricePerYear[i].style.display = "block";
            discount[i].style.display = "block";
        }
    } else {
        toggleBtnInnerCircle.style.left = "0";
        toggleBtnInnerCircle.style.right = "auto";
        toggleMonthly.classList.add('choosed');
        toggleMonthly.classList.remove('notChoosed');
        toggleYearly.classList.add('notChoosed');
        toggleYearly.classList.remove('choosed');

        for(let i = 0; i < discount.length; i++) {
            pricePerMonth[i].style.display = "block";
            pricePerYear[i].style.display = "none";
            discount[i].style.display = "none";
        }
    }
}