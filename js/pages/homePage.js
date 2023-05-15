import * as fetchService from '../services/fetch.js';
import { Factory } from './../utilities/factory/factory.js';
import * as helper from './../utilities/helper.js';

const buttonAddPost = document.getElementsByClassName('nav__addPost')[0];
const buttonHappeningNow = document.getElementsByClassName('happeningNow')[0];
const buttonAllPosts = document.getElementsByClassName('allPosts')[0];
const buttonSearch = document.getElementsByClassName('searchBar_button')[0];
const recentPostsContainer = document.getElementsByClassName(
  'recentPostsContainer'
)[0];
const remainingPostsContainer = document.getElementsByClassName(
  'remainingPostsContainer'
)[0];
const allPostContainer = document.getElementsByClassName('allPostContainer')[0];
const loader = document.getElementsByClassName('loader')[0];
const searchInput = document.getElementById('search');
const loaderTitle = document.getElementsByClassName('animation__title')[0];
const loaderImg = document.getElementById('loaderImage');
const factory = new Factory();

function cleanContainers() {
  recentPostsContainer.innerHTML = '';
  remainingPostsContainer.innerHTML = '';
  allPostContainer.innerHTML = '';
}

async function getTags(array) {
  let response = '';
  try {
    for (let id of array) {
      const tag = await fetchService.getInstance().get(`tags/${id}`);
      response += `#${tag.name} `;
    }
    return response;
  } catch (error) {
    console.log(error);
  }
}
async function getAuthor(id) {
  try {
    const author = await fetchService.getInstance().get(`authors/${id}`);
    return `${author.name} ${author.lastName}`;
  } catch (error) {
    console.log(error);
  }
}

async function printPostsRecent() {
  try {
    let htmlRecent = '';
    let htmlRemaining = '';
    loader.style.display = 'flex';
    let response = await fetchService
      .getInstance()
      .get('posts?_sort=id&_order=desc');
    cleanContainers();
    if (response.length) {
      const recent = response.slice(0, 3);
      const remaining = response.slice(4);

      for (let post of recent) {
        let tags = await getTags(post.tags);
        let author = await getAuthor(post.author);
        htmlRecent += factory
          .createElements('post')
          .recentPosts(post, author, tags);
      }

      for (let post of remaining) {
        let tags = await getTags(post.tags);
        let author = await getAuthor(post.author);
        htmlRemaining += factory
          .createElements('post')
          .remainingPosts(post, author, tags);
      }
    }
    recentPostsContainer.innerHTML = htmlRecent;
    remainingPostsContainer.innerHTML = htmlRemaining;
    loader.style.display = 'none';
  } catch (error) {
    console.log(error.message);
  }
}
async function printAllPost() {
  try {
    let html = '';
    loader.style.display = 'flex';
    let response = await fetchService
      .getInstance()
      .get('posts?_sort=id&_order=desc');
    cleanContainers();
    if (response.length) {
      for (let post of response) {
        let tags = await getTags(post.tags);
        let author = await getAuthor(post.author);
        html += factory.createElements('post').allPosts(post, author, tags);
      }
    }
    loader.style.display = 'none';
    allPostContainer.innerHTML = html;
  } catch (error) {
    console.log(error.message);
  }
}
async function searchPost(inputValue) {
  if (!inputValue) {
    return;
  }
  try {
    loader.style.display = 'flex';
    let response = await fetchService
      .getInstance()
      .get(`posts?title=${inputValue}`);
    if (response.length) {
      location.href = `postPage.html?post=${response[0].id}`;
    } else {
      setTimeout(() => {
        loader.style.display = 'none';
        loaderTitle.innerText = 'Loading...';
        loaderImg.src = './../../assets/img/loader.png';
        loaderImg.classList.add('animation__img--loading');
      }, 1000);
      loaderTitle.innerText = 'Not found';
      loaderImg.src = './../../assets/img/notFound.png';
      loaderImg.classList.remove('animation__img--loading');
    }
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener('load', () => {
  buttonHappeningNow.click();
  buttonHappeningNow.focus();
});

buttonAddPost.addEventListener('click', function () {
  location.href = 'createEditPage.html';
});

buttonHappeningNow.addEventListener('click', function () {
  buttonHappeningNow.classList.add('button--clicked');
  buttonAllPosts.classList.remove('button--clicked');
  cleanContainers();
  printPostsRecent();
});

buttonAllPosts.addEventListener('click', function () {
  buttonHappeningNow.classList.remove('button--clicked');
  buttonAllPosts.classList.add('button--clicked');
  cleanContainers();
  printAllPost();
});

buttonSearch.addEventListener(
  'click',
  helper.throttle(() => {
    searchPost(searchInput.value);
  }, 1000)
);

document.addEventListener('click', function (e) {
  //if we clicked at the icon
  if (e.target && e.target.parentNode.matches('.headerIcon')) {
    //send the id of the post as a query param
    location.href = `postPage.html?post=${e.target.parentNode.id}`;
    //if we clicked at the button
  } else if (e.target && e.target.matches('.headerIcon')) {
    location.href = `postPage.html?post=${e.target.id}`;
  }
});
