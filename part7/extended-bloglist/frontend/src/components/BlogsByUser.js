import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

import { initializeUserById } from "../reducers/usersReducer";

const BlogsByUser = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(initializeUserById(id));
  }, [dispatch]);

  const user = useSelector(({ users }) => users[0]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: "#eee" }}>
            <TableRow>
              <TableCell>added blogs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.blogs.map(b => (
              <TableRow key={b.id}>
                <TableCell>{b.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BlogsByUser;