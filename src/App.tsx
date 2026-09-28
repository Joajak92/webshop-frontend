import { Route, Routes } from "react-router";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import WelcomePage from "./pages/WelcomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductPage from "./pages/ProductPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<WelcomePage />}></Route>
          <Route path="/products" element={<ProductPage />}></Route>
        </Route>
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
