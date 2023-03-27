import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import React,{useContext} from "react";
import { toast } from "react-hot-toast";
import { useNavigate,  } from "react-router-dom";
import Footer from "../components/footer";
import Header from "../components/header";
import { DataContext } from "../controller/state";
import "../styles/login.css";

export default function Login() {
  const { state, dispatch } = useContext(DataContext)
  const navigate=useNavigate()
  function signin(payload) {
    dispatch({ type: 'login', payload })
navigate(-1)
  }
  return (
    <>
      <GoogleOAuthProvider
        clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
        onScriptLoadError={(e) => {
        //   console.log("error loading google script");
        //   toast.error("error loading google script");
        }}
      >
        <Header type="custom" />
        <div className="login-page">
          <h1>Signin</h1>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(jwtDecode(credentialResponse.credential));
              signin(jwtDecode(credentialResponse.credential))
              toast.success("Login sucessful");

            }}
            onError={() => {
              console.log("Login Failed");
              toast.error("login failed");
            }}
                      useOneTap
                      size="large"
                      auto_select
                      theme="filled_blue"
                      width="300"
          />
        </div>
        <Footer />
      </GoogleOAuthProvider>
    </>
  );
}
