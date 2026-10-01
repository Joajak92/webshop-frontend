import { getPermissions, isAuthenticated } from "../service/authService";
import { Navigate, useNavigate } from "react-router";
import { addProduct } from "../service/productService";
import ProductForm from "../components/ProductForm";
import type { ProductRequest } from "../types/ProductRequest";
import { useEffect, useState } from "react";

const AddProductPage = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function verifyAdmin() {
      try {
        if (!isAuthenticated()) {
          setIsAdmin(false);
          return;
        }
        const roles = await getPermissions();
        const parsedRoles: string[] = JSON.parse(roles);
        setIsAdmin(Object.values(parsedRoles).includes("ROLE_ADMIN"));
      } catch (error) {
        console.log(error);
        setIsAdmin(false);
      }
    }
    verifyAdmin();
  }, []);

  if (isAdmin === null) return <div>Loading...</div>;
  if (!isAdmin) return <Navigate to="/" replace />;

  async function handleAddProduct(product: ProductRequest) {
    try {
      await addProduct(product);
      navigate("/products");
    } catch (error) {
      console.error("Produkten kunde inte läggas till i lagret", error);
    }
  }
  return (
    <div>
      <ProductForm onSubmit={handleAddProduct} />
    </div>
  );
};

export default AddProductPage;
