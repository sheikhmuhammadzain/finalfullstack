import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Minus, Plus, X } from 'lucide-react';

const CartItem = ({ item, updateItem, removeItem }) => (
  <div className="flex items-center py-6 border-b border-neutral-100">
    <img
      src={item.product.image}
      alt={item.product.name}
      className="w-20 h-20 object-cover"
    />
    <div className="ml-6 flex-grow">
      <h3 className="font-serif text-lg text-neutral-800">{item.product.name}</h3>
      <p className="text-sm text-neutral-500 font-light mt-1">${item.product.price}</p>
    </div>
    <div className="flex items-center space-x-4">
      <div className="flex items-center border border-neutral-200">
        <button
          className="p-2 hover:bg-neutral-50 transition-colors"
          onClick={() => updateItem(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          <Minus className="w-4 h-4 text-neutral-600" />
        </button>
        <span className="px-4 font-light text-neutral-800">{item.quantity}</span>
        <button
          className="p-2 hover:bg-neutral-50 transition-colors"
          onClick={() => updateItem(item.id, item.quantity + 1)}
        >
          <Plus className="w-4 h-4 text-neutral-600" />
        </button>
      </div>
      <button
        className="p-2 hover:text-neutral-800 transition-colors text-neutral-400"
        onClick={() => removeItem(item.id)}
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  </div>
);

const EmptyCart = () => (
  <div className="text-center py-16">
    <h2 className="font-serif text-2xl text-neutral-800 mb-4">Your cart is empty</h2>
    <p className="text-neutral-500 font-light mb-8">Add some items to start your order</p>
    <Link
      to="/"
      className="inline-block bg-neutral-900 text-white px-8 py-3 font-light hover:bg-neutral-800 transition-colors"
    >
      Continue Shopping
    </Link>
  </div>
);

const Cart = () => {
  const { cartItems, loading, error, updateItem, removeItem, getCartTotal } = useCart();

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 pt-32 pb-16">
        <div className="text-center text-neutral-500 font-light">Loading cart...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 pt-32 pb-16">
        <div className="text-center text-red-500 font-light">{error}</div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 pt-32 pb-16">
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pt-32 pb-16">
      <div className="text-center mb-12">
        <h1 className="font-serif text-3xl text-neutral-800 mb-4">Shopping Cart</h1>
        <p className="text-neutral-500 font-light">Review your items before checkout</p>
      </div>

      <div className="mb-12">
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            updateItem={updateItem}
            removeItem={removeItem}
          />
        ))}
      </div>

      <div className="border-t border-neutral-200 pt-8">
        <div className="flex justify-between items-center mb-8">
          <span className="font-serif text-xl text-neutral-800">Total</span>
          <span className="font-serif text-xl text-neutral-800">
            ${getCartTotal().toFixed(2)}
          </span>
        </div>
        <div className="flex justify-end">
          <Link
            to="/checkout"
            className="bg-neutral-900 text-white px-8 py-3 font-light hover:bg-neutral-800 transition-colors"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
