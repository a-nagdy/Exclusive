"use client";

import { useState } from "react";

const AddProductDetailsForm = () => {
  const [productData, setProductData] = useState<{
    productName: string;
    description: string;
    category: string;
    brandName: string;
    sku: string;
    inStock: boolean;
    quantity: number;
    regularPrice: number;
    salePrice: number;
    tags: string[];
    galleryImages: string[];
    mainImage: string;
  }>({
    productName: "",
    description: "",
    category: "",
    brandName: "",
    sku: "",
    inStock: false,
    quantity: 0,
    regularPrice: 0,
    salePrice: 0,
    tags: ["Lorem", "Lorem", "Lorem"],
    galleryImages: [] as string[],
    mainImage: "",
  });

  const PostProduct = async () => {
    const formData = new FormData();

    // Append product data to formData
    formData.append("name", productData.productName);
    formData.append("description", productData.description);
    formData.append("price", productData.regularPrice);
    formData.append("category", productData.category);
    formData.append("quantity", productData.quantity);

    const mainImageFile = await fetch(productData.mainImage).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch main image");
      }
      return res.blob();
    });

    console.log("Main Image Blob:", mainImageFile);
    // Append main image
    formData.append(
      "photo",
      mainImageFile,
      productData.mainImage.split("/").pop()
    );

    // Append gallery images
    for (const image of productData.galleryImages) {
      const imageFile = await fetch(image).then((res) => res.blob());
      // Append gallery images (change this line)
      formData.append("galleryImages", imageFile, image.split("/").pop());
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/add-product`,
        {
          method: "POST",
          body: formData, // Use formData as the request body
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error details:", errorData); // Log the error for better understanding
        return; // Exit the function if there is an error
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Network error:", error); // Log any network errors
    }
  };

  const inputFields = [
    { label: "Product Name", name: "productName", type: "text" },
    { label: "Description", name: "description", type: "textarea" },
    { label: "Category", name: "category", type: "text" },
    { label: "Brand Name", name: "brandName", type: "text" },
    { label: "SKU", name: "sku", type: "text" },
    { label: "Quantity", name: "quantity", type: "number" },
    { label: "Regular Price", name: "regularPrice", type: "number" },
    { label: "Sale Price", name: "salePrice", type: "number" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    // Use type guards to determine if the input is a checkbox
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setProductData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setProductData((prev) => ({
        ...prev,
        galleryImages: [...prev.galleryImages, ...newImages],
      }));
    }
  };

  const handleMainImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files[0]) {
      const mainImageURL = URL.createObjectURL(files[0]);
      setProductData((prev) => ({ ...prev, mainImage: mainImageURL }));
    }
  };

  const handleDeleteImage = (index: number) => {
    setProductData((prev) => {
      const updatedGalleryImages = [...prev.galleryImages];
      updatedGalleryImages.splice(index, 1);
      return { ...prev, galleryImages: updatedGalleryImages };
    });
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setProductData((prev) => ({
        ...prev,
        galleryImages: [...prev.galleryImages, ...newImages],
      }));
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const tagsArray = value.split(" ").filter((tag) => tag); // Split tags by space and remove empty entries
    setProductData({ ...productData, tags: tagsArray });
  };
  console.log(productData);
  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-md mr-3">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Add Product</h2>
        <div className="flex space-x-4 mt-6">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-md"
            onClick={PostProduct}
          >
            Save
          </button>
          <button className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md">
            Cancel
          </button>
        </div>
      </div>
      <form className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Section */}
        <div className="space-y-4">
          {inputFields.map((field) =>
            field.type === "textarea" ? (
              <TextareaField
                key={field.name}
                label={field.label}
                name={field.name}
                value={productData[field.name]}
                onChange={handleInputChange}
              />
            ) : (
              <InputField
                key={field.name}
                label={field.label}
                name={field.name}
                type={field.type}
                value={productData[field.name]}
                onChange={handleInputChange}
              />
            )
          )}
          <div>
            <CheckboxField
              label="In Stock"
              name="inStock"
              checked={productData.inStock} // Assume you have this in your productData state
              onChange={(e) =>
                setProductData({ ...productData, inStock: e.target.checked })
              }
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tags
            </label>
            <div className="flex space-x-2 mt-1">
              {productData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-200 text-sm px-3 py-1 rounded-full text-gray-800"
                >
                  {tag}
                </span>
              ))}
            </div>
            <input
              type="text"
              onChange={handleTagChange}
              className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm text-black"
              placeholder="Type tags separated by spaces"
            />
          </div>
        </div>

        {/* Right Section - Image Gallery */}
        <div className="space-y-4">
          {/* Main Product Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Main Product Image
            </label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleMainImageUpload}
              className="hidden"
              id="main-image-upload"
            />
            <label
              htmlFor="main-image-upload"
              className="mt-1 block w-full h-48 border-2 border-dashed border-gray-300 flex justify-center items-center rounded-lg cursor-pointer"
            >
              {productData.mainImage ? (
                <img
                  src={productData.mainImage}
                  alt="Main Product"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <span className="text-gray-500">
                  Upload Main Image (Jpeg, png allowed)
                </span>
              )}
            </label>
          </div>

          {/* Image Gallery */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Gallery
            </label>
            <div
              className="mt-1 h-52 w-full border-2 border-dashed border-gray-300 flex justify-center items-center rounded-lg cursor-pointer"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleImageUpload}
                className="hidden"
                id="gallery-image-upload"
                multiple
              />
              <label
                htmlFor="gallery-image-upload"
                className="flex justify-center items-center w-full h-full text-gray-500 text-center"
              >
                Drop your images here, or click to browse. Jpeg, png allowed
              </label>
            </div>

            {/* Gallery Thumbnails */}
            <div className="mt-4 space-y-2">
              {productData.galleryImages.length > 0 ? (
                productData.galleryImages.map((image, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center">
                      <img
                        src={image}
                        alt={`Product Thumbnail ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <span className="flex-1 text-gray-700">{image}</span>
                    <button
                      onClick={() => handleDeleteImage(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">
                  No images uploaded yet.
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
        </div>
      </form>
    </div>
  );
};

// InputField Component
const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: () => {};
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm text-black"
      value={value}
      onChange={onChange}
    />
  </div>
);

// TextareaField Component
const TextareaField = ({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: () => {};
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <textarea
      name={name}
      className="mt-1 block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm text-black"
      value={value}
      onChange={onChange}
    />
  </div>
);

const CheckboxField = ({
  label,
  name,
  checked,
  onChange,
}: {
  label: string;
  name: string;
  checked: boolean;
  value: string;
  onChange: () => {};
}) => (
  <div className="flex items-center">
    <input
      type="checkbox"
      name={name}
      className="hidden" // Hide the default checkbox
      checked={checked}
      onChange={onChange}
      id={name}
    />
    <label htmlFor={name} className="flex items-center cursor-pointer">
      <div className="relative">
        <div
          className={`block w-14 h-8 rounded-full transition-all duration-300 
            ${checked ? "bg-green-500" : "bg-gray-300"}`}
        ></div>
        <div
          className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow transition-all duration-300
            ${checked ? "translate-x-6" : ""}`}
        ></div>
      </div>
      <span className="ml-3 text-sm font-medium text-gray-700">{label}</span>
    </label>
  </div>
);

export default AddProductDetailsForm;
