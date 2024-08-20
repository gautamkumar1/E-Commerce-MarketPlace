
"use client"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import React, { useEffect, useState } from "react";
import axios from "axios";

// export default function Component() {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [totalPrice, setTotalPrice] = useState(0);

//   useEffect(() => {
//     // Fetch cart items
//     const fetchCartData = async () => {
//       try {
//         const token = localStorage.getItem('token')
//         const cartResponse = await axios.get("/api/cart",{
//           headers: {
//             Authorization: `Bearer ${token}`, // Add the token to the Authorization header
//           }});
//         const items = cartResponse.data.items;

//         const productDetails = await Promise.all(
//           items.map(async (item) => {
//             const productResponse = await axios.get(`/api/products/${item.productId}`,{
//               headers: {
//                 Authorization: `Bearer ${token}`, // Add the token to the Authorization header
//               }});
//             return {
//               ...productResponse.data,
//               quantity: item.quantity,
//             };
//           })
//         );

//         setCartItems(productDetails);
//         setTotalPrice(
//           productDetails.reduce((total, item) => total + item.price * item.quantity, 0)
//         );
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching cart data:", error);
//         setLoading(false);
//       }
//     };

//     fetchCartData();
//   }, []);

//    // Function to clear the cart
//    const clearCart = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete("/api/cart", {
//         headers: {
//           Authorization: `Bearer ${token}`, // Add the token to the Authorization header
//         },
//       });
//       setCartItems([]);
//       setTotalPrice(0);
//     } catch (error) {
//       console.error("Error clearing the cart:", error);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex flex-col min-h-screen">
//       <main className="flex-1 grid md:grid-cols-[1fr_300px] gap-8 p-4 md:p-8">
//         <div className="space-y-6">
//           <div className="grid gap-4">
//             <div className="flex items-center justify-between">
//               <h1 className="text-2xl font-bold">Your Cart</h1>
//               <Button variant="outline" size="sm" onClick={clearCart}>
//                 <TrashIcon className="h-4 w-4 mr-2" />
//                 Clear Cart
//               </Button>
//             </div>
//             {/* Product details */}
//             <div className="grid gap-4">
//               {cartItems.map((item) => (
//                 <div key={item._id} className="grid grid-cols-[80px_1fr_auto] items-center gap-4">
//                   <img
//                     src={item.imageUrl}
//                     width={80}
//                     height={80}
//                     alt="Product Image"
//                     className="rounded-md object-cover"
//                     style={{ aspectRatio: "80/80", objectFit: "cover" }}
//                   />
//                   <div>
//                     <h3 className="font-medium">{item.name}</h3>
//                     <p className="text-muted-foreground text-sm">{item.description}</p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Button variant="outline" size="icon">
//                       <MinusIcon className="h-4 w-4" />
//                     </Button>
//                     <span>{item.quantity}</span>
//                     <Button variant="outline" size="icon">
//                       <PlusIcon className="h-4 w-4" />
//                     </Button>
//                     <span className="font-medium">${item.price}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
          
//         </div>
//         <div className="bg-muted rounded-md p-6 space-y-4 sticky top-4">
//           <div className="flex items-center justify-between">
//             <h2 className="text-xl font-bold">Order Summary</h2>
//             <span className="font-medium">${totalPrice.toFixed(2)}</span>
//           </div>
//           <div className="grid gap-2">
//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">Subtotal</span>
//               <span>${totalPrice.toFixed(2)}</span>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">Shipping</span>
//               <span>$0.00</span>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">Discount</span>
//               <span className="text-green-500">-$10.00</span>
//             </div>
//             <Separator />
//             <div className="flex items-center justify-between font-medium">
//               <span>Total</span>
//               <span>${(totalPrice - 10).toFixed(2)}</span>
//             </div>
//           </div>
//           <Button className="w-full">Proceed to Checkout</Button>
//         </div>
//       </main>
//     </div>
//   );
// }

export default function Component() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Fetch cart items
    const fetchCartData = async () => {
      try {
        const token = localStorage.getItem('token');
        const cartResponse = await axios.get("/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const items = cartResponse.data.items;

        const productDetails = await Promise.all(
          items.map(async (item) => {
            const productResponse = await axios.get(`/api/products/${item.productId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            return {
              ...productResponse.data,
              quantity: item.quantity,
            };
          })
        );

        setCartItems(productDetails);
        setTotalPrice(
          productDetails.reduce((total, item) => total + item.price * item.quantity, 0)
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  // Function to update the quantity of a cart item
  const updateQuantity = async (productId, quantity) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch("/api/cart", {
        productId,
        quantity,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item._id === productId ? { ...item, quantity } : item
        )
      );

      // Recalculate the total price
      setTotalPrice((prevItems) =>
        cartItems.reduce((total, item) => total + item.price * (item._id === productId ? quantity : item.quantity), 0)
      );
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
    }
  };

  // Function to clear the cart
  const clearCart = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete("/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems([]);
      setTotalPrice(0);
    } catch (error) {
      console.error("Error clearing the cart:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 grid md:grid-cols-[1fr_300px] gap-8 p-4 md:p-8">
        <div className="space-y-6">
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Your Cart</h1>
              <Button variant="outline" size="sm" onClick={clearCart}>
                <TrashIcon className="h-4 w-4 mr-2" />
                Clear Cart
              </Button>
            </div>
            {/* Product details */}
            <div className="grid gap-4">
              {cartItems.map((item) => (
                <div key={item._id} className="grid grid-cols-[80px_1fr_auto] items-center gap-4">
                  <img
                    src={item.imageUrl}
                    width={80}
                    height={80}
                    alt="Product Image"
                    className="rounded-md object-cover"
                    style={{ aspectRatio: "80/80", objectFit: "cover" }}
                  />
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      disabled={item.quantity === 1} // Disable minus button if quantity is 1
                    >
                      <MinusIcon className="h-4 w-4" />
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    >
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                    <span className="font-medium">${item.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-muted rounded-md p-6 space-y-4 sticky top-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Order Summary</h2>
            <span className="font-medium">${totalPrice.toFixed(2)}</span>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>$0.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Discount</span>
              <span className="text-green-500">-$10.00</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between font-medium">
              <span>Total</span>
              <span>${(totalPrice - 10).toFixed(2)}</span>
            </div>
          </div>
          <Button className="w-full">Proceed to Checkout</Button>
        </div>
      </main>
    </div>
  );
}

function MinusIcon(props) {
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
      <path d="M5 12h14" />
    </svg>
  )
}


function MountainIcon(props) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}


function PlusIcon(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function ShoppingCartIcon(props) {
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
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}


function TrashIcon(props) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}