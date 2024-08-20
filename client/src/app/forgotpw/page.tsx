"use client"
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'react-toastify';

const ForgotPassword: React.FC = () => {
    const [formData, setFormData] = useState({
        email: "",
        userType: "",
        
      });

      const handleChange = (e: any) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [id]: value,
        }));
      };

      const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
          const response: any = await fetch("/api/password-reset/request", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            
            throw new Error("Something went wrong");
          } else {
            toast.success("forgot password reset sent successfully");
            setFormData({email:"",userType:""})
            const responseData = await response.json();
           
    
          }
        } catch (err) {
            toast.success("Forgot password reset failed");
          console.log(err);
        }
    
        console.log("Form submitted:", formData);
      }
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
            Forgot Password
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email" className="sr-only">
              Email address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
                  onChange={handleChange}
              autoComplete="email"
              required
              className="relative block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
              placeholder="Email address"
            />
          </div>
          {/* Role */}
          <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="userType"
                  className="block text-sm font-medium text-gray-300"
                >
                  Role
                </label>
                <select
                  id="userType"
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  className="p-2 mt-1 w-full rounded-md border-gray-700 bg-gray-800 text-sm text-gray-200 shadow-sm"
                >
                  <option value="select">Select</option>
                  <option value="buyer">BUYER</option>
                  <option value="seller">SELLER</option>
                </select>
              </div>
          <div>
            <Button
              type="submit"
              className="relative flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Send Link
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
