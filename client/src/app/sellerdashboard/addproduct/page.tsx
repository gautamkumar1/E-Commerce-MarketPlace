'use client'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "react-toastify"
export default function Component() {
  // State for the form data
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    rating: '',
    sellername: '',
    shopname: ''
  });

  // Handle change for each input
  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
// Handle change for the Select component
const handleCategoryChange = (value:any) => {
  setFormData({
    ...formData,
    category: value,
  });
};
  // Handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem('token');

      const response: any = await fetch("/api/products/create", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {

        throw new Error("Something went wrong");
      } else {
        toast.success("Product Created Successfully");
        setFormData({
          name: '',
          description: '',
          price: '',
          category: '',
          imageUrl: '',
          rating: '',
          sellername: '',
          shopname: ''
        })
        const responseData = await response.json();

        // window.location.href = "/login";
      }
    } catch (err) {
      toast.error("Product Created failed");
      console.log(err);
    }

    console.log("Form submitted:", formData);
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Add a New Product</h1>
      <form className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-muted-foreground">
              Product Name
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-muted-foreground">
              Product Description
            </label>
            <Textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Describe your product"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-muted-foreground">
              Product Price
            </label>
            <Input
              id="price"
              name="price"
              type="number"
              placeholder="Enter price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-muted-foreground">
              Product Category
            </label>
            <Select
              
              name="category"
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="home">Home</SelectItem>
                <SelectItem value="beauty">Beauty</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
                <SelectItem value="bags">Bags</SelectItem>
                <SelectItem value="Shoes">Shoes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-muted-foreground">
              Product Image
            </label>
            <Input
              id="image"
              name="imageUrl"
              type="file"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-muted-foreground">
              Product Rating
            </label>
            <Input
              id="rating"
              name="rating"
              type="number"
              placeholder="Enter rating"
              value={formData.rating}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="sellername" className="block text-sm font-medium text-muted-foreground">
              Seller Name
            </label>
            <Input
              id="sellername"
              name="sellername"
              type="text"
              placeholder="Enter seller name"
              value={formData.sellername}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="shopname" className="block text-sm font-medium text-muted-foreground">
              Shop Name
            </label>
            <Input
              id="shopname"
              name="shopname"
              type="text"
              placeholder="Enter shop name"
              value={formData.shopname}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="col-span-full">
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}