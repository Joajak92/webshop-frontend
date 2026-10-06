import { useEffect, useState } from "react";
import type { ProductResponse } from "../types/ProductResponse";
import { getProducts } from "../service/productService";
import { getPermissions, isAuthenticated } from "../service/authService";
import { Navigate } from "react-router";
import AdminProductCard from "../components/AdminProductCard";
import { useCategoryFilter } from "../hooks/useCategoryFilter";
import CategoryFilter from "../components/CategoryFilter";

const AdminPage = () => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  const {categories, selectedCategory, setSelectedCategory, filteredProducts} =
  useCategoryFilter(products);

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

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        alert(error);
      }
    }
    if (isAdmin) {
      loadProducts();
    }
  }, [isAdmin]);

  if (isAdmin === null) return <div>Loading...</div>;
  if (!isAdmin) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-white text-black">
      <section className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-12 text-center sm:px-8 sm:py-16">
        <h1 className="text-3xl font-light tracking-tight sm:text-4xl lg:text-5xl">
          Adminsida
        </h1>

        <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onChange={setSelectedCategory}
        />

        <div className="mt-6 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <AdminProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminPage;
