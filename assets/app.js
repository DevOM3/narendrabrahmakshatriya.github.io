function closeMenuAndGoTo(query) {
  document.querySelector("#hero-menu").classList.toggle("ft-menu--js-show");
  setTimeout(() => {
    const element = document.querySelector(query);
    window.scrollTo({
      top: element.getBoundingClientRect().top,
      behavior: "smooth",
    });
  }, 250);
}

document
  .querySelector("#hero-menu")
  .querySelectorAll("[href]")
  .forEach(function (link) {
    link.onclick = function (event) {
      event.preventDefault();
      closeMenuAndGoTo(link.getAttribute("href"));
    };
  });

const loadBlogPosts = async () => {
  const blogPosts = [];
  await db
    .collection("Blogs")
    .orderBy("timestamp")
    .get()
    .then((snapshot) =>
      snapshot.docs.forEach((doc) =>
        blogPosts.push({
          title: doc.data().title,
          image: doc.data().image,
          content: doc.data().content,
          timestamp: doc.data().timestamp,
          likes: doc.data().likes,
          comments: doc.data().comments,
        })
      )
    );

  var html = "";
  blogPosts.forEach(
    (blogPost) =>
      (html += `
      <div class="blogPost">
        <p class="timestamp">${blogPost.timestamp.toDate().toLocaleString()}</p>
        <h3 class="card-2__title title">${blogPost.title}</h3>
        <div class="image_and_content">
          <div class="image_container">
            <img src=${
              blogPost.image ? blogPost.image : "assets/imgs/logo.jpeg"
            } alt="" />
          </div>
          <p class="blog_content">
          ${blogPost.content}
          </p>
        </div>
        <p class="comment-count">Comments: ${blogPost.comments.length}</p>
      </div>`)
  );
  document.querySelector("#blog-loader").style.display = "none";
  document.querySelector("#blog_posts").innerHTML = html;
};

document.onload = loadBlogPosts();
