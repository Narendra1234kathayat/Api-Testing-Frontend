import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function GoogleLoginButton() {

  const handleSuccess = async (response) => {
    try {
      // 🟢 Google ID Token
      const googleToken = response.credential;

      console.log("Google Token:", googleToken);

      // 🔵 Send token to backend
      const res = await axios.post(
        "http://localhost:5000/api/auth/google",
        { googleToken }
      );

      console.log("Backend response:", res.data);

      // 🟡 Save YOUR backend JWT
      localStorage.setItem("token", res.data.token);

      // 🟣 Redirect user after login
      window.location.href = "/dashboard";

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
