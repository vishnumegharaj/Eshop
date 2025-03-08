
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useDispatch, useSelector } from "react-redux";
import { use } from "react";
import { toast } from "react-hot-toast";

import { removeFromCart } from "../../api/cart";
import { loadState } from "./localstorage";

export default function CartItems() {
  const dispatch = useDispatch();
  // In your CartItems component
  const cart = useSelector((state) => {
    console.log("Full Redux state:", state); // Log the entire state to see its structure
    return state?.cart || [];
  });
  useEffect(() => {
    console.log("cart in cartitems", cart);
  }, [cart]);

  async function handleDelete(productId) {
    console.log("Deleting item from cart", productId);
    try {
      await removeFromCart(productId);
      loadState().then(loadedState => {
        if (loadedState) {
          // Dispatch an action to set the loaded state
          dispatch({
            type: 'INITIALIZE_CART',
            payload: loadedState
          });
        }
      });
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Failed to remove item from cart", error);
      toast.error("Failed to remove item from cart");
    }
  }


  return (
    <div className="space-y-6">
      <AnimatePresence>
        {cart?.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
          >
            <div className="overflow-hidden">
              <div className="group relative flex flex-col p-5 sm:flex-row sm:items-center bg-white border border-gray-200 shadow-sm rounded-2xl transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                {/* Product Image */}
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-200 shadow-sm">
                  <img
                    src={item.productDetails.imageURL || "/placeholder.svg"}
                    alt={item.productDetails.name}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Product Details */}
                <div className="mt-4 flex-grow sm:ml-6 sm:mt-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 tracking-wide">{item.productDetails.name}</h3>
                    <p className="mt-1 text-xl font-bold text-indigo-700 sm:mt-0">${item.productDetails.price.toFixed(2)}</p>
                  </div>

                  {/* Quantity Controls & Remove Button */}
                  <div className="mt-5 flex items-center justify-between">
                    {/* Redesigned Quantity Control */}
                    <div className="flex items-center gap-0">
                      <button className="h-8 w-8 flex items-center justify-center rounded-full  bg-white text-indigo-600 hover:bg-indigo-100 transition">
                        <Minus className="h-5 w-5" />
                      </button>
                      <span className="text-lg font-semibold text-gray-900 w-10 text-center">{item.cartItems.quantity}</span>
                      <button className="h-8 w-8 flex items-center justify-center rounded-full bg-white text-indigo-600 hover:bg-indigo-100 transition">
                        <Plus className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Remove Item Button */}
                    <button
                      onClick={() => handleDelete(item.productDetails._id)}
                      className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 shadow-md hover:bg-red-100 hover:text-red-600 transition"
                    >
                      <Trash2 className="h-5 w-5" />
                      <span className="sr-only">Remove item</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}