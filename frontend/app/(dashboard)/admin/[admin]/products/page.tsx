"use client";
import { ProductsTable } from "@/app/(dashboard)/components/ProductsTable/ProductsTable";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const [productsData, setProductsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products?limit=10&page=1`
        );
        if (!response.ok) {
          const errorData = await response.json();
          setIsError(true);
          setIsLoading(false);
          setErrorMessage(errorData.message);
          return;
        }
        const data = await response.json();
        console.log(data, "data"); // Log full response
        setIsLoading(false);
        setProductsData(data); // Set full response
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
        setErrorMessage("An error occurred while fetching product data");
      }
    };
    fetchProducts();
  }, []);

  console.log(productsData, "productsData");

  return (
    <div className="w-full h-full px-10 py-2">
      {productsData ? (
        <ProductsTable initialProducts={productsData} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductPage;
