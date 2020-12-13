import React, { useState } from "react";
import "./Register.css";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, db } from "../../Firebase/Firebase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getYear } from "date-fns";

function Register() {
  const history = useHistory();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [birthday, setBirthday] = useState(new Date());
  const [gender, setGender] = useState();

  console.log(gender);

  const register = (event) => {
    event.preventDefault();
    if (getYear(birthday) >= 2007) {
      return alert(
        "You are not old enough to register to Facebook. You must be equal or greater than 13 years old."
      );
    }

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !birthday ||
      !gender
    ) {
      alert("You have to fill out all the fields to register an account!");
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth.user) {
          auth.user
            .updateProfile({
              displayName: firstName + " " + lastName,
              photoURL:
                "https://i.ibb.co/1zmBtwr/84241059-189132118950875-4138507100605120512-n.jpg",
            })
            .then((response) => {
              db.collection("users")
                .doc(auth.user.uid)
                .set({
                  uid: auth.user.uid,
                  displayName: auth.user.displayName,
                  email: auth.user.email,
                  photoURL:
                    "https://i.ibb.co/1zmBtwr/84241059-189132118950875-4138507100605120512-n.jpg",
                  birthday,
                  gender,
                  bio: "",
                })
                .then((res) => {
                  history.push("/login");
                });
            });
        }
      })
      .catch((e) => {
        if (
          e.message ===
          "The password is invalid or the user does not have a password."
        ) {
          alert("Please check out all the fields again");
        } else if (
          e.message ===
          "There is no user record corresponding to this identifier. The user may have been deleted."
        ) {
          history.push("/register");
          window.scrollTo({
            top: document.body.scrollHeight,
            left: 0,
            behavior: "smooth",
          });
        }
      });
  };

  return (
    <div className="register">
      <img
        src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
        alt="logo"
        className="register__logo"
      />
      <div className="register__container">
        <h1>Sign Up</h1>
        <p>Connect to your friends on social network today</p>
        <div className="register__form">
          <form>
            <div className="register__input">
              <input
                onChange={(e) => setFirstName(e.target.value)}
                className="register__firstname"
                type="name"
                placeholder="First Name"
                required
              />
              <input
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                className="register__lastname"
                type="name"
                placeholder="Last Name"
                required
              />
            </div>

            <center>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email address"
                required
              />
            </center>

            <center>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                required
              />
            </center>

            <h5 className="register__date">Date of birth</h5>
            <div className="register__input__date">
              <DatePicker
                selected={birthday}
                onChange={(date) => setBirthday(date)}
              />
            </div>

            <h5 className="register__gender">Gender</h5>
            <div className="register__radio__container">
              <div className="gender__info">
                <label>Female</label>
                <input
                  onChange={(e) => setGender(e.target.value)}
                  type="radio"
                  name="gender"
                  value="Female"
                  required
                />
              </div>
              <div className="gender__info">
                <label>Male</label>
                <input
                  onChange={(e) => setGender(e.target.value)}
                  type="radio"
                  name="gender"
                  value="Male"
                  required
                />
              </div>
              <div className="gender__info">
                <label>Other</label>
                <input
                  onChange={(e) => setGender(e.target.value)}
                  type="radio"
                  name="gender"
                  value="Other"
                  required
                />
              </div>
            </div>
            <p className="register__policy">
              By clicking Sign Up, you agree to our{" "}
              <span>Terms, Data Policy</span> and <span>Cookie Policy</span>.
            </p>

            <center>
              <button
                onClick={register}
                type="submit"
                className="register__button"
              >
                Sign Up
              </button>
            </center>
            <Link to="/login">
              <p className="register__login">Already have an account?</p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
