import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Input = ({ label, ...props }) => (
  <div className="mb-6">
    <label className="block text-neutral-600 font-light text-sm mb-2">
      {label}
    </label>
    <input
      className="w-full px-4 py-3 border border-neutral-200 font-light focus:outline-none focus:border-neutral-400 transition-colors"
      {...props}
    />
  </div>
);

const OrderSummaryItem = ({ name, quantity, price }) => (
  <div className="flex justify-between py-2 font-light">
    <span className="text-neutral-600">
      {name} × {quantity}
    </span>
    <span className="text-neutral-800">${price.toFixed(2)}</span>
  </div>
);

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send the order to your backend
    // For now, we'll just simulate a successful order
    alert('Order placed successfully!');
    clearCart();
    navigate('/');
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pt-32 pb-16">
      <div className="text-center mb-12">
        <h1 className="font-serif text-3xl text-neutral-800 mb-4">Checkout</h1>
        <p className="text-neutral-500 font-light">Complete your order</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Checkout Form */}
        <div className="space-y-8">
          <div>
            <h2 className="font-serif text-xl text-neutral-800 mb-6">Shipping Information</h2>
            <form onSubmit={handleSubmit}>
              <Input
                label="Full Name"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                label="Email"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                label="Address"
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="City"
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="ZIP Code"
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-neutral-900 text-white py-4 px-6 font-light hover:bg-neutral-800 transition-colors mt-8"
              >
                Place Order (${getCartTotal().toFixed(2)})
              </button>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-neutral-50 p-8">
            <h2 className="font-serif text-xl text-neutral-800 mb-6">Order Summary</h2>
            <div className="space-y-1">
              {cartItems.map((item) => (
                <OrderSummaryItem
                  key={item.id}
                  name={item.product.name}
                  quantity={item.quantity}
                  price={item.product.price * item.quantity}
                />
              ))}
            </div>
            <div className="border-t border-neutral-200 mt-6 pt-6">
              <div className="flex justify-between items-center">
                <span className="font-serif text-lg text-neutral-800">Total</span>
                <span className="font-serif text-lg text-neutral-800">
                  ${getCartTotal().toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-sm text-neutral-500 font-light">
              By placing your order, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;