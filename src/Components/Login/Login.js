import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../Firebase/Firebase";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((err) => {
        if (
          err.message ===
          "The password is invalid or the user does not have a password."
        ) {
          alert("Please fill out all the fields");
        } else if (
          err.message ===
          "There is no user record corresponding to this identifier. The user may have been deleted."
        ) {
          history.push("/register");
          window.scrollTo({
            top: document.body.scrollHeight,
            left: 0,
            behavior: "smooth",
          });
        } else {
          alert(err.message);
        }
      });
  };

  return (
    <div className="login">
      <img
        src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
        alt="logo"
        className="login__logo"
      />
      <div className="login__container">
        <h3>Log in to Facebook</h3>
        <form>
          <center>
            <input
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </center>
          <center>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </center>
          <center>
            <button type="submit" className="login__button" onClick={onLogin}>
              Log In
            </button>
          </center>
          <center>
            <div className="related__info">
              <h5>Forgotten Password?</h5>
              <h5 className="separate">·</h5>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <h5 className="sign__up">Sign up for Facebook</h5>
              </Link>
            </div>
          </center>
        </form>
      </div>
    </div>
  );
}

export default Login;
