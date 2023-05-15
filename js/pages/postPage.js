import * as fetchService from '../services/fetch.js';
import { Factory } from '../utilities/factory/factory.js';

const confirmationBox = document.getElementsByClassName('confirmation')[0];
const postInfo = document.getElementsByClassName('postInfo')[0];
const loader = document.getElementsByClassName('loader')[0];
const buttonDelete = document.getElementsByClassName('button__yes')[0];
const buttonCancel = document.getElementsByClassName('button__no')[0];
const factory = new Factory();

let postId, likesCounter;

async function refreshData() {
  await printPost(postId);
  setListeners();
}

async function deletePost(id) {
  try {
    loader.style.display = 'flex';
    await fetchService.getInstance().delete(`posts/${id}`);
    loader.style.display = 'none';
    location.href = `index.html`;
  } catch (error) {
    console.log(error);
  }
}

async function updateLike(counter, id) {
  let data = {
    likes: counter,
  };
  try {
    const response = await fetchService
      .getInstance()
      .patch(data, `posts/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getTags(array) {
  let response = '';
  try {
    for (let id of array) {
      const tag = await fetchService.getInstance().get(`tags/${id}`);
      //it gets the tags and give a format of #tagName
      response += `#${tag.name} `;
    }
    return response;
  } catch (error) {
    console.log(error);
  }
}
async function getAuthors() {
  try {
    const authors = await fetchService.getInstance().get(`authors`);
    return authors;
  } catch (error) {
    console.log(error);
  }
}
async function getAuthor(id) {
  try {
    const author = await fetchService.getInstance().get(`authors/${id}`);
    //it return the specific author in the format Name LastName
    return `${author.name} ${author.lastName}`;
  } catch (error) {
    console.log(error);
  }
}

async function printPost(postId) {
  try {
    loader.style.display = 'flex';
    const response = await fetchService
      .getInstance()
      .get(`posts/${postId}?_embed=comments`);
    if (response) {
      //initialize the likes that the post have
      likesCounter = response.likes;
      //gets the tags and the author in the format that we need
      const tags = await getTags(response.tags);
      const author = await getAuthor(response.author);

      const authors = await getAuthors();

      postInfo.innerHTML = factory
        .createElements('post')
        .singlePost(response, author, tags);

      //in the following functions we need to send the authors list in order to get the
      //name of the author instead of the id
      //the box where we can create the comment
      postInfo.innerHTML += factory
        .createElements('comment')
        .comentaryInput(authors);

      //the created comments
      postInfo.innerHTML += factory
        .createElements('comment')
        .comment(response.comments, authors);
    }
    loader.style.display = 'none';
  } catch (error) {
    console.log(error.message);
  }
}

async function createComment(data) {
  try {
    const response = await fetchService.getInstance().post(data, `comments`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function likeListener() {
  likesCounter++;
  await updateLike(likesCounter, postId);
  await refreshData();
  document.querySelector('.footer__like').disabled = true;
  document.querySelector('.like__icon').style.color = 'red';
}

function deleteListener() {
  confirmationBox.style.display = 'flex';
}
function editListener() {
  location.href = `createEditPage.html?post=${postId}`;
}
function exitListener() {
  location.href = 'index.html';
}
async function commentListener() {
  const authorValue = parseInt(
    document.querySelector('select[name="author"]').value,
    10
  );
  const commentValue = document.querySelector('.createComment__input').value;

  let data = {
    comment: commentValue,
    postId: parseInt(postId, 10),
    user: authorValue,
  };
  await createComment(data);
  await refreshData();
}

function setListeners() {
  document.querySelector('.delete').addEventListener('click', deleteListener);
  document.querySelector('.edit').addEventListener('click', editListener);
  document.querySelector('.exit').addEventListener('click', exitListener);
  document
    .querySelector('.comment__send')
    .addEventListener('click', commentListener);
  document
    .querySelector('.footer__like')
    .addEventListener('click', likeListener);
}

window.addEventListener('load', async () => {
  //we get the post id passed as a query params
  const params = new URLSearchParams(window.location.search);
  postId = params.get('post');

  await refreshData();
});

buttonDelete.addEventListener('click', function () {
  confirmationBox.style.display = 'none';
  deletePost(postId);
});

buttonCancel.addEventListener('click', function () {
  confirmationBox.style.display = 'none';
});
