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

function App() {
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

  return (
    <div className="flex min-h-screen flex-col">
      <Header></Header>
      <main className="flex-1">
        <Routes>
          <Route path="/login" element={<LoginPage />}></Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<WelcomePage />}></Route>
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
            <Route path="/admin" element={<AdminPage />}></Route>
            <Route
              path="/admin/add-product"
              element={<AddProductPage />}
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
