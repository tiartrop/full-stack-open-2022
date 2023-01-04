import { useDispatch } from "react-redux";

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
    <form onSubmit={handleLogin}>
      <div>
        username
        <input id="username" name="Username" {...username} />
      </div>
      <div>
        password
        <input id="password" type="password" name="Password" {...password} />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  );
};

export default LoginForm;
