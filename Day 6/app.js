const range = document.querySelector("#priceRange");
const price = document.querySelector(".dollars");
range.max = (range.max / 100).toFixed(2);
range.addEventListener("input", function (e) {
    // value should be /100 and be rounded to 2 decimal places
    range.value = step + 1;
    // e.target.value = (e.target.value / 100).toFixed(2);
    price.textContent = e.target.value;

    // price should be /100 and be rounded to 2 decimal places
    // console.log(e.target.value);
});
