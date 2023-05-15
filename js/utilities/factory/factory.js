import { AuthorElements } from './authorElements.js';
import { PostElements } from './postElements.js';
import { CommentElements } from './commentElements.js';
const Factory = function () {
  this.createElements = function (type) {
    let elementsType = null;

    if (type === 'author') {
      elementsType = new AuthorElements();
    }
    if (type === 'post') {
      elementsType = new PostElements();
    }
    if (type === 'comment') {
      elementsType = new CommentElements();
    }

    return elementsType;
  };
};

export { Factory };
