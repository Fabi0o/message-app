import "./App.css";
import Login from "./Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import Messages from "./Messages";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
function App() {
  const [allUsers, setAllUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [userMessages, setUserMessages] = useState([]);
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            {currentUser ? (
              <Messages
                userMessages={userMessages}
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
                setUserMessages={setUserMessages}
                allUsers={allUsers}
              />
            ) : (
              <Login
                setCurrentUser={setCurrentUser}
                setUserMessages={setUserMessages}
                setAllUsers={setAllUsers}
                allUsers={allUsers}
              />
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
