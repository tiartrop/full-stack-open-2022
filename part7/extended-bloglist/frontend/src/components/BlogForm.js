import { useDispatch } from "react-redux";
import { useField } from "../hooks.js";
import { createBlog } from "../reducers/blogReducer.js";

const BlogForm = ({ togglableRef }) => {
  const dispatch = useDispatch();
  const { reset: resetNewTitle, ...newTitle } = useField("text");
  const { reset: resetNewAuthor, ...newAuthor } = useField("text");
  const { reset: resetNewUrl, ...newUrl } = useField("text");

  const addBlog = event => {
    event.preventDefault();
    togglableRef.current.toggleVisibility();
    dispatch(
      createBlog({
        title: newTitle.value,
        author: newAuthor.value,
        url: newUrl.value
      })
    );

    handleReset();
  };

  const handleReset = () => {
    resetNewTitle();
    resetNewAuthor();
    resetNewUrl();
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        <span>title:</span>
        <input id="title-input" {...newTitle} placeholder="write here blog title" />
      </div>
      <div>
        <span>author:</span>
        <input id="author-input" {...newAuthor} placeholder="write here blog author" />
      </div>
      <div>
        <span>url:</span>
        <input id="url-input" {...newUrl} placeholder="write here blog url" />
      </div>
      <button id="create-button" type="submit">
        create
      </button>
      <button type="reset" onClick={handleReset}>
        reset
      </button>
    </form>
  );
};

export default BlogForm;
