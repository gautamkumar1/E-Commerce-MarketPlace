
"use client"


import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import musicImage from "../../../../public/Music Festival.png"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify"

export default function Component() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({}); // New state to hold form data

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products/getAllProducts');
        const fetchedProducts = response.data.map(product => ({
          id: product._id,
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.imageUrl,
          rating: product.rating,
          inStock: product.available,
          seller: product.sellername || 'Unknown Seller',
          shop: product.shopname || 'Unknown Shop',
        }));
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Not authenticated');
      return;
    }

    try {
      const response = await axios.get(`/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const product = response.data;
      const formattedProduct = {
        id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.imageUrl,
        rating: product.rating,
        inStock: product.available,
        seller: product.sellername || 'Unknown Seller',
        shop: product.shopname || 'Unknown Shop',
      };

      setEditingProduct(formattedProduct);
      setFormData(formattedProduct); // Initialize formData with current product details
    } catch (error) {
      toast.error("Error fetching product details");
      console.error('Error fetching product details:', error);
    }
  };

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Not authenticated');
      return;
    }

    try {
      await axios.put(`/api/products/${editingProduct.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Product updated successfully');
      setEditingProduct(null);

      // Optionally, update the product in the list without refetching all products
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === editingProduct.id ? formData : product
        )
      );
    } catch (error) {
      toast.error('Error updating product');
      console.error('Error updating product:', error);
    }
  };

  const handleDelete = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Not authenticated');
      return;
    }
    try {
      await axios.delete(`/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(products.filter((product) => product.id !== productId));
      toast.success('Product deleted successfully');
    } catch (error) {
      toast.error('Error deleting product');
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">Your Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="relative">
              <img
                src={product.image || '/placeholder.svg'}
                alt={product.name}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
                style={{ aspectRatio: '400/300', objectFit: 'cover' }}
              />
              <div className="absolute top-2 right-2 bg-black dark:bg-gray-800 rounded-full px-2 py-1 text-sm font-medium">
                {product.rating.toFixed(1)}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium mb-2">{product.name}</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">{product.description}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold">${product.price}</span>
                <span
                  className={`px-2 py-1 rounded-full text-sm font-medium ${
                    product.inStock
                      ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                      : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                  }`}
                >
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Sold by {product.seller} ({product.shop})
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(product.id)}>
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(product.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* modal */}
      {editingProduct && (
        <Dialog open={!!editingProduct} onOpenChange={setEditingProduct}>
          <DialogContent className="sm:max-w-xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description || ''}
                  onChange={handleInputChange}
                  className="min-h-32 w-full"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price || ''}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="image">Image</Label>
                <Input
                  id="image"
                  type="text"
                  value={formData.image || ''}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="rating">Rating</Label>
                <Input
                  id="rating"
                  type="number"
                  step="0.1"
                  value={formData.rating || ''}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="inStock">In Stock</Label>
                <Checkbox
                  id="inStock"
                  checked={formData.inStock || false}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="seller">Seller</Label>
                <Input
                  id="seller"
                  type="text"
                  value={formData.seller || ''}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="shop">Shop</Label>
                <Input
                  id="shop"
                  type="text"
                  value={formData.shop || ''}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>
            </div>
            <DialogFooter>
            <Button variant="outline" onClick={() => setEditingProduct(null)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

