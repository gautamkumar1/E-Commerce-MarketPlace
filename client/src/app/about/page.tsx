
import Link from "next/link"

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Acme Marketplace</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Home
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            About
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Products
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Empowering Entrepreneurs, Transforming Commerce
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    At Acme Marketplace, our mission is to provide a seamless, inclusive platform that enables
                    entrepreneurs and small businesses to thrive in the digital economy.
                  </p>
                </div>
              </div>
              <img
                src="/placeholder.svg"
                width="550"
                height="550"
                alt="About"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Core Values</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  At the heart of Acme Marketplace are the values that guide our actions and shape our culture. These
                  principles are the foundation upon which we build lasting relationships with our merchants and
                  customers.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
              <div className="grid gap-1">
                <InfinityIcon className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-bold">Integrity</h3>
                <p className="text-muted-foreground">
                  We are committed to honesty, transparency, and ethical business practices in all that we do.
                </p>
              </div>
              <div className="grid gap-1">
                <EqualIcon className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-bold">Inclusivity</h3>
                <p className="text-muted-foreground">
                  We celebrate diversity and strive to create an environment where everyone feels welcomed and
                  empowered.
                </p>
              </div>
              <div className="grid gap-1">
                <InfoIcon className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-bold">Innovation</h3>
                <p className="text-muted-foreground">
                  We are constantly exploring new ways to improve the e-commerce experience and empower our merchants
                  and customers.
                </p>
              </div>
              <div className="grid gap-1">
                <GroupIcon className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-bold">Community</h3>
                <p className="text-muted-foreground">
                  We believe in the power of collaboration and strive to build a supportive community of entrepreneurs
                  and small businesses.
                </p>
              </div>
              <div className="grid gap-1">
                <RecycleIcon className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-bold">Sustainability</h3>
                <p className="text-muted-foreground">
                  We are committed to promoting sustainable practices and minimizing our environmental impact in all
                  aspects of our business.
                </p>
              </div>
              <div className="grid gap-1">
                <FocusIcon className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-bold">Customer Focus</h3>
                <p className="text-muted-foreground">
                  We prioritize the needs and satisfaction of our merchants and customers, and strive to deliver
                  exceptional service.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Products and Services</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Acme Marketplace offers a comprehensive suite of e-commerce tools and services to help entrepreneurs
                  and small businesses thrive in the digital economy.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
              <div className="grid gap-1">
                <StoreIcon className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-bold">Storefront</h3>
                <p className="text-muted-foreground">
                  Easily create and customize your online store with our user-friendly platform.
                </p>
              </div>
              <div className="grid gap-1">
                <WarehouseIcon className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-bold">Inventory Management</h3>
                <p className="text-muted-foreground">
                  Streamline your inventory tracking and order fulfillment with our advanced tools.
                </p>
              </div>
              <div className="grid gap-1">
                <InfoIcon className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-bold">Analytics</h3>
                <p className="text-muted-foreground">
                  Gain valuable insights into your business performance with our comprehensive analytics dashboard.
                </p>
              </div>
              <div className="grid gap-1">
                <CoinsIcon className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-bold">Payments</h3>
                <p className="text-muted-foreground">
                  Offer your customers a seamless and secure checkout experience with our integrated payment solutions.
                </p>
              </div>
              <div className="grid gap-1">
                <ShipIcon className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-bold">Shipping</h3>
                <p className="text-muted-foreground">
                  Streamline your order fulfillment with our reliable shipping integrations and tools.
                </p>
              </div>
              <div className="grid gap-1">
                <StoreIcon className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-bold">Marketing</h3>
                <p className="text-muted-foreground">
                  Leverage our marketing features to reach new customers and grow your business.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Meet the Team</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  The passionate individuals behind Acme Marketplace are dedicated to empowering entrepreneurs and
                  transforming the e-commerce landscape.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
              <div className="grid gap-4">
                <img
                  src="/placeholder.svg"
                  width="200"
                  height="200"
                  alt="John Doe"
                  className="mx-auto aspect-square overflow-hidden rounded-full object-cover"
                />
                <div className="text-center">
                  <h3 className="text-lg font-bold">John Doe</h3>
                  <p className="text-muted-foreground">Co-Founder & CEO</p>
                </div>
              </div>
              <div className="grid gap-4">
                <img
                  src="/placeholder.svg"
                  width="200"
                  height="200"
                  alt="Jane Smith"
                  className="mx-auto aspect-square overflow-hidden rounded-full object-cover"
                />
                <div className="text-center">
                  <h3 className="text-lg font-bold">Jane Smith</h3>
                  <p className="text-muted-foreground">Co-Founder & CTO</p>
                </div>
              </div>
              <div className="grid gap-4">
                <img
                  src="/placeholder.svg"
                  width="200"
                  height="200"
                  alt="Michael Johnson"
                  className="mx-auto aspect-square overflow-hidden rounded-full object-cover"
                />
                <div className="text-center">
                  <h3 className="text-lg font-bold">Michael Johnson</h3>
                  <p className="text-muted-foreground">Head of Product</p>
                </div>
              </div>
              <div className="grid gap-4">
                <img
                  src="/placeholder.svg"
                  width="200"
                  height="200"
                  alt="Emily Davis"
                  className="mx-auto aspect-square overflow-hidden rounded-full object-cover"
                />
                <div className="text-center">
                  <h3 className="text-lg font-bold">Emily Davis</h3>
                  <p className="text-muted-foreground">Head of Marketing</p>
                </div>
              </div>
              <div className="grid gap-4">
                <img
                  src="/placeholder.svg"
                  width="200"
                  height="200"
                  alt="David Lee"
                  className="mx-auto aspect-square overflow-hidden rounded-full object-cover"
                />
                <div className="text-center">
                  <h3 className="text-lg font-bold">David Lee</h3>
                  <p className="text-muted-foreground">Head of Engineering</p>
                </div>
              </div>
              <div className="grid gap-4">
                <img
                  src="/placeholder.svg"
                  width="200"
                  height="200"
                  alt="Sarah Chen"
                  className="mx-auto aspect-square overflow-hidden rounded-full object-cover"
                />
                <div className="text-center">
                  <h3 className="text-lg font-bold">Sarah Chen</h3>
                  <p className="text-muted-foreground">Head of Customer Success</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Acme Marketplace. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

function CoinsIcon(props) {
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
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h1v4" />
      <path d="m16.71 13.88.7.71-2.82 2.82" />
    </svg>
  )
}


function EqualIcon(props) {
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
      <line x1="5" x2="19" y1="9" y2="9" />
      <line x1="5" x2="19" y1="15" y2="15" />
    </svg>
  )
}


function FocusIcon(props) {
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
      <circle cx="12" cy="12" r="3" />
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
    </svg>
  )
}


function GroupIcon(props) {
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
      <path d="M3 7V5c0-1.1.9-2 2-2h2" />
      <path d="M17 3h2c1.1 0 2 .9 2 2v2" />
      <path d="M21 17v2c0 1.1-.9 2-2 2h-2" />
      <path d="M7 21H5c-1.1 0-2-.9-2-2v-2" />
      <rect width="7" height="5" x="7" y="7" rx="1" />
      <rect width="7" height="5" x="10" y="12" rx="1" />
    </svg>
  )
}


function InfinityIcon(props) {
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
      <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z" />
    </svg>
  )
}


function InfoIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
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


function RecycleIcon(props) {
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
      <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
      <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" />
      <path d="m14 16-3 3 3 3" />
      <path d="M8.293 13.596 7.196 9.5 3.1 10.598" />
      <path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843" />
      <path d="m13.378 9.633 4.096 1.098 1.097-4.096" />
    </svg>
  )
}


function ShipIcon(props) {
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
      <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76" />
      <path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6" />
      <path d="M12 10v4" />
      <path d="M12 2v3" />
    </svg>
  )
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
  )
}


function WarehouseIcon(props) {
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
      <path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z" />
      <path d="M6 18h12" />
      <path d="M6 14h12" />
      <rect width="12" height="12" x="6" y="10" />
    </svg>
  )
}