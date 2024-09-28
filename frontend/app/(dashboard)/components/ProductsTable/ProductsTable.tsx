import { useEffect, useState } from "react";

// Define a type for the product
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: string;
  quantity: number;
  createdAt: string;
}

interface ProductsTableProps {
  initialProducts: {
    products: {
      products: Product[];
      lastPage: boolean;
      message: string;
      productsLength: number;
    };
  };
}

export function ProductsTable({ initialProducts }: ProductsTableProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (initialProducts && initialProducts.products) {
      // Accessing the nested products array
      setProducts(initialProducts.products);
    }
  }, [initialProducts]);

  const handleDelete = (id: string) => {
    setProducts(products.filter((product) => product._id !== id));
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          Products Dashboard
        </h1>
        <a
          href="products/addProduct"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Add Product
        </a>
      </header>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className=" text-white uppercase text-sm leading-normal">
            <th className="py-3 px-6">Name</th>
            <th className="py-3 px-6">Price</th>
            <th className="py-3 px-6">Quantity</th>
            <th className="py-3 px-6">Created At</th>
            <th className="py-3 px-6">Status</th>
            <th className="py-3 px-6">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {products.length > 0 ? (
            products.map((product) => (
              <tr
                key={product._id}
                className="border-b border-gray-200 hover:bg-gray-100 text-center"
              >
                <td className="py-3 px-6">{product.name}</td>
                <td className="py-3 px-6">${product.price.toFixed(2)}</td>
                <td className="py-3 px-6">{product.quantity}</td>
                <td className="py-3 px-6">
                  {new Date(product.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-6 w-1/6">
                  <span
                    className={`${
                      product.quantity >= 10
                        ? "bg-green-500"
                        : product.quantity >= 3
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    } text-white px-3 py-1 rounded`}
                  >
                    {product.quantity >= 10
                      ? "In Stock"
                      : product.quantity >= 3
                        ? "Almost Out of Stock"
                        : "Out of Stock"}
                  </span>
                </td>
                <td className="py-3 px-6">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                    onClick={() => alert(`Edit ${product.name}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition ml-2"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-3">
                No products available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
