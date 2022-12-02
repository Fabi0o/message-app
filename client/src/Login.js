import Axios from "axios";
const Login = (props) => {
  const getUsers = () => {
    if (props.allUsers.length != 0) return;
    Axios.get("https://message-app-production.up.railway.app/getusers").then(
      (res) => {
        let users = [];
        res.data.forEach((user) => {
          if (users.includes(user.user)) return;
          users.push(user.user);
        });
        props.setAllUsers(users);
      }
    );
  };
  getUsers();
  const loginUser = (e) => {
    e.preventDefault();
    let name = e.target.childNodes[1].value;
    Axios.post("https://message-app-production.up.railway.app/users", {
      name: name,
    }).then((res) => {
      props.setUserMessages(res.data);
      props.setCurrentUser(name);
    });
  };
  return (
    <div className="container">
      <form onSubmit={loginUser} className="row">
        <label htmlFor="name" className="m-1 form-label">
          Name:
        </label>
        <input id="name" type="text" className="m-1 form-control" required />
        <button className="btn btn-primary m-1">Login</button>
      </form>
    </div>
  );
};

export default Login;
