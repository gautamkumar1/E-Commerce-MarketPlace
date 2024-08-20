"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from 'next/navigation'


import { toast } from "react-toastify";
interface UserData {
  username: string;
  email: string;
  buyer:string
  seller:string
  userId:string
  // Add other fields that userData is expected to have
}


export default function Component() {
  const userData = localStorage.getItem('userData')
    ? JSON.parse(localStorage.getItem('userData'))
    : null;

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    name: userData?.username || "",
    rating: "0",
    comment: "",
  });

  const { productId } = useParams();

  // Fetch product details and reviews
  useEffect(() => {
    if (productId) {
      // Fetch product details
      fetch(`/api/products/${productId}`)
        .then((response) => response.json())
        .then((data) => setProduct(data))
        .catch((error) => console.error("Error fetching product:", error));

      // Fetch reviews
      fetch(`/api/reviews/${productId}`)
        .then((response) => response.json())
        .then((data) => {
          // Extract only the relevant fields: name, rating, and comment
          const formattedReviews = data.map((review) => ({
            name: review.name,
            rating: review.rating,
            comment: review.comment,
          }));
          setReviews(formattedReviews);
        })
        .catch((error) => console.error("Error fetching reviews:", error));
    }
  }, [productId]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setNewReview((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem('token');
    if (newReview.name && newReview.rating && newReview.comment) {
      const reviewToSubmit = {
        ...newReview,
        rating: parseInt(newReview.rating, 10),
        date: new Date().toISOString().slice(0, 10),
      };

      setReviews([...reviews, reviewToSubmit]);

      setNewReview({
        name: "",
        rating: "0",
        comment: "",
      });

      try {
        const response = await fetch(`/api/reviews/${productId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify(reviewToSubmit),
        });

        if (!response.ok) {
          throw new Error("Failed to submit review");
        }
        toast.success("Review submitted successfully");
        const data = await response.json();
        console.log("Review submitted:", data);
      } catch (error) {
        toast.error("Failed to submit review");
        console.error("Error submitting review:", error);
      }
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      {/* Product details and reviews */}
      <div className="grid gap-4 md:gap-10 items-start">
        <img
          src={product.imageUrl}
          alt={product.name}
          width={600}
          height={900}
          className="aspect-[2/3] object-cover border w-full rounded-lg overflow-hidden"
        />
        <div className="grid gap-2">
          <h1 className="font-bold text-3xl lg:text-4xl">{product.name}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-0.5">
              {[...Array(Math.max(0, Math.min(5, product.rating || 0)))].map((_, i) => (
                <StarIcon key={i} className="w-5 h-5 fill-primary" />
              ))}
              {[...Array(5 - Math.max(0, Math.min(5, product.rating || 0)))].map((_, i) => (
                <StarIcon key={i} className="w-5 h-5 fill-muted stroke-muted-foreground" />
              ))}
            </div>
            <span className="text-muted-foreground">(32 reviews)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Sold by:</span>
            <Link href="#" className="text-primary hover:underline" prefetch={false}>
              {product.sellername}
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Shop:</span>
            <Link href="#" className="text-primary hover:underline" prefetch={false}>
              {product.shopname}
            </Link>
          </div>
          <div className="text-4xl font-bold">${product.price}</div>
          <Button size="lg">Add to Cart</Button>
        </div>
      </div>
      <div className="grid gap-6 md:gap-10">
        <Card>
          <CardHeader>
            <CardTitle>Write a Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={newReview.name}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="rating" className="text-gray-300">Rating</Label>
                <select
                  id="rating"
                  value={newReview.rating}
                  onChange={handleChange}
                  className="bg-gray-800 text-white border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="0" className="bg-gray-800 text-white">0 star</option>
                  <option value="1" className="bg-gray-800 text-white">1 star</option>
                  <option value="2" className="bg-gray-800 text-white">2 stars</option>
                  <option value="3" className="bg-gray-800 text-white">3 stars</option>
                  <option value="4" className="bg-gray-800 text-white">4 stars</option>
                  <option value="5" className="bg-gray-800 text-white">5 stars</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="comment">Review</Label>
                <Textarea
                  id="comment"
                  value={newReview.comment}
                  onChange={handleChange}
                  className="min-h-[120px]"
                />
              </div>
              <Button size="lg" onClick={handleSubmitReview}>
                Submit Review
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            
            <div className="grid gap-6">
              {reviews.map((review, index) => (
                <div key={index} className="grid gap-2">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-0.5">
                      {[...Array(Math.max(0, Math.min(5, review.rating || 0)))].map((_, i) => (
                        <StarIcon key={i} className="w-5 h-5 fill-primary" />
                      ))}
                      {[...Array(5 - Math.max(0, Math.min(5, review.rating || 0)))].map((_, i) => (
                        <StarIcon key={i} className="w-5 h-5 fill-muted stroke-muted-foreground" />
                      ))}
                    </div>
                    <span className="text-muted-foreground">
                      {review.name}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
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