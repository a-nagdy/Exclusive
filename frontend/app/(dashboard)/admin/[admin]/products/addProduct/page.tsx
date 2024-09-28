// app/add-product/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const AddProductPage = () => {
  const router = useRouter();

  const [productData, setProductData] = useState({
    name: "",
    category: "",
    description: "",
    price: 0,
    quantity: 0,
    stock: "false",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const data = await response.json();
      alert("Product added successfully!");

      // Redirect to products page
      router.push("/products");
    } catch (error) {
      setError("Error adding product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full mx-auto bg-white p-6 rounded-lg shadow-md px-5 mr-5 ">
      <h2 className="text-2xl font-semibold text-gray-800 ">Add New Product</h2>

      {error && <p className="text-red-600">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-max w-full"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Product Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-inherit text-gray-700"
            value={productData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <input
            type="text"
            name="category"
            id="category"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-inherit text-gray-700"
            value={productData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-inherit text-gray-700"
            value={productData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-inherit text-gray-700"
            value={productData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700"
          >
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-inherit text-gray-700"
            value={productData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="stock"
            className="block text-sm font-medium text-gray-700"
          >
            Stock Status
          </label>
          <select
            name="stock"
            id="stock"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-inherit text-gray-700"
            value={productData.stock}
            onChange={handleChange}
          >
            <option value="false">Out of Stock</option>
            <option value="true">In Stock</option>
          </select>
        </div>
      </form>
      <button
        type="submit"
        className={`px-4 py-2 bg-blue-600 text-white rounded-md flex justify-center items-center  ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Adding..." : "Add Product"}
      </button>
    </div>
  );
};

export default AddProductPage;
