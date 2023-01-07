import { useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";

import { Button } from "@mui/material";

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none", position: "relative" };
  const cancelStyle = { position: "absolute", right: "0", bottom: "0px" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    };
  });

  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={hideWhenVisible}>
        <Button variant="contained" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility} style={cancelStyle}>
          cancel
        </Button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
};

Togglable.displayName = "Togglable";

export default Togglable;