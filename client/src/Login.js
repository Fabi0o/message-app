import Axios from "axios";
const Login = (props) => {
  const getUsers = () => {
    if (props.allUsers.length != 0) return;
    Axios.get("http://localhost:3001/getusers").then((res) => {
      let users = [];
      res.data.forEach((user) => {
        if (users.includes(user.user)) return;
        users.push(user.user);
      });
      props.setAllUsers(users);
    });
  };
  getUsers();
  const loginUser = (e) => {
    e.preventDefault();
    let name = e.target.childNodes[1].value;
    Axios.post("http://localhost:3001/users", { name: name }).then((res) => {
      props.setUserMessages(res.data);
      props.setCurrentUser(name);
    });
  };
  return (
    <form onSubmit={loginUser}>
      <label htmlFor="name">Name:</label>
      <input id="name" type="text" required />
      <button>Login</button>
    </form>
  );
};

export default Login;
