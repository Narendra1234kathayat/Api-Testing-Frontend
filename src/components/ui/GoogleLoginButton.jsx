import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { googleApi } from "../../api/auth/googleApi";

export default function GoogleLoginButton() {

  const handleSuccess = async (response) => {
    try {
      // 🟢 Google ID Token
      const googleToken = response.credential;

      

      // 🔵 Send token to backend
      const res = await googleApi({googleToken})

      console.log("Backend response:", res);

      // 🟡 Save YOUR backend JWT
     // localStorage.setItem("token", res.data.token);

      // 🟣 Redirect user after login
      window.location.href = "/workspace";

    } catch (error) {
      console.log("Login Error:", error.response?.data || error.message);
    }
  };

  const handleError = () => {
    console.log("Google Login Failed");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap
      />
    </div>
  );
}
