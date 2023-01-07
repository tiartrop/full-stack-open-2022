import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from "@mui/icons-material/Delete";

import { useField } from "../hooks.js";
import { initializeBlogById, deleteBlog, likeBlog, createComment } from "../reducers/blogReducer";

const Comment = ({ blog, blogId }) => {
  const dispatch = useDispatch();
  const { reset: resetComment, ...comment } = useField("text");

  const addComment = () => {
    dispatch(createComment(comment.value, blogId));
    resetComment();
  };

  return (
    <div>
      <h4>comments</h4>
      <Stack direction="row" spacing={2} mb={3} width={"100%"}>
        <TextField id="comment" name="Comment" {...comment} size="small" style={{ width: "75%" }} />
        <Button id="comment-button" onClick={addComment} variant="outlined" size="small" style={{ width: "25%" }}>
          add comment
        </Button>
      </Stack>
      {blog.comments && (
        <List dense={true}>
          {blog.comments.map((c, i) => (
            <div key={i}>
              <ListItem>
                <ListItemIcon>
                  <CommentIcon />
                </ListItemIcon>
                <ListItemText primary={c.content} />
              </ListItem>
              <Divider sx={i === blog.comments.length - 1 ? { display: "none" } : {}} />
            </div>
          ))}
        </List>
      )}
    </div>
  );
};

const BlogInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(initializeBlogById(id));
  }, [dispatch]);

  const blog = useSelector(({ blogs }) => blogs[0]);
  const user = useSelector(({ login }) => login);

  const addLikes = () => {
    dispatch(likeBlog(blog));
  };

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id));
      navigate("/");
    }
  };

  if (!blog) {
    return null;
  }

  return (
    <div id="blog-content" style={{ marginTop: "30px" }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" mb={1.5} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
            {blog.title} {blog.author}
            {user.name === blog.user.name && (
              <IconButton aria-label="delete" onClick={removeBlog} size="small">
                <DeleteIcon />
              </IconButton>
            )}
          </Typography>
          <Typography variant="body2">
            <Link href={blog.url}>{blog.url}</Link>
          </Typography>
          <Typography variant="body2" display={"flex"} alignItems={"center"}>
            <span>like {blog.likes}</span>
            <IconButton id="like-button" aria-label="like" size="small" onClick={addLikes}>
              <FavoriteBorderIcon fontSize="inherit" />
            </IconButton>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            added by {blog.user.name}
          </Typography>
        </CardContent>
      </Card>
      <Comment blog={blog} blogId={id} />
    </div>
  );
};

export default BlogInfo;