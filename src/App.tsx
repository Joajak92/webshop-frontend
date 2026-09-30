import { Route, Routes } from "react-router";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import WelcomePage from "./pages/WelcomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductPage from "./pages/ProductPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdminPage from "./pages/AdminPage";
import AddProductPage from "./pages/AddProductPage";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header></Header>
      <main className="flex-1">
        <Routes>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<WelcomePage />}></Route>
            <Route path="/products" element={<ProductPage />}></Route>
            <Route path="/admin" element={<AdminPage />}></Route>
            <Route path="/admin/add-product" element={<AddProductPage />}></Route>
          </Route>
        </Routes>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
