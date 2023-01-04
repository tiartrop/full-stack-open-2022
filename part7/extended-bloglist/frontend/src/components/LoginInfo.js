import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { userLogout } from "../reducers/loginReducer";

const LoginInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ login }) => login);
  const navigate = useNavigate();

  const handelLogout = () => {
    dispatch(userLogout(user));
    navigate("/");
  };

  const menuStyle = {
    position: "sticky",
    top: "20px",
    padding: "0 5px",
    width: "320px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  };

  return (
    <div style={{ background: "#e4e4e4" }}>
      <div style={menuStyle}>
        <Link to="/">blogs</Link>
        <Link to="/users">users</Link>
        <span>{user.name} logged in</span>
        <button onClick={handelLogout}>logout</button>
        <br />
      </div>
    </div>
  );
};

export default LoginInfo;