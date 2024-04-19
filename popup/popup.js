const defaultSliderValue = 2;

const slider = document.getElementById("range-slider");
const sliderValueDisplay = document.getElementById("slider-value");

chrome.storage.local.get(["SLIDER_KEY"], function (result) {
  console.log(result);
  if (result.SLIDER_KEY !== undefined) {
    slider.value = result.SLIDER_KEY;
    sliderValueDisplay.innerText = result.SLIDER_KEY;
  }
});

slider.addEventListener("input", function () {
  sliderValueDisplay.innerText = this.value;
  chrome.storage.local.set({ SLIDER_KEY: this.value });
});
