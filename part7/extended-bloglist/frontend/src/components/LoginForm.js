import { useDispatch } from "react-redux";
import { Button, Stack, TextField } from "@mui/material";

import { useField } from "../hooks.js";
import { userLogin } from "../reducers/loginReducer.js";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { reset: resetUsername, ...username } = useField("text");
  const { reset: resetPassword, ...password } = useField("password");

  const handleLogin = async event => {
    event.preventDefault();
    const user = {
      username: username.value,
      password: password.value
    };
    dispatch(userLogin(user));

    resetUsername();
    resetPassword();
  };

  return (
    <Stack width={{ xs: 320, sm: 400, md: 500 }} mx={"auto"}>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <Stack spacing={{ xs: 1, md: 2 }} mb={2}>
          <TextField {...username} label="username" size="small" />
          <TextField type="password" {...password} label="password" size="small" />
          <Button variant="contained" id="login-button" type="submit">
            login
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default LoginForm;