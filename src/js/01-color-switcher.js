const refs = {
    buttonStart: document.querySelector('button[data-start]'),
buttonStop: document.querySelector('button[data-stop]'),
}


refs.buttonStart.addEventListener('clic', getRandomHexColor);
// refs.buttonStop.addEventListener('clic', getRandomHexColor);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
