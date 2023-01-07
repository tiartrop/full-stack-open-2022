import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";

import { initializeBlogs } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
  return (
    <TableRow key={blog.id}>
      <TableCell>
        <Link href={`/blogs/${blog.id}`} underline="hover">{blog.title}</Link>
      </TableCell>
      <TableCell align="right">{blog.author}</TableCell>
    </TableRow>
  );
};

Blog.prototype = {
  blog: PropTypes.array.isRequired
};

const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(({ blogs }) => blogs);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14
    }
  }));

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell align="right">Author</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Blogs;