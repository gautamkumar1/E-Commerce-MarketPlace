/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client"
import Link from "next/link";
// import { useRouter } from 'next/navigation'
import React, { useState } from "react";
import login from "../../../public/login.jpg";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
const RegistrationSection: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    userType: "",
    password: "",
  });
  // const router = useRouter()
  // Handle form input changes
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
      const response: any = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      } else {
        toast.success("user logged in successfully");
        const responseData = await response.json();
        // console.log(responseData);
        
        const token = responseData.token;
        localStorage.setItem("token", token);
        const decodedToken = jwtDecode(token);
      localStorage.setItem('userData', JSON.stringify(decodedToken));4
      // router.push('/')
        if(formData.userType === 'seller'){
          localStorage.setItem('seller','seller')
          window.location.href = "sellerdashboard";
        }
        else if(formData.userType === 'buyer'){
          localStorage.setItem('buyer','buyer')
          window.location.href = "/";
        }
      }
    } catch (err) {
      toast.error("user logged in failed");
      console.log(err);
    }

    console.log("Form submitted:", formData);
  }
  return (
    <section className="bg-gray-900 text-gray-200 dark">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Decorative"
            src={login.src}
            className="absolute inset-0 h-full w-full object-cover hidden md:block"
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <a className="block text-purple-400" href="#">
              <span className="sr-only">Home</span>
              <svg
                className="h-8 sm:h-10"
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                  fill="currentColor"
                />
              </svg>
            </a>

            <h1 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome
            </h1>

            <p className="mt-4 leading-relaxed text-gray-400">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              nam dolorum aliquam, quibusdam aperiam voluptatum.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="p-2 mt-1 w-full rounded-md border-gray-700 bg-gray-800 text-sm text-gray-200 shadow-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="p-2 mt-1 w-full rounded-md border-gray-700 bg-gray-800 text-sm text-gray-200 shadow-sm"
                />
              </div>
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

              <div className="col-span-6 flex items-center gap-x-4">
                <button
                  type="submit"
                  className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm ring-1 ring-gray-900 hover:bg-purple-700"
                >
                  Sign In
                </button>
                <div className="flex flex-col">
                  <p className="text-sm text-gray-400 mb-1">
                    Don't have an account?{" "}
                    <Link
                      href={"/signup"}
                      prefetch={false}
                      className="text-purple-500 hover:text-blue-400"
                    >
                      Sign Up
                    </Link>
                  </p>
                  <p className="text-sm text-gray-400">
                    <Link
                      href={"/forgotpw"}
                      prefetch={false}
                      className="text-purple-500 hover:text-blue-400"
                    >
                      Forget Password ?
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default RegistrationSection;
