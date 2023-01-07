import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

import { initializeUsers } from "../reducers/usersReducer";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(({ users }) => users);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  if (!users) {
    return null;
  }

  return (
    <div>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: "#eee" }}>
            <TableRow>
              <TableCell>name</TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(u => (
              <TableRow key={u.name}>
                <TableCell>
                  <Link href={`/users/${u.id}`} underline="hover">{u.name}</Link>
                </TableCell>
                <TableCell>{u.blogs?.length || ""}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;