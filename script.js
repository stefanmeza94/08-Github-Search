const container = document.querySelector('.container');
const toggleBtn = document.querySelector('.js-toggle_btn');
const imageMoon = document.querySelector('.header .toggle_btn img');
const toggleColorText = document.querySelector('.header .toggle_btn p');
const form = document.querySelector('.js-form');
const input = document.querySelector('.js-input');
const btn = document.querySelector('.js-btn');

const error = document.querySelector('.js-error');
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


// add class if property is null 
const nullProperties = function(property, image) {
  property.innerHTML = `<a href="#" target="_blank" class="js-blog">Not Available</a>`;
  property.classList.add('notAvailable');
  image.classList.add('notAvailable');
}

// remove class if property is available
const showProperties = function(property, image) {
  property.classList.remove('notAvailable');
  image.classList.remove('notAvailable');
}


const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
// show date
const showDate = function(date) {
  const newDate = new Date(date);
  let mon = months[newDate.getMonth()];
  
  return `Joined: ${newDate.getDate()} ${mon} ${newDate.getUTCFullYear()}`;
}


// display users
const displayUser = user => {
  console.log(user);
  avatar.setAttribute('src', `${user.avatar_url}`);
  username.innerText = `${user.name === null ? user.login : user.name}`;
  userlink.innerHTML = `@<a href="${user.html_url}" target="_blank" class="userlink js-userlink">${user.login}</a>`;
  joinDate.innerText = `${showDate(user.created_at)}`;
  bio.innerHTML = `<p class="js-bio ${user.bio === null ? 'notAvailable' : ''}">${user.bio === null ? 'This profile has no bio' : `${user.bio}`}</p>`;
  repos.innerText = `${user.public_repos}`;
  followers.innerText = `${user.followers}`;
  following.innerText = `${user.following}`;

  // check location
  if (user.location === null) nullProperties(loc, locImage);
  else {
    showProperties(loc, locImage, user.location);
    loc.innerText = `${user.location}`;
  }

  // check blog
  if (user.blog === null || user.blog === '') nullProperties(blog, blogImage);
  else {
    showProperties(blog, blogImage);
    blog.innerHTML = `<a href="https://www.linkedin.com/in/${user.login}" target="_blank" class="js-blog">${user.blog}</a>`;
  }

  // check twitter
  if (user.twitter_username === null || user.twitter_username === '') nullProperties(twitter, twitterImage);
  else {
    showProperties(twitter, twitterImage);
    twitter.innerHTML = `<a href="https://twitter.com/${user.twitter_username}" target="_blank" class="js-twitter">${user.twitter_username}</a>`;
  }
  // check company
  if (user.company === null) nullProperties(company, companyImage);
  else { 
    showProperties(company, companyImage);
    company.innerHTML = `<a href="https://${user.blog}" target="_blank" class="js-company">${user.company}</a>`
  }

  
  input.value = '';
}

// there is no user
const errorMessage = function() {
  error.style.visibility = 'visible';
}

// fetch user
const getUsers = async user => {
  try {
    const res = await fetch(`https://api.github.com/users/${user}`);
    let users = await res.json();
    if (users.name !== undefined) {
      displayUser(users);
    } else {
      errorMessage();
    }
  } catch (err) {
    console.error(err);
  }
}

// on page load show octocat user
document.addEventListener('onload', getUsers('octocat'));

// listening submit on form (input)
form.addEventListener('submit', function(e) {
  e.preventDefault();

  if (input.value !== '') getUsers(input.value);
});

// when you clicked outside of the form close error message and delete input value
document.body.addEventListener('click', function(e) {
  if (e.target.value !== '' && e.target !== form && e.target !== btn) {
    input.value = '';
    error.style.visibility = 'hidden';
  } 
});
