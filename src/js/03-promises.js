import { Notify } from "notiflix";
const form = document.querySelector(`.form`);
form.addEventListener(`submit`, onFormSubmit);
function onFormSubmit(event) {
  event.preventDefault()
  const { delay, step, amount } = event.target.elements;
  let deleyValue = +delay.value
  for (let index = 1; index <= amount.value; index++) {
    createPromise(index, deleyValue)
    .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    deleyValue+=+step.value
  }
  event.target.reset()
}
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
  } else {
        reject({position, delay});
  }
    },delay)
  
  })
 
}
