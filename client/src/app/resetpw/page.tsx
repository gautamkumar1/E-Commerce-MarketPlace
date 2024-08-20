/* eslint-disable no-unused-vars */
"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';

import { toast } from "react-toastify";
const ResetPassword: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
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
      const response: any = await fetch("/api/password-reset/confirm", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        
        throw new Error("Something went wrong");
      } else {
        toast.success("Password Updated Successfully");
        const responseData = await response.json();
       
        window.location.href = "/login";
      }
    } catch (err) {
      toast.error("Password Updated failed");
      console.log(err);
    }

    console.log("Form submitted:", formData);
  }
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
            Change Password
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email" className="sr-only">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
                  onChange={handleChange}
              autoComplete="old-email"
              required
              className="relative block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <Label htmlFor="newPassword" className="sr-only">
              Password
            </Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="newPassword"
              value={formData.newPassword}
                  onChange={handleChange}
              autoComplete="new-password"
              required
              className="relative block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <Button
              type="submit"
              className="relative flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Update Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

