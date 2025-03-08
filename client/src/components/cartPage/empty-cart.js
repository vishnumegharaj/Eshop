import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EmptyCart() {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className=" items-center justify-center rounded-2xl bg-white p-8 text-center shadow-sm"
    >
      {/* Shopping Bag Icon */}
      <div className="relative mb-6 flex flex-col">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100"
        >
          <ShoppingBag className="h-12 w-12 text-indigo-600" />
        </motion.div>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white"
        >
          0
        </motion.div>
      </div>

      {/* Heading & Text */}
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mb-2 text-2xl font-bold text-gray-900"
      >
        Your cart is empty
      </motion.h2>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mb-8 max-w-md text-gray-500"
      >
        Looks like you haven't added anything to your cart yet. Explore our
        products and find something you'll love!
      </motion.p>

      {/* Continue Shopping Button */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="w-full flex justify-center"
      >
        <button 
        onClick={() => navigate("/Products")}
        className="bg-indigo-600 px-8 py-3 text-base font-medium text-white rounded-md hover:bg-indigo-700">
          Continue Shopping
        </button>
      </motion.div>

      {/* Suggested Products Placeholder */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
      >
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
            className="rounded-lg bg-indigo-50 p-4 shadow-md"
          >
            <div className="mb-3 h-24 rounded-md bg-indigo-100" />
            <div className="h-4 w-3/4 rounded-full bg-indigo-300" />
            <div className="mt-2 h-3 w-1/2 rounded-full bg-indigo-300" />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
