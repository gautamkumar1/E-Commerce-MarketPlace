"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ImageSlider from "@/components/ui/ImageSlider";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const router = useRouter();
  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products/getAllProducts");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category.toLowerCase() === selectedCategory.toLowerCase())
    : products;

    const handleViewProduct = (productId:any) => {
      console.log(productId);
      
      router.push(`/singleproduct/${productId}`);

    };
  return (
    <div className="p-6">
      {/* Image Slider Section */}
      <div className="mb-6">
        <ImageSlider />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
        <div className="bg-background rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-4">Filter by Category</h2>
          <div className="space-y-2">
            <button
              className={`block w-full text-left px-4 py-2 rounded-md transition-colors ${
                selectedCategory === ""
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
              onClick={() => setSelectedCategory("")}
            >
              All
            </button>
            {["Accessories", "Bags", "Electronics", "Clothing", "Shoes"].map(
              (category) => (
                <button
                  key={category}
                  className={`block w-full text-left px-4 py-2 rounded-md transition-colors ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              )
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-background rounded-lg shadow-sm overflow-hidden"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                width={400}
                height={300}
                className="w-full h-60 object-cover"
                style={{ aspectRatio: "400/300", objectFit: "cover" }}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">
                    ${product.price}
                  </span>
                  <div className="flex gap-2">
                    <Button size="sm">Add to Cart</Button>
                    <Button size="sm" variant="outline"  onClick={() => handleViewProduct(product._id)}>
                        View Product
                      </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
