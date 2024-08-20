"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function Component() {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

  const handleNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps))
  }

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <main className="flex-1 px-4 py-8 sm:px-6 md:py-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex items-center justify-between">
            {[
              { step: 1, name: "Shipping" },
              { step: 2, name: "Payment Method" },
              { step: 3, name: "Order Review" },
              { step: 4, name: "Final Payment" }
            ].map((item, index) => (
              <div key={item.step} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`h-8 w-8 rounded-full ${
                      currentStep >= item.step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <span className="flex h-full w-full items-center justify-center text-sm font-medium">{item.step}</span>
                  </div>
                  <span className="mt-1 text-xs font-medium">{item.name}</span>
                </div>
                {index < 3 && (
                  <div className={`h-1 w-16 ${currentStep > item.step ? "bg-primary" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>
          
          {currentStep === 1 && <ShippingInformation onNext={handleNextStep} />}
          {currentStep === 2 && <PaymentMethod onNext={handleNextStep} onPrev={handlePrevStep} />}
          {currentStep === 3 && <OrderReview onNext={handleNextStep} onPrev={handlePrevStep} />}
          {currentStep === 4 && <FinalPayment onPrev={handlePrevStep} />}
        </div>
      </main>
    </div>
  )
}

function ShippingInformation({ onNext }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Enter your name" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </div>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" placeholder="Enter your address" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" placeholder="Enter your city" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="state">State</Label>
            <Input id="state" placeholder="Enter your state" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="zip">Zip</Label>
            <Input id="zip" placeholder="Enter your zip code" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="country">Country</Label>
            <Input id="country" placeholder="Enter your country" />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  )
}

function PaymentMethod({ onNext, onPrev }) {
  return (
    <div className="space-y-6">
      <RadioGroup defaultValue="card">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="card" id="card" />
          <Label htmlFor="card">Credit Card</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="paypal" id="paypal" />
          <Label htmlFor="paypal">PayPal</Label>
        </div>
      </RadioGroup>
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onPrev}>Previous</Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  )
}

function OrderReview({ onNext, onPrev }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label>Shipping Information</Label>
          <div className="grid gap-1 text-sm text-muted-foreground">
            <div>John Doe</div>
            <div>123 Main St</div>
            <div>Anytown, CA 12345</div>
            <div>United States</div>
          </div>
        </div>
        <div className="grid gap-2">
          <Label>Payment Method</Label>
          <div className="text-sm text-muted-foreground">Credit Card</div>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label>Order Summary</Label>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>$99.99</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span>$5.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Tax</span>
              <span>$10.00</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between font-medium">
              <span>Total</span>
              <span>$114.99</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onPrev}>Previous</Button>
        <Button onClick={onNext}>Proceed to Payment</Button>
      </div>
    </div>
  )
}

function FinalPayment({ onPrev }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="card-number">Card Number</Label>
          <Input id="card-number" placeholder="Enter your card number" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="expiry-date">Expiry Date</Label>
            <Input id="expiry-date" placeholder="MM/YY" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cvc">CVC</Label>
            <Input id="cvc" placeholder="CVC" />
          </div>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="cardholder-name">Cardholder Name</Label>
          <Input id="cardholder-name" placeholder="Enter cardholder name" />
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onPrev}>Previous</Button>
        <Button>Place Order</Button>
      </div>
    </div>
  )
}