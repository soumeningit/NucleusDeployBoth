import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import DashboardHeader from "../Components/DashboardHeader";
import { FiShoppingCart, FiTrash2, FiTag } from "react-icons/fi";

// --- Mock Data ---
// In a real application, you would fetch this data from your API or a global state (like Context/Redux).
const mockCartData = [
  {
    id: 1,
    title: "Introduction to React",
    instructor: "Jane Smith",
    thumbnailUrl: "https://placehold.co/600x400/3B82F6/FFFFFF?text=React",
    price: 49.99,
  },
  {
    id: 4,
    title: "UI/UX Design Fundamentals",
    instructor: "Michael Brown",
    thumbnailUrl: "https://placehold.co/600x400/EC4899/FFFFFF?text=UI/UX",
    price: 39.99,
  },
  {
    id: 3,
    title: "Python for Data Science",
    instructor: "Emily White",
    thumbnailUrl: "https://placehold.co/600x400/F59E0B/FFFFFF?text=Python",
    price: 99.99,
  },
];

// Main Page Component
function CartPage() {
  const [cartItems, setCartItems] = useState(mockCartData);
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState("");

  // Calculate subtotal whenever cart items change
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price, 0);
  }, [cartItems]);

  // Calculate total whenever subtotal or discount changes
  const total = useMemo(() => {
    const discountAmount = (subtotal * discountPercent) / 100;
    return subtotal - discountAmount;
  }, [subtotal, discountPercent]);

  const handleRemoveItem = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleApplyCoupon = () => {
    setCouponError("");
    // Mock coupon validation
    if (couponCode.toUpperCase() === "NUCLEUS10") {
      setDiscountPercent(10);
    } else {
      setDiscountPercent(0);
      setCouponError("Invalid coupon code.");
    }
  };

  // If cart is empty, show a different view
  if (cartItems.length === 0) {
    return (
      <div>
        <DashboardHeader title="Shopping Cart" />
        <div className="mt-8 text-center bg-white p-12 rounded-lg shadow-sm">
          <FiShoppingCart size={48} className="mx-auto text-slate-400" />
          <h3 className="mt-4 text-xl font-bold text-slate-800">
            Your cart is empty
          </h3>
          <p className="mt-2 text-slate-500">
            Looks like you haven't added any courses to your cart yet.
          </p>
          <Link
            to="/courses"
            className="mt-6 inline-block bg-indigo-600 text-white font-semibold py-2 px-5 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Browse Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <DashboardHeader title="Shopping Cart" />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold text-slate-700">
            {cartItems.length} Courses in Cart
          </h2>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-lg shadow-sm flex items-start sm:items-center space-x-4"
            >
              <img
                src={item.thumbnailUrl}
                alt={item.title}
                className="w-28 h-20 sm:w-32 sm:h-20 object-cover rounded-md flex-shrink-0"
              />
              <div className="flex-grow">
                <h3 className="font-bold text-slate-800">{item.title}</h3>
                <p className="text-sm text-slate-500">by {item.instructor}</p>
              </div>
              <div className="flex flex-col sm:flex-row items-end sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
                <p className="text-lg font-semibold text-indigo-600">
                  ${item.price.toFixed(2)}
                </p>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-slate-400 hover:text-red-500 transition-colors p-1"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
            <h2 className="text-xl font-semibold text-slate-700 border-b pb-4">
              Order Summary
            </h2>
            <div className="space-y-4 py-4">
              <div className="flex justify-between">
                <span className="text-slate-600">Subtotal</span>
                <span className="font-semibold text-slate-800">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({discountPercent}%)</span>
                  <span>
                    - ${((subtotal * discountPercent) / 100).toFixed(2)}
                  </span>
                </div>
              )}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-slate-800">Total</span>
                <span className="text-2xl font-extrabold text-indigo-600">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Coupon Code */}
            <div className="mt-6">
              <label
                htmlFor="coupon"
                className="flex items-center text-sm font-medium text-slate-700 mb-2"
              >
                <FiTag className="mr-2" /> Apply Coupon
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  id="coupon"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="e.g., NUCLEUS10"
                  className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-slate-200 text-slate-700 font-semibold px-4 rounded-md hover:bg-slate-300 transition-colors"
                >
                  Apply
                </button>
              </div>
              {couponError && (
                <p className="text-xs text-red-500 mt-1">{couponError}</p>
              )}
              {discountPercent > 0 && (
                <p className="text-xs text-green-600 mt-1">
                  Coupon applied successfully!
                </p>
              )}
            </div>

            <button className="w-full mt-6 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors text-lg">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
