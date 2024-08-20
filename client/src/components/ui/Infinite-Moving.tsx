"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
    return (
      <div className="h-[40rem] rounded-md flex flex-col antialiased bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
        />
      </div>
    );
  }
  

const testimonials = [
  {
    quote:
      "The platform is incredibly user-friendly, and I was able to set up my shop in no time. My sales have doubled since I joined!",
    name: "Gautam Kumar",
    title: "Successful Seller",
  },
  {
    quote:
      "I love how easy it is to find exactly what I'm looking for. The customer support team is also top-notch!",
    name: "Mahima Choudhary",
    title: "Satisfied Customer",
  },
  {
    quote: "The secure payment system gives me peace of mind when making transactions. Highly recommend this marketplace!",
    name: "Hansh Saxena",
    title: "Happy Buyer",
  },
  {
    quote:
      "As a seller, the platform's analytics tools have been invaluable. I can track my performance and optimize my listings effortlessly.",
    name: "Priyank Oberoi",
    title: "Professional Seller",
  },
  {
    quote:
      "This marketplace has everything I need, from quality products to competitive prices. It's my go-to shopping destination.",
    name: "Saurabh Pratik",
    title: "Loyal Customer",
  },
];
