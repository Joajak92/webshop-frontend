import React, { useEffect, useState } from "react";
import { getPermissions, isAuthenticated } from "../service/authService";
import { Navigate, useNavigate } from "react-router";
import { addProduct } from "../service/productService";

const AddProductPage = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [error, setError] = useState("");
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

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const formData = new FormData(event.currentTarget);

    try {
      const response = await addProduct({
        name: String(formData.get("name")),
        description: String(formData.get("description")),
        price: Number(formData.get("price")),
        stock: Number(formData.get("stock")),
      });

      console.log(response);
      navigate("/products");
    } catch (error) {
      setError("Produkten kunde inte skapas eller läggas till i lagret.");
      console.log(error);
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-slate-600 text-white mx-5 border-6 border-black rounded p-5 my-10 items-center self-center"
      >
        <h1 className="text-3xl font-bold uppercase">Lägg till produkt</h1>

        <div className="my-2">
          <div>
            <label htmlFor="name" className="text-white">
              Produktnamn
            </label>
          </div>
          <input
            id="name"
            name="name"
            required
            className="bg-white p-2 sm:p-2 text-black"
          />
        </div>

        <div className="my-5">
          <div>
            <label htmlFor="description" className="text-white">
              Produktbeskrivning
            </label>
          </div>
          <textarea
            id="description"
            name="description"
            required
            className="bg-white text-black p-2"
          />
        </div>

        <div className="my-5">
          <div>
            <label htmlFor="price" className="text-white">
              Pris (SEK)
            </label>
          </div>
          <input
            id="price"
            name="price"
            type="number"
            required
            className="bg-white text-black p-2"
          />
        </div>

        <div className="my-5">
          <div>
            <label htmlFor="stock" className="text-white">
              Lagersaldo
            </label>
          </div>
          <input
            id="stock"
            name="stock"
            type="number"
            required
            className="bg-white text-black p-2"
          />
        </div>

        <div>
          <button
            type="submit"
            className="bg-slate-500 p-1 uppercase border-2 text-white"
          >
            Lägg till
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
