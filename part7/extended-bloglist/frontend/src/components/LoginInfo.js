import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppBar, Button, Toolbar } from "@mui/material";

import { userLogout } from "../reducers/loginReducer";

const LoginInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ login }) => login);
  const navigate = useNavigate();

  const handelLogout = () => {
    dispatch(userLogout(user));
    navigate("/");
  };

  return (
    <AppBar position="static" style={{ background: "#ddd" }}>
      <Toolbar>
        <Button onClick={() => navigate("/")}>blogs</Button>
        <Button onClick={() => navigate("/users")}>users</Button>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
          <span style={{ color: "#333", marginRight: "10px" }}>{user.name} logged in</span>
          <Button onClick={handelLogout}>logout</Button>
        </div>
        <br />
      </Toolbar>
    </AppBar>
  );
};

export default LoginInfo;