import * as fetchService from '../services/fetch.js';
import { Factory } from '../utilities/factory/factory.js';
import * as validator from '../utilities/validator.js';
import * as helper from './../utilities/helper.js';

const authorSelect = document.getElementById('author');
const titleInput = document.getElementsByName('title')[0];
const subTitleInput = document.getElementsByName('subTitle')[0];
const urlImgInput = document.getElementsByName('urlImg')[0];
const tagInput = document.getElementsByName('tag')[0];
const descriptionInput = document.getElementsByName('description')[0];
const form = document.getElementsByTagName('form')[0];
const inputs = document.querySelectorAll('input,textarea');
const loader = document.getElementsByClassName('loader')[0];
const loaderImage = document.getElementById('loaderImage');
const loaderTitle = document.getElementsByClassName('animation__title')[0];
const buttonPost = document.getElementsByClassName(
  'container__button--send'
)[0];
const buttonCancel = document.getElementsByClassName(
  'container__button--cancel'
)[0];
//array that is going to save the state if a specific input one for each index is valid
let fieldStateOk = [];
let postId;
let createDate;
let likes;
const factory = new Factory();

let Post = {
  title: undefined,
  subTitle: undefined,
  image: undefined,
  tags: [],
  likes: 0,
  body: undefined,
  author: undefined,
  createDate: undefined,
};

async function setValues(data) {
  titleInput.value = data.title;
  subTitleInput.value = data.subTitle;
  urlImgInput.value = data.image;
  tagInput.value = await getTags(data.tags);
  descriptionInput.value = data.body;
  authorSelect.value = data.author;
  createDate = data.createDate;
  likes = data.likes;
}
async function getTags(array) {
  let response = [];
  try {
    for (let id of array) {
      const tag = await fetchService.getInstance().get(`tags/${id}`);
      response.push(tag.name);
    }
    return response;
  } catch (error) {
    console.log(error);
  }
}
async function getData(postId) {
  try {
    const response = await fetchService.getInstance().get(`posts/${postId}`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

//checkers to validate each fields of the post

//check if all inputs state saved at the array of states are ok "true"
function okInputChecker() {
  let wrongFields = 0;
  fieldStateOk.forEach((e) => {
    if (!e) {
      wrongFields++;
    }
  });
  if (wrongFields) {
    buttonPost.disabled = true;
  } else {
    buttonPost.disabled = false;
  }
}

function checkValue(value, inputType) {
  if (inputType === 'urlImg') {
    return validator.validateWebsite(value);
  } else {
    return validator.validateTex(value);
  }
}

function inputValidator(value, inputType, index) {
  if (value && checkValue(value, inputType)) {
    fieldStateOk[index] = true;
  } else {
    fieldStateOk[index] = false;
  }
  okInputChecker();
}

async function createTag(tag) {
  try {
    let Tag = {
      name: tag.charAt(0).toUpperCase() + tag.slice(1),
      slug: tag.toLowerCase(),
    };
    const response = await fetchService.getInstance().post(Tag, 'tags');
    return response.id;
  } catch (error) {
    console.log(error.message);
  }
}

//logic for create the tags since we get it as 'tag,tag,tag'
async function handleTag(value) {
  let tagsValue = [];
  try {
    let available = {};
    const tagArray = value.split(',');
    const tagsAvailable = await fetchService.getInstance().get('tags');
    for (let tag of tagArray) {
      tag = tag.trim();
      //logic to add just new tags and use the saved ones
      available = helper.searchValue(tagsAvailable, 'slug', tag);
      if (available) {
        tagsValue.push(available.id);
      } else {
        let tagId = await createTag(tag);
        tagsValue.push(tagId);
      }
    }
    return tagsValue;
  } catch (error) {
    console.log(error.message);
  }
}

async function createPost() {
  try {
    Post = {
      title: titleInput.value,
      subTitle: subTitleInput.value,
      image: urlImgInput.value,
      body: descriptionInput.value,
      tags: await handleTag(tagInput.value),
      likes: 0,
      author: parseInt(authorSelect.value, 10),
      createDate: new Date(Date.now())
        .toISOString()
        .replaceAll('-', '/')
        .slice(0, 10),
    };
    await fetchService.getInstance().post(Post, 'posts');
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}

async function updatePost() {
  try {
    Post = {
      title: titleInput.value,
      subTitle: subTitleInput.value,
      image: urlImgInput.value,
      body: descriptionInput.value,
      tags: await handleTag(tagInput.value),
      likes: likes,
      author: parseInt(authorSelect.value, 10),
      createDate: createDate,
    };
    await fetchService.getInstance().put(Post, `posts/${postId}`);
  } catch (error) {
    console.log(error);
  }
}

//field the options of the select in order to have the authors saved
async function printAuthors() {
  try {
    let response = await fetchService.getInstance().get('authors');
    authorSelect.innerHTML = '';
    if (response.length) {
      response.forEach((author) => {
        authorSelect.innerHTML += factory
          .createElements('author')
          .selectOption(author);
      });
    }
  } catch (error) {
    console.log(error.message);
  }
}

window.addEventListener('load', async () => {
  const params = new URLSearchParams(window.location.search);
  postId = params.get('post');
  printAuthors();
  //create logic
  if (!postId) {
    inputs.forEach(() => {
      fieldStateOk.push(false);
    });
  } else {
    //edit logic
    inputs.forEach(() => {
      fieldStateOk.push(true);
      okInputChecker();
    });
    setValues(await getData(postId));
  }
});

//validating every input field
inputs.forEach((input, index) => {
  input.addEventListener('keyup', (e) => {
    const value = e.target.value.trim();
    inputValidator(value, e.target.name, index);
  });
});

form.addEventListener('submit', async (e) => {
  try {
    e.preventDefault();
    loader.style.display = 'flex';
    //create post
    if (!postId) {
      await createPost();
      loaderTitle.innerText = 'Created';
    } else {
      //update post
      await updatePost();
      loaderTitle.innerText = 'Updated';
    }
    setTimeout(() => {
      location.href = 'index.html';
    }, 500);
    loaderImage.src = './../../assets/img/created.png';
    loaderImage.classList.remove('animation__img--loading');
  } catch (error) {
    console.log(error);
  }
});

buttonCancel.addEventListener('click', () => {
  location.href = 'index.html';
});
