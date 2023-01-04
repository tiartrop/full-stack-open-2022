import { connect } from "react-redux";

const Notification = ({ notification }) => {
  if (notification.content === null) {
    return null;
  }
  if (notification.type === "success") {
    return <div className="success">{notification.content}</div>;
  }
  if (notification.type === "error") {
    return <div className="error">{notification.content}</div>;
  }
};

const mapStateToProps = ({ notification }) => {
  return { notification };
};

export default connect(mapStateToProps)(Notification);