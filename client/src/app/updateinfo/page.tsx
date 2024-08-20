
"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "react-toastify"

export default function Component() {
  const [user,setUser] = useState({
    username: "",
    email: "",
    phone:"",
    address:"",
    
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
      const authToken = localStorage.getItem('token');
            
      const response: any = await fetch("/api/update/buyer", {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        
        throw new Error("Something went wrong");
      } else {
        toast.success("Information Updated Successfully");
        setUser({username:"",email:"",phone:"",address:""})
        const responseData = await response.json();
       
        window.location.href = "/login";
      }
    } catch (err) {
      toast.error("Information Updated failed");
      console.log(err);
    }

    console.log("Form submitted:", user);
  }
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto max-w-3xl p-6 sm:p-8 md:p-10">
        <div className="space-y-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Update Your Profile</h1>
            <p className="text-muted-foreground">Manage your personal information.</p>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username"value={user.username}
                  onChange={handleChange} placeholder="Enter your username" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={user.email}
                  onChange={handleChange} placeholder="Enter your email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" value={user.phone}
                  onChange={handleChange} placeholder="Enter your phone number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" value={user.address}
                  onChange={handleChange} placeholder="Enter your address" rows={3} />
            </div>
            <div className="flex justify-end">
            <Button type="submit">Save Changes</Button>
          </div>
          </form>
          
        </div>
      </div>
    </div>
  );
}
