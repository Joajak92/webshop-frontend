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
import NotFound from "./pages/NotFound";
import ProductDetailPage from "./pages/ProductDetailPage";
import { useEffect, useState } from "react";
import type { CartItem, Product } from "./types/Product-cart";
import { createOrder } from "./service/orderService";
import type { LoginRequest } from "./types/LoginRequest";
import { getSession, login, logout } from "./service/authService";
import type { User } from "./types/LoginResponse";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = sessionStorage.getItem("cart");
    if (savedCart) {
      return JSON.parse(savedCart);
    }
    return [];
  });

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  async function handleLogin(credentials: LoginRequest) {
    const loggedInUser = await login(credentials);
    setUser(loggedInUser);
  }

  function addToCart(product: Product) {
    const index = cartItems.findIndex((item) => item.id === product.id);

    if (index === -1) {
      const newItem = { ...product, quantity: 1 };
      setCartItems([...cartItems, newItem]);
      return;
    }

    const currentItem = cartItems[index];

    if (currentItem.quantity >= currentItem.stock) {
      alert("Det finns inte fler produkter i lager");
      return;
    }

    const updatedItems = [...cartItems];

    updatedItems[index] = {
      ...currentItem,
      quantity: currentItem.quantity + 1,
    };

    setCartItems(updatedItems);
  }

  function increaseQuantity(productId: number) {
    const index = cartItems.findIndex((item) => item.id === productId);

    const currentItem = cartItems[index];

    if (currentItem.quantity >= currentItem.stock) {
      alert("Det finns inte fler produkter i lager");
      return;
    }

    const updatedItems = [...cartItems];

    updatedItems[index] = {
      ...currentItem,
      quantity: currentItem.quantity + 1,
    };
    setCartItems(updatedItems);
  }

  function decreaseQuantity(productId: number) {
    const index = cartItems.findIndex((item) => item.id === productId);

    const currentItem = cartItems[index];
    const updatedItems = [...cartItems];

    if (currentItem.quantity === 1) {
      updatedItems.splice(index, 1);
      setCartItems(updatedItems);
      return;
    }

    updatedItems[index] = {
      ...currentItem,
      quantity: currentItem.quantity - 1,
    };

    setCartItems(updatedItems);
  }

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Kundvagnen är tom");
      return;
    }
    const orderRequest = {
      items: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      await createOrder(orderRequest);
      setCartItems([]);
      sessionStorage.removeItem("cart");
      alert("Ordern har skapats.");
    } catch {
      alert("Något gick fel när ordern skulle skapas");
    }
  };

  useEffect(() => {
    let isMounted = true;
    async function restoreSession() {
      try {
        const sessionUser = await getSession();
        if (isMounted) {
          setUser(sessionUser);
        }
      } catch (error) {
        console.error("Message: ", error);
        if (isMounted) setUser(null);
      } finally {
        if (isMounted) setCheckingSession(false);
      }
    }
    restoreSession();
    return () => {
      isMounted = false;
    };
  }, []);

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed ", error);
    } finally {
      setUser(null);
    }
  }

  if (checkingSession) {
    return <p>Kontrollerar inloggning...</p>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header user={user} onLogout={handleLogout}></Header>
      <main className="flex-1">
        <Routes>
          <Route
            path="/login"
            element={<LoginPage onLogin={handleLogin} />}
          ></Route>

          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/" element={<WelcomePage user={user} />}></Route>
            <Route
              path="/products"
              element={
                <ProductPage
                  addToCart={addToCart}
                  onIncrease={increaseQuantity}
                  onDecrease={decreaseQuantity}
                  onCheckout={handleCheckout}
                  cartItems={cartItems}
                />
              }
            ></Route>
            <Route path="/admin" element={<AdminPage user={user} />}></Route>
            <Route
              path="/admin/add-product"
              element={<AddProductPage user={user} />}
            ></Route>
            <Route
              path="/products/:id"
              element={<ProductDetailPage addToCart={addToCart} />}
            ></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Route>
        </Routes>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
