"use client"

import { motion } from "framer-motion"
import { Gift, ShieldCheck, Truck } from "lucide-react"
import { use } from "react"
import { useNavigate } from "react-router-dom"

export default function CartSummary({ subtotal }) {
  const shipping = subtotal > 100 ? 0 : 9.99
  const tax = subtotal * 0.07
  const total = subtotal + shipping + tax

  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="overflow-hidden border shadow-md rounded-xl bg-white">
        {/* Header Section */}
        <div className="bg-indigo-700 p-5 text-white">
          <h2 className="text-lg font-bold tracking-wide">Order Summary</h2>
          <p className="text-sm text-indigo-200">Review your purchase details</p>
        </div>

        {/* Order Details */}
        <div className="space-y-6 p-6">
          <div className="space-y-4 text-gray-800">
            <div className="flex justify-between text-[15px]">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[15px]">
              <span className="text-gray-600">Shipping</span>
              <span className={`font-semibold ${shipping === 0 ? "text-green-600" : ""}`}>
                {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-[15px]">
              <span className="text-gray-600">Tax (7%)</span>
              <span className="font-semibold">${tax.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-300 pt-4">
              <div className="flex justify-between">
                <span className="text-[16px] font-semibold text-gray-900">Total</span>
                <span className="text-xl font-bold text-indigo-700">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Checkout Button */}
          <button
           onClick={() => navigate("/createOrder")}
           className="w-full bg-indigo-700 text-white text-[16px] font-semibold tracking-wide rounded-lg py-3 transition hover:bg-indigo-800">
            Proceed to Checkout
          </button>

          {/* Additional Info */}
          <div className="space-y-3 pt-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-indigo-500" />
              <span>Secure checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-indigo-500" />
              <span>Free shipping on orders over $100</span>
            </div>
            <div className="flex items-center gap-2">
              <Gift className="h-4 w-4 text-indigo-500" />
              <span>30-day returns</span>
            </div>
          </div>

          {/* Payment Method Logos */}
          <div className="flex justify-center space-x-2 pt-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
              alt="Visa" className="h-6 w-10 object-contain" />

            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg"
              alt="MasterCard" className="h-6 w-10 object-contain" />

            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
              alt="PayPal" className="h-6 w-10 object-contain" />

            <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg"
              alt="Amex" className="h-6 w-10 object-contain" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}