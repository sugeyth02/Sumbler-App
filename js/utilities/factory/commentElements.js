class CommentElements {
  comentaryInput(authors) {
    let options = '';
    authors.forEach((e) => {
      options += `<option value=${e.id}>${e.name} ${e.lastName}</option>`;
    });
    return `<div class="createComment">
            <div class="author">
              <i class="fa-solid fa-user-large createComment__icon"></i>
              <label class="createComment__label" for="author"> Author</label>
              <select class="createComment__select" name="author" id="author">
               ${options}
              </select>
            </div>
            <label class="createComment__label" for="commentBody">
              Author</label
            >
            <textarea
              type="text"
              name="commentBody"
              class="createComment__input"
            ></textarea>
            <button class="comment__send">COMMENT</button>
          </div>`;
  }
  comment(comments, authors) {
    let result = '';
    comments.forEach((e) => {
      let author = authors.find((a) => a.id === e.user);
      result += `<div class="comentary">
            <p class="comentary__user">${author.name} ${author.lastName}</p>
            <p class="commentary__body">
              ${e.comment}
            </p>
          </div>`;
    });
    return result;
  }
}

export { CommentElements };
