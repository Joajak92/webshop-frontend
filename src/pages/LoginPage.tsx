import { useState } from "react";
import { login } from "../service/authService";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const formData = new FormData(event.currentTarget);
    try {
      const response = await login({
        username: String(formData.get("username")),
        password: String(formData.get("password")),
      });
      localStorage.setItem("accessToken", response.accessToken);
      navigate("/");
    } catch {
      setError("Invalid username or password.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Log in</h1>

      <label htmlFor="username">Username</label>
      <input id="username" name="username" type="email" required />

      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" required />

      <button type="submit">Log in</button>
      {error && <p role="alert">{error}</p>}
    </form>
  );
};
export default LoginPage;
