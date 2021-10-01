const container = document.querySelector('.container');
const toggleBtn = document.querySelector('.js-toggle_btn');
const imageMoon = document.querySelector('.header .toggle_btn img');
const toggleColorText = document.querySelector('.header .toggle_btn p');

const toggleBlack = function() {
  container.classList.add('black');
  imageMoon.setAttribute('src', './assets/icon-sun.svg');
  toggleColorText.textContent = 'light';
}

const toggleWhite = function() {
  container.classList.remove('black');
  imageMoon.setAttribute('src', './assets/icon-moon.svg');
  toggleColorText.textContent = 'moon';
}

toggleBtn.addEventListener('click', function() {
  if (!container.classList.contains('black')) {
    toggleBlack();
  } else {
    toggleWhite();
  }
});