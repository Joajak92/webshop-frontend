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
    <form
      onSubmit={handleSubmit}
      className="bg-slate-600 text-white mx-5 border-6 border-black rounded p-5 my-10 items-center self-center"
    >
      <h1 className="text-3xl font-bold uppercase">Log in</h1>

      <div className="my-2">
        <div>
          <label htmlFor="username" className="text-white">
            Username
          </label>
        </div>
        <input
          id="username"
          name="username"
          type="email"
          required
          className="bg-white p-2 sm:w-full sm:p-2 text-black"
        />
      </div>

      <div className="my-5">
        <div>
          <label htmlFor="password" className="text-white">
            Password
          </label>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="bg-white text-black p-2 sm:w-full"
        />
      </div>

      <div>
        <button
          type="submit"
          className="bg-slate-500 p-1 uppercase border-2 text-white"
        >
          Log in
        </button>
      </div>
      {error && <p role="alert">{error}</p>}
    </form>
  );
};
export default LoginPage;
