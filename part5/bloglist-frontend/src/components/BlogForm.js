import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });

    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        <span>title:</span>
        <input
          id="title-input"
          value={newTitle}
          onChange={({ target }) => setNewTitle(target.value)}
          placeholder="write here blog title"
        />
      </div>
      <div>
        <span>author:</span>
        <input
          id="author-input"
          value={newAuthor}
          onChange={({ target }) => setNewAuthor(target.value)}
          placeholder="write here blog author"
        />
      </div>
      <div>
        <span>url:</span>
        <input
          id="url-input"
          value={newUrl}
          onChange={({ target }) => setNewUrl(target.value)}
          placeholder="write here blog url"
        />
      </div>
      <button id="create-button" type="submit">create</button>
    </form>
  );
};

export default BlogForm;