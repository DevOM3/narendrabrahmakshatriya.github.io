const post = async () => {
  const image = document.querySelector("#blog-image");
  const title = document.querySelector("#blog-title").value.trim();
  const content = document.querySelector("#blog-content").value.trim();
  const button = document.querySelector("button");

  if (title.length < 2) {
    alert("Title must be at least 3 characters long ");
  } else if (content.length < 10) {
    alert("Blog Content must be at least 10 characters long ");
  } else {
    button.disabled = true;

    var blog_image = false;
    if ("files" in image) {
      if (!image.files.length == 0) {
        blog_image = true;
      }
    }

    var url = "";
    if (blog_image) {
      const storageRef = await storage.ref(
        `${image.files[0].name}-${new Date()}`
      );
      await storageRef.put(image.files[0]);
      url = await storageRef.getDownloadURL();
    }

    await db.collection("Blogs").add({
      title: title,
      image: url,
      content: content,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      likes: 0,
      comments: [],
    });
    button.disabled = false;
    alert("Blog post added!");
    location.reload();
  }
};
