
"use client"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "react-toastify"

export default function Component() {
    const [user,setUser] = useState({
        username: "",
        email: "",
        phone:"",
        password: "",
        address:"",
        shopname:""
        
      })

      const handleChange = (e: any) => {
        const { id, value } = e.target;
        setUser((prevData) => ({
          ...prevData,
          [id]: value,
        }));
      };
    
      const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
          const response: any = await fetch("/api/register/seller", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            
            throw new Error("Something went wrong");
          } else {
            toast.success("Seller Register Successfully");
            const responseData = await response.json();
           
            window.location.href = "/login";
          }
        } catch (err) {
          toast.error("Seller Register Failed");
          console.log(err);
        }
    
        console.log("Form submitted:", user);
      }
  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">Become a Seller</h1>
              <p className="text-muted-foreground">Join our marketplace and start selling your products today.</p>
            </div>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" value={user.username}
                  onChange={handleChange} placeholder="Enter your username" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={user.email}
                  onChange={handleChange} placeholder="Enter your email" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" value={user.phone}
                  onChange={handleChange} placeholder="Enter your phone number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" value={user.password}
                  onChange={handleChange} placeholder="Enter your password" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" value={user.address}
                  onChange={handleChange} placeholder="Enter your address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shopname">Shop Name</Label>
                  <Input id="shopname" value={user.shopname}
                  onChange={handleChange} placeholder="Enter your shop name" />
                </div>
              </div>
              <Button type="submit" className="w-full">
                Become a Seller
              </Button>
            </form>
          </div>
        </div>
      </main>
      <footer className="bg-muted p-6 md:py-12 w-full">
        <div className="container max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">&copy; 2024 Acme Marketplace. All rights reserved.</p>
          <nav className="flex gap-4 sm:gap-6">
            <Link
              href="#"
              className="text-xs hover:underline underline-offset-4 text-muted-foreground"
              prefetch={false}
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-xs hover:underline underline-offset-4 text-muted-foreground"
              prefetch={false}
            >
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
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