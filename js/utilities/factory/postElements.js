class PostElements {
  recentPosts(post, author, tags) {
    return `<div class="recentPost" id=${post.id}>
          <div class="recentPostHeader">
            <div class="headerAuthor">
              <p class="headerAuthor__author">${author}</p>
              <p class="headerAuthor__createdDate">${post.createDate}</p>
            </div>
            <button class="headerIcon" name="seePostIcon" id=${post.id}><i class="fa-solid fa-eye iconEye"></i></button>
          </div>
          <h1 class="recentPost__title">${post.title}</h1>
          <img
            class="recentPost__img"
            src=${post.image}
            alt="card image"
          />
          <p class="recentPost__tags">${tags}</p>
          <div class="recentPost__likeContainer">
            <i class="fa-solid fa-heart likeContainer__likes"></i>
            <span class="likeContainer__value">${post.likes}</span>
          </div>
        </div>`;
  }
  remainingPosts(post, author, tags) {
    return `<div class="remainingPost" id=${post.id}>
          <div class="remainingPost__author">
            <i class="fa-solid fa-user-large remainingPost__authorIcon"></i>
            <span class="author__name">${author}</span>
          </div>
          <h1 class="remainingPost__tittle">${post.title}</h1>
          <p class="remainingPost__tag">${tags}</p>
          <p class="remainingPost__date">${post.createDate}</p>
          <div class="remainingPost__likes">
            <i class="fa-solid fa-heart likeContainer__likes"></i>
            <span class="likes__value">${post.likes}</span>
          </div>
          <button class="headerIcon" name="seePostIcon" id=${post.id}><i class="fa-solid fa-eye iconEye"></i></button>
        </div>`;
  }
  allPosts(post, author, tags) {
    return `<div class="post" id=${post.id}>
          <div class="postHeader">
            <div class="headerAuthor">
              <p class="headerAuthor__author">${author}</p>
              <p class="headerAuthor__createdDate">${post.createDate}</p>
            </div>
            <button class="headerIcon" name="seePostIcon" id=${post.id}><i class="fa-solid fa-eye iconEye"></i></button>
          </div>
          <h1 class="post__title">${post.title}</h1>
          <img
            class="post__img"
            src=${post.image}
            alt="card image"
          />
          <p class="post__tags">${tags}</p>
          <div class="post__likeContainer">
            <i class="fa-solid fa-heart post__likesIcon"></i>
            <span class="post__Likesvalue">${post.likes}</span>
          </div>
        </div>`;
  }
  singlePost(post, author, tags) {
    return `<div class="header">
          <div class="header__author">
            <i class="fa-solid fa-user-large author_icon"></i>
            <div class="header__info">
              <p class="info__name">${author}</p>
              <p class="info__date">${post.createDate}</p>
            </div>
          </div>
          <div class="options">
            <button class="delete">
              <i class="fa-solid fa-trash-can delete__icon"></i>
            </button>
            <button class="edit">
              <i class="fa-solid fa-pen edit__icon"></i>
            </button>
            <button class="exit">
              <i class="fa-solid fa-x exit__icon"></i>
            </button>
          </div>
        </div>
        <h1 class="post__title">${post.title}</h1>
        <h2 class="post__subtitle">${post.subTitle}</h2>
        <p class="post__tags">${tags}</p>
        <p class="post__body">${post.body}</p>
        <img
          src=${post.image}
          alt="post image"
          class="post__img"
        />
        <div class="footer">
          <button class="footer__like">
            <i class="fa-solid fa-heart like__icon"></i>
          </button>
          <p class="footer_LikesValue">${post.likes}</p>
        </div>`;
  }
}

export { PostElements };
