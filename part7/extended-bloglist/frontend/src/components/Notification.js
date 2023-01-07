import { connect } from "react-redux";
import { Alert } from "@mui/material";

const Notification = ({ notification }) => {
  if (notification.content === null) {
    return null;
  }
  if (notification.type === "success") {
    return <Alert severity="success" style={{ marginTop: "20px" }} >{notification.content}</Alert>;
  }
  if (notification.type === "error") {
    return <Alert severity="error" style={{ marginTop: "20px" }} >{notification.content}</Alert>;
  }
};

const mapStateToProps = ({ notification }) => {
  return { notification };
};

export default connect(mapStateToProps)(Notification);