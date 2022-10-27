const Notification = ({ message }) => {
  if (message.content === null) {
    return null;
  }
  if (message.type === "success") {
    return <div className="success">{message.content}</div>;
  }
  if (message.type === "error") {
    return <div className="error">{message.content}</div>;
  }
};

export default Notification;
