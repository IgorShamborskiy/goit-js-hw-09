import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from "notiflix";

const refs = {
    startBtn: document.querySelector('button[data-start]'),
    clockface: document.querySelector('#datetime-picker'),
    daysBtn: document.querySelector('button[data-days]'),
    hoursBtn: document.querySelector('button[data-hours]'),
    minutesBtn: document.querySelector('button[data-minutes]'),
    secondsBtn: document.querySelector('button[data-seconds]'),
    
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
const timer = {
    start() {
        const startTime = Date.now();

        setInterval(() => {
            const carrentTime = Date.now();
            const finishTime = carrentTime - startTime;
            const {second,minute,hour,day} = convertMs(finishTime);
            console.log(`lowe`, carrentTime);
        }, 1000)
    },
};

timer.start();

refs.startBtn.addEventListener(`clic`, () => {
timer.start
});


function upedateClocFace({ day, hour, minute, second }) {
    refs.clockface.textContent = `${ day }:${ hour }:${ minute }:${ second }`;
}

function pad(value) {
    return String(value).padStart(2,`0`)
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

