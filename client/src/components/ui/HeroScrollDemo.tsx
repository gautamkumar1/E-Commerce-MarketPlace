"use client";
import React from "react";
import { ContainerScroll } from "../ui/container-scroll-animation";
import Image from "next/image";
import userDashboardImage from '../../../public/Shopaholic UserDashboard.png'
export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-white">
            Empower Your Marketplace with<br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
              Dynamic Seller Insights
              </span>
            </h1>
          </>
        }
      >
        <Image
          src={userDashboardImage.src}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
