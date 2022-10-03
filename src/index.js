import "@/styles/style";
import "@/styles/style.scss";

const rangeInputs = document.querySelectorAll(".range__input");
const progress = document.querySelector(".slider__progress");
const fieldInputMin = document.querySelector(".filed__input_min");
const fieldInputMax = document.querySelector(".filed__input_max");
const fieldInputs = document.querySelectorAll(".filed__input");

const priceGap = 1000;

rangeInputs.forEach((input) => {
    input.addEventListener("input", (e) => {
        changeRangePrice(e);
    });
});

fieldInputs.forEach((field) => {
    field.addEventListener("change", (e) => {
        const targetInput = e.target;

        if (targetInput.classList.contains("filed__input_min")) {
            const maxInput = targetInput
                .closest(".price-input")
                .querySelector(".filed__input_max");
            if (maxInput.value - targetInput.value < 1000) {
                rangeInputs[0].value = maxInput.value - priceGap;
            } else {
                rangeInputs[0].value = targetInput.value;
            }
        } else {
            const minInput = targetInput
                .closest(".price-input")
                .querySelector(".filed__input_min");
            if (targetInput.value - minInput.value < 1000) {
                rangeInputs[1].value = Number(minInput.value) + priceGap;
            } else {
                rangeInputs[1].value = targetInput.value;
            }
        }

        changeRangePrice();
    });
});

function changeRangePrice(e) {
    let minVal = Number(rangeInputs[0].value);
    let maxVal = Number(rangeInputs[1].value);

    const differenceVal = maxVal - minVal;

    if (differenceVal < priceGap) {
        if (e.target.classList.contains("range__input_min")) {
            rangeInputs[0].value = maxVal - priceGap;
        } else {
            rangeInputs[1].value = minVal + priceGap;
        }
    } else {
        let percentLeftSide = Math.floor((minVal / rangeInputs[0].max) * 100);
        let percentRightSide =
            100 - Math.floor((maxVal / rangeInputs[1].max) * 100);
        progress.style.left = percentLeftSide + "%";
        progress.style.right = percentRightSide + "%";
        fieldInputMin.value = minVal;
        fieldInputMax.value = maxVal;
    }
}
