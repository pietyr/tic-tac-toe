import './scss/main.scss';

const buttonX = document.querySelector('#radio-x');
const buttonO = document.querySelector('#radio-o');

buttonX.addEventListener('click', (e) => {
  console.log(`buttonX clicked`);
  console.log(`checked = ${buttonX.checked}`);
  console.log(`buttonO checked = ${buttonO.checked}`);
});

buttonO.addEventListener('click', (e) => {
  console.log(`buttonO clicked`);
  console.log(`checked = ${buttonO.checked}`);
  console.log(`buttonX checked = ${buttonX.checked}`);
});
