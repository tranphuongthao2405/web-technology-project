import { Button } from "@material-ui/core";
import React from "react";
import "./Login.css";
import { auth, provider } from "../../Config/config";
import { useStateValue } from "../../Hoc/StateProvider";
import { actionTypes } from "../../Hoc/reducer";

function Login() {
  const [state, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then(async (result) => {
        const token = await auth?.currentUser?.getIdToken(true);

        if (token) {
          localStorage.setItem("@token", token);
          dispatch({
            type: actionTypes.SET_USER,
            user: result.user,
          });
        }
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="login">
      <div className="login_logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1200px-Facebook_f_logo_%282019%29.svg.png"
          alt=""
        />
        <img
          src="https://www.logo.wine/a/logo/Facebook/Facebook-Logo.wine.svg"
          alt=""
        />
      </div>
      <Button type="submit" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Login;
