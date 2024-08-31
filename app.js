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
const clickedPlans = document.getElementsByClassName('clickedPlan');
const choosedPlanTitle = document.getElementById('choosedPlanTitle');
const totalPrice = document.getElementById('totalPrice');
const priceSummary = document.getElementById('priceSummary');
const changeBtn = document.getElementById("changeBtn");
const confirmBtn = document.getElementById("confirmBtn");
let sectionNumbersCount = 0;
let toggleValue = false;
let planTitle;
let planPrice;

setBackgoundColor();

//Moving to pre. section while clicking goBackBtn...
Array.from(goBackBtns).forEach(goBackBtn => {
    goBackBtn.addEventListener("click", () => {
        sectionNumbersCount--;
        setBackgoundColor();
        switchingSections(sectionNumbersCount);
    })
})

//Changing the details when toggle button is clicked...
let isToggled = false;
toggleBtn.addEventListener("click", () => {
    isToggled = !isToggled;
    toggled(isToggled);
    toggleValue = isToggled;
});

//Styling while clicking the plans...
Array.from(plans).forEach(plan => {
    plan.addEventListener("click", () => {
        resetPlanClicked();
        plan.classList.add('clickedPlan');
        plan.classList.remove('notClickedPlan');
        assigningValue();
    });
    assigningValue();
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

//Checking if input fields are empty or not...
Array.from(nextBtns).forEach(nextBtn => {
    nextBtn.addEventListener("click", () => {
        let isError = false;
        resetErrors();
        //Checking the input fields and displaying error if it is empty...
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

        if (Array.from(nextBtns).indexOf(nextBtn) === 2) {
            // PRICE SUMMARY DISPLAYING HERE...
            assigningValue();
            choosedPlanTitle.textContent = planTitle;
            const optionPriceNums = [];
            totalPrice.textContent = planPrice;
            optionPriceNums[0] = planPrice;

            // Options summary displaying here...
            const optionChecked = document.getElementsByClassName("checked");
            priceSummary.innerHTML= '';

            for (let i = 0; i < optionChecked.length; i++) {
                // Creating the parent div to display chosen add-ons options...
                let summaryBox = document.createElement("div");
                summaryBox.classList.add("center", "summaryBox");
                priceSummary.appendChild(summaryBox);

                // Creating the child to display the title of the chosen option...
                let choosedAddOns = document.createElement("div");
                choosedAddOns.classList.add("choosedAddOns");
                choosedAddOns.setAttribute("id", `choosedAddOns${i}`);

                // Getting the text content of the <p> element with class "title"
                const optionTitle = optionChecked[i].querySelector(".title").textContent;

                // Setting the text content of choosedAddOns directly
                choosedAddOns.textContent = optionTitle;

                // Appending choosedAddOns to summaryBox
                summaryBox.appendChild(choosedAddOns);

                // Creating the child to display the price of the chosen option...
                let addOnsPrice = document.createElement("div");
                addOnsPrice.classList.add("addOnsPrice");
                addOnsPrice.setAttribute("id", `addOnsPrice${i}`);

                // Declaring optionPrice variable outside the if-else blocks
                let optionPrice;

                if (!isToggled) {
                    // Getting the text content of the <p> element with class "monthlyPrice"
                    optionPrice = optionChecked[i].querySelector(".monthlyPrice").textContent;
                } else {
                    // Getting the text content of the <p> element with class "yearlyPrice"
                    optionPrice = optionChecked[i].querySelector(".yearlyPrice").textContent;
                }

                // Setting the text content of addOnsPrice directly
                addOnsPrice.textContent = optionPrice;
                optionPriceNums[i+1] = optionPrice;

                // Appending addOnsPrice to summaryBox
                summaryBox.appendChild(addOnsPrice);
            }

            //Toatl per month/year...
            const total = document.getElementById("overallTitle");
            if(!isToggled){
                total.textContent = "per month";
            } else {
                total.textContent = "per year";
            }

            //Calculating the yotal price...
            let sum = 0;
            Array.from(optionPriceNums).forEach(optionPriceNum => {
                optionPriceNum = Number(optionPriceNum.replace(/\D/g, ''));
                sum += optionPriceNum;
            })

            if(!isToggled) {
                document.getElementById("overallPrice").textContent = `+$${sum}/mo`;
            } else {
                document.getElementById("overallPrice").textContent = `+$${sum}/yr`;
            }
        }
    });

});

//Redirecting to "plans container" when change btn is clicked...
changeBtn.addEventListener("click", () => {
    sectionNumbersCount = 1;
    setBackgoundColor();
    switchingSections(sectionNumbersCount);
    subcontainers[3].style.display = "none";
})

//Thankyou page when confirmBtn is clicked...
confirmBtn.addEventListener("click", () => {
    subcontainers[3].style.display = "none";
    subcontainers[4].style.display = "flex";
})

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
        plans[i].classList.add('notClickedPlan');
        plans[i].classList.remove('clickedPlan');
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
        Array.from(monthlyPrices).forEach(monthlyPrice => {
            monthlyPrice.style.display = "none";
        })
        Array.from(yearlyPrices).forEach(yearlyPrice => {
            yearlyPrice.style.display = "block";
        })

        for (let i = 0; i < discount.length; i++) {
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
        Array.from(monthlyPrices).forEach(monthlyPrice => {
            monthlyPrice.style.display = "block";
        })
        Array.from(yearlyPrices).forEach(yearlyPrice => {
            yearlyPrice.style.display = 'none';
        })

        for (let i = 0; i < discount.length; i++) {
            pricePerMonth[i].style.display = "block";
            pricePerYear[i].style.display = "none";
            discount[i].style.display = "none";
        }
    }
}

//Displaying the choosed plan title and price
function assigningValue() {
    Array.from(clickedPlans).forEach(clickedPlan => {
        planTitle = clickedPlan.querySelector(".title").textContent;
        if (toggleValue) {
            planPrice = clickedPlan.querySelector(".pricePerYear").textContent;
        } else {
            planPrice = clickedPlan.querySelector(".pricePerMonth").textContent;
        }
    })
}

