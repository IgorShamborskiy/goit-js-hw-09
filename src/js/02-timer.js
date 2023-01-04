// import flatpickr from "flatpickr";
// import "flatpickr/dist/flatpickr.min.css";
// import { Notify } from "notiflix";

// const refs = {
//     startBtn: document.querySelector('button[data-start]'),
//   clockface: document.querySelector('#datetime-picker'),
//     daysBtn: document.querySelector('button[data-days]'),
//     hoursBtn: document.querySelector('button[data-hours]'),
//     minutesBtn: document.querySelector('button[data-minutes]'),
//     secondsBtn: document.querySelector('button[data-seconds]'),
    
// };
// btnStart.disabled = true;

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     if (selectedDates[0] < Date.now()) {
//       Notiflix.Notify.failure('Please choose a date in the future');
//       btnStart.disabled = true;
//     } else {
//       Notiflix.Notify.success('Date selected successfully');
//       btnStart.disabled = false;
//     }
//   },
// };

// flatpickr(text, options);

// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = Math.floor(ms / day);
//   // Remaining hours
//   const hours = Math.floor((ms % day) / hour);
//   // Remaining minutes
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   // Remaining seconds
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }

// let timerId; 

// function pad(value) {
//     return String(value).padStart(2,`0`)
// }

// function onClick() {
//   timerId = setInterval(onTime, 1000);
// }
// function onTime() {
//     let countdown = new Date(text.value) - Date.now();
//     btnStart.disabled = true;
//     if (countdown >= 0) {
//       updateCounters(countdown);
//       if (countdown <= 10000) {
//         timerHtml.style.color = new Color().tomato;
//       }
//     } else {
//       Notiflix.Notify.success('Countdown finished');
//       timerHtml.style.color = new Color().black;
//       clearInterval(timerId);
//     }
//   }
  
//   btnStart.addEventListener('click', onClick);


import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

 
class Color {
  black;
  tomato;
  constructor() {
    this.black = "#000";
    this.tomato = "#ff6347";
  }
}
// Получаем указатели на нужные элементы интерфейса
const text = document.querySelector('#datetime-picker');
const timerHtml = document.querySelector('.timer');
const btnStart = document.querySelector('button[data-start]');
const seconds = document.querySelector('span[data-seconds]');
const minutes = document.querySelector('span[data-minutes]');
const hours = document.querySelector('span[data-hours]');
const days = document.querySelector('span[data-days]');
//Блочим кнопку старт
btnStart.disabled = true;
//Дополняем options проверкой ввкденной даты и выкидыванием предупреждения
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStart.disabled = true;
    } else {
      Notiflix.Notify.success('Date selected successfully');
      btnStart.disabled = false;
    }
  },
};
//Иницилизируем flatpickr (привязываем поле инпут к flatpickr)
flatpickr(text, options);
// функция разложения на секнды, минуты, часы, дни (результат разложения и деструктаризации входного значения)
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
//Создаем переменную для сохранения возвращаемого значения функции setInterval
let timerId; 
//Функция для добавления нулей до размерности 2
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
//Обработчик события onClick, запускает функцию таймера onTime и сохраняет значение функции setInterval
function onClick() {
    timerId = setInterval(onTime, 1000);
}
//Функция, которая проверяет введенное значение даты и если дата соответствует введенным критериям, обнавляет значение полей вывода (мин, сек и т.д.)
function onTime() {
    let countdown = new Date(text.value) - Date.now();
    btnStart.disabled = true;
    if (countdown >= 0) {
      updateCounters(countdown);
      if (countdown <= 10000) {
        timerHtml.style.color = new Color().tomato;
      }
    } else {
      Notiflix.Notify.success('Countdown finished');
      timerHtml.style.color = new Color().black;
      clearInterval(timerId);
    }
}

// Установка обработчика событий на кнопку Start
btnStart.addEventListener('click', onClick);

function updateCounters(countdown) {
  let timeObject = convertMs(countdown);
  days.textContent = addLeadingZero(timeObject.days);
  hours.textContent = addLeadingZero(timeObject.hours);
  minutes.textContent = addLeadingZero(timeObject.minutes);
  seconds.textContent = addLeadingZero(timeObject.seconds);
}


