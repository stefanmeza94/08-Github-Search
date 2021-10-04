const container = document.querySelector('.container');
const toggleBtn = document.querySelector('.js-toggle_btn');
const imageMoon = document.querySelector('.header .toggle_btn img');
const toggleColorText = document.querySelector('.header .toggle_btn p');
const form = document.querySelector('.js-form');
const input = document.querySelector('.js-input');

const avatar = document.querySelector('.avatar');
const username = document.querySelector('.js-username');
const userlink = document.querySelector('.js-userlink');
const joinDate = document.querySelector('.js-joinDate');
const bio = document.querySelector('.js-bio');
const repos = document.querySelector('.js-repos');
const followers = document.querySelector('.js-folowers');
const following = document.querySelector('.js-following');
const loc = document.querySelector('.js-location');
const locImage = document.querySelector('.js-marker')
const blog = document.querySelector('.js-blog');
const blogImage = document.querySelector('.js-link');
const twitter = document.querySelector('.js-twitter');
const twitterImage = document.querySelector('.js-twitterImage');
const company = document.querySelector('.js-company');
const companyImage = document.querySelector('.js-building');


const toggleBlack = function() {
  container.classList.add('black');
  imageMoon.setAttribute('src', './assets/icon-sun.svg');
  toggleColorText.textContent = 'light';
}

const toggleWhite = function() {
  container.classList.remove('black');
  imageMoon.setAttribute('src', './assets/icon-moon.svg');
  toggleColorText.textContent = 'dark';
}

// toggle dark/white mode
toggleBtn.addEventListener('click', function() {
  if (!container.classList.contains('black')) {
    toggleBlack();
  } else {
    toggleWhite();
  }
});


// display users
const displayUser = user => {
  avatar.setAttribute('src', `${user.avatar_url}`);
  username.innerText = `${user.name}`;
  userlink.innerText = `@${user.login}`;
  joinDate.innerText = `Joined: ${user.created_at}`;
  bio.innerHTML = `<p class="js-bio ${user.bio === null ? 'notAvailable' : ''}">${user.bio === null ? 'This profile has no bio' : `${user.bio}`}</p>`;
  repos.innerText = `${user.public_repos}`;
  followers.innerText = `${user.followers}`;
  following.innerText = `${user.following}`;

  // check location
  if (user.location === null) {
    loc.innerText = 'Not Available';
    loc.classList.add('notAvailable');
    locImage.classList.add('notAvailable');
  } else {
    loc.innerText = `${user.location}`;
    loc.classList.remove('notAvailable');
    locImage.classList.remove('notAvailable');
  }

  // check blog
  if (user.blog === null || user.blog === '') {
    blog.innerText = 'Not Available';
    blog.classList.add('notAvailable');
    blogImage.classList.add('notAvailable');
  } else {
    blog.innerText = `${user.blog}`;
    blog.classList.remove('notAvailable');
    blogImage.classList.remove('notAvailable');
  }

  // check twitter
  if (user.twitter_username === null) {
    twitter.innerText = 'Not Available';
    twitter.classList.add('notAvailable');
    twitterImage.classList.add('notAvailable');
  } else {
    twitter.innerText = `${user.twitter}`;
    twitter.classList.remove('notAvailable');
    twitterImage.classList.remove('notAvailable');
  }

  // check company
  if (user.company === null) {
    company.innerText = 'Not Available';
    company.classList.add('notAvailable');
    companyImage.classList.add('notAvailable');
  } else {
    company.innerText = `${user.company}`;
    company.classList.remove('notAvailable');
    companyImage.classList.remove('notAvailable');
  }
}

const getUsers = async user => {
  try {
    const res = await fetch(`https://api.github.com/users/${user}`);
    let users = await res.json();
    displayUser(users);
    console.log(users);
  } catch (err) {
    console.error(err);
  }
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  if (input.value !== '' ) {
    console.log(input.value);
    getUsers(input.value);
  }

  input.value = '';
});
