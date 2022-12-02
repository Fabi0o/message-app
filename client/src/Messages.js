import Axios from "axios";
import { useEffect } from "react";
import TextInput from "react-autocomplete-input";
import "react-autocomplete-input/dist/bundle.css";
const Messages = (props) => {
  const sendMessage = (e) => {
    e.preventDefault();
    const author = props.currentUser;
    const recipient = e.target.childNodes[1].value;
    const message = e.target.childNodes[3].value;
    Axios.post("http://localhost:3001/send", {
      user: recipient,
      from: author,
      message: message,
    }).then(() => {
      e.target.childNodes[1].value = "";
      e.target.childNodes[3].value = "";
    });
  };
  useEffect(() => {
    setInterval(() => {
      Axios.post("http://localhost:3001/users", {
        name: props.currentUser,
      }).then((res) => {
        props.setUserMessages(res.data);
      });
    }, 5000);
  }, []);
  return (
    <div className="container mt-3">
      <form onSubmit={sendMessage} className="row sm g-1">
        <label htmlFor="recipient" className="form-label">
          To:
        </label>
        <TextInput
          className="form-control"
          Component="input"
          trigger={""}
          options={props.allUsers}
          required
        />
        <label htmlFor="message" className="form-label">
          Message:
        </label>
        <textarea
          className="form-control"
          name="message"
          id="message"
          rows="5"
          required
        ></textarea>
        <button class="btn btn-primary">Send</button>
      </form>
      {props.userMessages.map((message) => {
        return (
          <div key={message.id}>
            <div>From: {message.from}</div>
            <div>{message.message}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
