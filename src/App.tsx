import { Route, Routes } from "react-router";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import WelcomePage from "./pages/WelcomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <>
    <Routes>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<WelcomePage />}></Route>
        <Route path="/products" element={<ProductPage />}></Route>
      </Route>
    </Routes>
    </>
  );
}

export default App;
