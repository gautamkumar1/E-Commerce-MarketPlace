"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'
import { useStripe, useElements, CardElement,Elements} from '@stripe/react-stripe-js';
import { toast } from 'react-toastify'

interface UserData {
  username: string;
  email: string;
  buyer:string
  seller:string
  userId:string
  address:string
}

const stripePromise = loadStripe('pk_test_51PTZieP9lvJdVilSFGGLEcIIUwEhr3zb6m9x0eFtdPCnI2mQwImEjuzQfctij8tIStYqvV3ybBFLdy8qJadMHn7600z3Zj30Yb'); // Replace with your Stripe publishable key
export default function Checkout() {
  const userData: UserData | null = localStorage.getItem('userData')
    ? JSON.parse(localStorage.getItem('userData') as string)
    : null;
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const totalSteps = 4;

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data: cart } = await axios.get('/api/cart', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const productDetailsPromises = cart.items.map(item =>
          axios.get(`/api/products/${item.productId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        );
        const products = await Promise.all(productDetailsPromises);
        const detailedItems = products.map((response, index) => ({
          ...response.data,
          quantity: cart.items[index].quantity,
        }));
        setOrderItems(detailedItems);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const calculateTotalAmount = () => {
    const subtotal = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const shipping = 500;
    const tax = subtotal * 0.1;
    return subtotal + shipping + tax;
  };

  const handlePlaceOrder = async (cardElement) => {
    try {
      const token = localStorage.getItem('token');
      let amount = calculateTotalAmount();

      amount = Math.round(amount * 100);

      const paymentIntentResponse = await axios.post(
        '/api/order/payment-intent',
        { amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { client_secret } = paymentIntentResponse.data;

      const stripe = await stripePromise;
      const { error } = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: shippingInfo.name,
            email: shippingInfo.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.zip,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (error) {
        console.error('Payment error:', error.message);
        return;
      }

      // Step 3: Prepare and send the order creation payload
    const orderPayload = {
      userId: userData?.userId, // Replace with actual user ID
      name: shippingInfo.name,
      email: shippingInfo.email,
      address: shippingInfo.address,
      city: shippingInfo.city,
      state: shippingInfo.state,
      zip: shippingInfo.zip,
      country: shippingInfo.country,
      items: orderItems.map(item => ({
        productId: item._id, 
        quantity: item.quantity
      })),
      total: amount, // total amount in the smallest currency unit
      paymentMethod: paymentMethod,
      stripePaymentIntentId: client_secret,
       status: 'pending' // Initial status
    };
    
    console.log('Order Payload:', orderPayload);
      const orderResponse = await axios.post(
        '/api/order',
        orderPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Order Placed Successfully")
      console.log('Order created:', orderResponse.data);
    } catch (error) {
      toast.error("Order Placed Failed")
      console.error('Error placing order:', error);
    }
  };

  return (
    <Elements stripe={stripePromise}>
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
            
            {loading ? (
              <div>Loading...</div>
            ) : (
              <>
                {currentStep === 1 && <ShippingInformation onNext={handleNextStep} setShippingInfo={setShippingInfo} />}
                {currentStep === 2 && <PaymentMethod onNext={handleNextStep} onPrev={handlePrevStep} setPaymentMethod={setPaymentMethod} />}
                {currentStep === 3 && <OrderReview onNext={handleNextStep} onPrev={handlePrevStep} orderItems={orderItems} calculateTotalAmount={calculateTotalAmount} />}
                {currentStep === 4 && <FinalPayment onPrev={handlePrevStep} handlePlaceOrder={handlePlaceOrder} />}
              </>
            )}
          </div>
        </main>
      </div>
    </Elements>
  );
}

function ShippingInformation({ onNext, setShippingInfo }) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  })

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormState(prevState => ({ ...prevState, [id]: value }))
  }

  const handleNext = () => {
    setShippingInfo(formState)
    onNext()
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Enter your name" value={formState.name} onChange={handleInputChange} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" value={formState.email} onChange={handleInputChange} />
        </div>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" placeholder="Enter your address" value={formState.address} onChange={handleInputChange} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" placeholder="Enter your city" value={formState.city} onChange={handleInputChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="state">State</Label>
            <Input id="state" placeholder="Enter your state" value={formState.state} onChange={handleInputChange} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="zip">Zip</Label>
            <Input id="zip" placeholder="Enter your zip code" value={formState.zip} onChange={handleInputChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="country">Country</Label>
            <Input id="country" placeholder="Enter your country" value={formState.country} onChange={handleInputChange} />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  )
}

function PaymentMethod({ onNext, onPrev, setPaymentMethod }) {
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value)
  }

  return (
    <div className="space-y-6">
      <RadioGroup defaultValue="card" onChange={handlePaymentMethodChange}>
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

function OrderReview({ onNext, onPrev, orderItems, calculateTotalAmount }) {
  return (
    <div className="space-y-6">
      <h2>Order Review</h2>
      <ul>
        {orderItems.map(item => (
          <li key={item._id}>
            {item.name} - ${item.price / 100} x {item.quantity}
          </li>
        ))}
      </ul>
      <div>Total Amount: ${(calculateTotalAmount() / 100).toFixed(2)}</div>
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onPrev}>Previous</Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  )
}


function FinalPayment({ onPrev, handlePlaceOrder }) {
  const stripe = useStripe();
  const elements = useElements();
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleCardChange = (event) => {
    setCardComplete(event.complete);
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError('Card element is not available.');
      setProcessing(false);
      return;
    }

    try {
      await handlePlaceOrder(cardElement);
    } catch (error) {
      setError('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Final Payment</h2>
      <div className="space-y-4">
        <Label htmlFor="card-element">Credit or Debit Card</Label>
        <div className="border border-muted rounded-md p-2">
          <CardElement id="card-element" onChange={handleCardChange} options={{ hidePostalCode: true ,style:{
            base:{
              color: 'white',
              '::placeholder': {
                color: 'gray'  // Placeholder color
              }
            }
          }}} />
        </div>
        {error && <div className="text-red-500">{error}</div>}
      </div>
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onPrev} disabled={processing}>Previous</Button>
        <Button onClick={handleSubmit} disabled={!stripe || !cardComplete || processing}>
          {processing ? 'Processing...' : 'Place Order'}
        </Button>
      </div>
    </div>
  );
}