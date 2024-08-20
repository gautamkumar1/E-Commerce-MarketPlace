
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"

export default function Faq() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-black">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Frequently Asked Questions</h2>
          <p className="text-muted-foreground md:text-xl/relaxed">
            Get answers to the most common questions about our e-commerce marketplace.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-3xl space-y-4">
          <Collapsible>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-background px-6 py-4 text-lg font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none">
              How do I place an order?
              <ChevronDownIcon className="h-5 w-5 transition-transform [&[data-state=open]]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-6 py-4 text-muted-foreground">
              To place an order, simply browse our marketplace, add the items you want to your cart, and proceed to
              checkout. You'll be guided through the process of providing your shipping and payment information.
            </CollapsibleContent>
          </Collapsible>
          <Collapsible>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-background px-6 py-4 text-lg font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none">
              What are your shipping options?
              <ChevronDownIcon className="h-5 w-5 transition-transform [&[data-state=open]]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-6 py-4 text-muted-foreground">
              We offer a variety of shipping options, including standard ground shipping, expedited shipping, and
              international shipping. Shipping costs and delivery times will vary based on your location and the items
              in your order.
            </CollapsibleContent>
          </Collapsible>
          <Collapsible>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-background px-6 py-4 text-lg font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none">
              What is your return policy?
              <ChevronDownIcon className="h-5 w-5 transition-transform [&[data-state=open]]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-6 py-4 text-muted-foreground">
              We have a 30-day return policy for most items. If you're not satisfied with your purchase, you can return
              it for a full refund or exchange. Some restrictions may apply, so please review our full return policy for
              more details.
            </CollapsibleContent>
          </Collapsible>
          <Collapsible>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-background px-6 py-4 text-lg font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none">
              What payment methods do you accept?
              <ChevronDownIcon className="h-5 w-5 transition-transform [&[data-state=open]]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-6 py-4 text-muted-foreground">
              We accept a variety of payment methods, including credit/debit cards, PayPal, Apple Pay, and Google Pay.
              All transactions are secured with industry-standard encryption to protect your personal and financial
              information.
            </CollapsibleContent>
          </Collapsible>
          <Collapsible>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-background px-6 py-4 text-lg font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none">
              How do I manage my account?
              <ChevronDownIcon className="h-5 w-5 transition-transform [&[data-state=open]]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-6 py-4 text-muted-foreground">
              You can manage your account by logging into your profile on our website. From there, you can update your
              personal information, change your password, view your order history, and more. If you have any issues, our
              customer support team is here to help.
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </section>
  )
}

function ChevronDownIcon(props) {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}