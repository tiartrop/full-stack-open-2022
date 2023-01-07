import { useDispatch } from "react-redux";
import { Button, Stack, TextField } from "@mui/material";

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
      <Stack spacing={{ xs: 1, md: 2 }} mb={2}>
        <TextField {...newTitle} label="title" size="small" />
        <TextField {...newAuthor} label="author" size="small" />
        <TextField {...newUrl} label="url" size="small" />
      </Stack>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" id="create-button" type="submit">
          create
        </Button>
        <Button variant="outlined" type="reset" onClick={handleReset}>
          reset
        </Button>
      </Stack>
    </form>
  );
};

export default BlogForm;