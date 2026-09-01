import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn,} from "react-icons/fi";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (email === "admin@sweetbite.com" && password === "sweetbite123") {
      localStorage.setItem(
        "sweetbiteUser",
        JSON.stringify({
          name: "SweetBite Admin",
          email: email,
          isLoggedIn: true,
        })
      );

      navigate("/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-background-shape shape-one"></div>
      <div className="login-background-shape shape-two"></div>

      <div className="login-card glass-card">
        <div className="login-logo">
          <div className="logo-icon">🧁</div>

          <h1>SweetBite</h1>

          <p>Bakery Management Panel</p>
        </div>

        <div className="login-heading">
          <h2>Welcome Back!</h2>
          <p>Sign in to manage your delicious products.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email Address</label>

            <div className="input-wrapper">
              <FiMail className="input-icon" />
            <input type="email" placeholder="admin@sweetbite.com" value={email} onChange={(event) => setEmail(event.target.value)}/>
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>

            <div className="input-wrapper">
              <FiLock className="input-icon" />

              <input type={showPassword ? "text" : "password"}placeholder="Enter your password" value={password} onChange={(event) =>setPassword(event.target.value)}/>

              <button type="button" className="password-toggle" onClick={() =>setShowPassword(!showPassword)}>
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <button type="submit" className="login-button">
            <FiLogIn />
            Sign In
          </button>
        </form>

        
      </div>
    </div>
  );
}
export default Login;
