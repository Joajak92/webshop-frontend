import type { ProductRequest } from "../types/ProductRequest";

type ProductFormProps = {
  onSubmit: (product: ProductRequest) => Promise<void> | void;
};

const ProductForm = ({ onSubmit }: ProductFormProps) => {
  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    await onSubmit({
      name: String(formData.get("name")),
      description: String(formData.get("description")),
      price: Number(formData.get("price")),
      stock: Number(formData.get("stock")),
    });
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
export default ProductForm;
