import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

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
      <h4>added blogs</h4>
      <ul>
        {user.blogs.map((b, i) => (
          <li key={i}>{b.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlogsByUser;
