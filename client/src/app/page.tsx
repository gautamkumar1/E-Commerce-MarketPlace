import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Img from "../../public/placeholder-image.jpg";
import Card from "@/partial/Card";
import { GridBackgroundDemo } from "@/components/ui/GridBackgroundDemo";
import { HeroScrollDemo } from "@/components/ui/HeroScrollDemo";
import { WordPullUpDemo } from "@/components/ui/World-PullUp";
import { InfiniteMovingCardsDemo } from "@/components/ui/Infinite-Moving";
import Faq from "@/components/ui/Faq";
import AboutTheDeveloper from "@/components/ui/AboutTheDeveloper";
export default function Component() {
  const products = [
    {
      id: 1,
      name: "Acme Sunglasses",
      description: "Stylish and durable sunglasses",
      price: 49.99,
      rating: 4.5,
      category: "Accessories",
      image: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Comfort Sneakers",
      description: "Lightweight and cushioned sneakers",
      price: 79.99,
      rating: 4.2,
      category: "Shoes",
      image: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Cozy Hoodie",
      description: "Soft and warm hooded sweatshirt",
      price: 39.99,
      rating: 4.7,
      category: "Clothing",
      image: "/placeholder.svg",
    },
    {
      id: 4,
      name: "Durable Backpack",
      description: "Spacious and sturdy backpack",
      price: 59.99,
      rating: 4.3,
      category: "Accessories",
      image: "/placeholder.svg",
    },
    {
      id: 5,
      name: "Elegant Dress",
      description: "Stylish and flattering dress",
      price: 89.99,
      rating: 4.6,
      category: "Clothing",
      image: "/placeholder.svg",
    },
  ];
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">

        
        <GridBackgroundDemo/>
        <HeroScrollDemo/>
        {/* key features */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-black">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Why Choose Our Marketplace?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform offers a seamless and secure experience for both
                  buyers and sellers. Discover the key features that set us
                  apart.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <TruckIcon className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold">Fast Shipping</h3>
                </div>
                <p className="text-muted-foreground">
                  Enjoy reliable and fast shipping to your doorstep.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <ShieldIcon className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold">Secure Payments</h3>
                </div>
                <p className="text-muted-foreground">
                  Rest assured with our secure payment processing.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <PercentIcon className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold">Competitive Pricing</h3>
                </div>
                <p className="text-muted-foreground">
                  Explore a wide range of products at competitive prices.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <HeadphonesIcon className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold">Customer Support</h3>
                </div>
                <p className="text-muted-foreground">
                  Our dedicated team is here to assist you with any queries.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <RefreshCwIcon className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold">Easy Returns</h3>
                </div>
                <p className="text-muted-foreground">
                  Hassle-free returns and refunds for your peace of mind.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <BoltIcon className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold">Instant Notifications</h3>
                </div>
                <p className="text-muted-foreground">
                  Stay updated on your orders and seller activities.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* trending products */}

        {/* <section className="w-full py-12 md:py-24 lg:py-32 bg-background">

          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Trending Products
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Discover Trending Products
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore the latest and most popular products on our
                  marketplace.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              {products.map((product) => (
                <div
                  // onClick={() => router.push(`/shop/${product.id}`)}
                  key={product.id}
                  className="bg-gray-900 rounded-lg h-fit  shadow-md "
                >
                  <Card
                    title={product.name}
                    description={product.description}
                    price={product.price}
                    photoUrl={product.image}
                  ></Card>
                </div>
              ))}
            </div>
          </div>
        </section> */}
        

        {/* Seller Section */}
        <section className="bg-black py-12 md:py-24">
  <div className="container flex flex-col items-center justify-center gap-6 px-4 md:px-6 text-center">
    <div>
      <WordPullUpDemo />
      <p className="mt-4 max-w-md text-muted-foreground md:text-xl mx-auto">
        Join our platform and start selling your products to a wide audience.
      </p>
    </div>
    <Link
      href="/seller"
      className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-1"
      prefetch={false}
    >
      Register as a Seller
    </Link>
  </div>
</section>

{/* Top Seller */}
<section className="w-full py-12 md:py-24 lg:py-32 bg-black">
  <div className="container px-4 md:px-6">
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <div className="space-y-2">
        <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
          Top Sellers
        </div>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
          Meet Our Top Sellers
        </h2>
        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-gray-300">
          Discover the talented individuals behind our top-selling products.
        </p>
      </div>
    </div>
    <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
      <div className="flex flex-col items-center gap-4">
        <Avatar>
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="space-y-1 text-center">
          <h3 className="text-lg font-bold text-white">John Doe</h3>
          <p className="text-gray-300">Jewelry Maker</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <Avatar>
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>SA</AvatarFallback>
        </Avatar>
        <div className="space-y-1 text-center">
          <h3 className="text-lg font-bold text-white">Sarah Anderson</h3>
          <p className="text-gray-300">Ceramist</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <Avatar>
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>MR</AvatarFallback>
        </Avatar>
        <div className="space-y-1 text-center">
          <h3 className="text-lg font-bold text-white">Michael Roth</h3>
          <p className="text-gray-300">Woodworker</p>
        </div>
      </div>
    </div>
  </div>
</section>


        {/* testimonials */}
        <section>
        <InfiniteMovingCardsDemo/>
        </section>

        {/* FAQ */}

        <section>
          <Faq/>
        </section>

        {/* About the Developer */}

        <section>
          <AboutTheDeveloper/>
        </section>
      </main>
      <footer className="bg-black p-6 md:py-12 w-full">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
          <div className="grid gap-1">
            <h3 className="font-semibold">Marketplace</h3>
            <Link href="#" prefetch={false}>
              Browse Products
            </Link>
            <Link href="#" prefetch={false}>
              Become a Seller
            </Link>
            <Link href="#" prefetch={false}>
              Seller Dashboard
            </Link>
            <Link href="#" prefetch={false}>
              FAQs
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Company</h3>
            <Link href="#" prefetch={false}>
              About Us
            </Link>
            <Link href="#" prefetch={false}>
              Our Team
            </Link>
            <Link href="#" prefetch={false}>
              Careers
            </Link>
            <Link href="#" prefetch={false}>
              News
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Resources</h3>
            <Link href="#" prefetch={false}>
              Blog
            </Link>
            <Link href="#" prefetch={false}>
              Community
            </Link>
            <Link href="#" prefetch={false}>
              Support
            </Link>
            <Link href="#" prefetch={false}>
              Documentation
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Legal</h3>
            <Link href="#" prefetch={false}>
              Privacy Policy
            </Link>
            <Link href="#" prefetch={false}>
              Terms of Service
            </Link>
            <Link href="#" prefetch={false}>
              Cookie Policy
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Contact</h3>
            <Link href="#" prefetch={false}>
              Support
            </Link>
            <Link href="#" prefetch={false}>
              Sales
            </Link>
            <Link href="#" prefetch={false}>
              Press
            </Link>
            <Link href="#" prefetch={false}>
              Partnerships
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
function StarHalfIcon(props) {
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
      <path d="M12 17.8 5.8 21 7 14.1 2 9.3l7-1L12 2" />
    </svg>
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
  );
}

function BoltIcon(props) {
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
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

function HeadphonesIcon(props) {
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
      <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
    </svg>
  );
}

function PercentIcon(props) {
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
      <line x1="19" x2="5" y1="5" y2="19" />
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
  );
}

function RefreshCwIcon(props) {
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
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  );
}

function ShieldIcon(props) {
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
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  );
}

function StoreIcon(props) {
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
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
      <path d="M2 7h20" />
      <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
    </svg>
  );
}

function TruckIcon(props) {
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
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  );
}
