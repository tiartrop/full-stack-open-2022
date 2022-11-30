import { useState } from "react";

const NoteForm = ({ createBlog }) => {
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
          value={newTitle}
          onChange={({ target }) => setNewTitle(target.value)}
        />
      </div>
      <div>
        <span>author:</span>
        <input
          value={newAuthor}
          onChange={({ target }) => setNewAuthor(target.value)}
        />
      </div>
      <div>
        <span>url:</span>
        <input
          value={newUrl}
          onChange={({ target }) => setNewUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default NoteForm;