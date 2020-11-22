import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import { auth } from "./Firebase/Firebase";
import Header from "./Components/Header/Header";
import LeftSidebar from "./Components/Sidebar/LeftSidebar";
import RightSidebar from "./Components/Sidebar/RightSidebar";
import Posts from "./Components/Posts/Posts";
import Profile from "./Components/Profile/Profile";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(false);
      }
    });
  }, []);

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/register">
            <Register />
          </Route>

          <Route exact path="/:username/:uid">
            <Header user={user} />
            <Profile user={user} />
          </Route>

          <Route path="/">
            <Header user={user} selected />
            <div className="app__mainpage">
              <LeftSidebar user={user} />
              <div className="app__posts">
                <Posts user={user} />
              </div>
              <RightSidebar user={user} />
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
