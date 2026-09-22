import { Route, Routes } from "react-router";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import WelcomePage from "./pages/WelcomePage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<WelcomePage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
