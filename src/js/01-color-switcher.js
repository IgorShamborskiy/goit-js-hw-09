const refs = {
    buttonStart: document.querySelector('button[data-start]'),
  buttonStop: document.querySelector('button[data-stop]'),
}
btnSwitcher(false, true); 

refs.buttonStart.addEventListener("click", changeBgColor); 
refs.buttonStop.addEventListener("click", stopBgColor); 
let timerId ;

function changeBgColor() { 
  if (!timerId) { 
    timerId = setInterval(onTime, 1000); 
    btnSwitcher(true, false);
  }
}

function btnSwitcher(start,stop) {
  refs.buttonStop.disabled = stop;
  refs.buttonStart.disabled = start;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onTime() { 
    document.body.style.background = getRandomHexColor(); 
}

function stopBgColor() { 
  clearInterval(timerId);
  timerId = null; 
  btnSwitcher(false, true); 
}




