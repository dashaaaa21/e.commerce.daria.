import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useCart } from "../hooks/useCart";
import { useFetch } from "../hooks/useFetch";
import { fetchProductById } from "../services/api";
import { createOrder } from "../services/backendApi";
import Loading from "../components/Loading";

function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartCount } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const cartProductIds = cart.map(item => item.id);
  const fetchFunctions = cartProductIds.map(id => () => fetchProductById(id));

  const { data: products, loading } = useFetch(
    async () => {
      if (fetchFunctions.length === 0) return [];
      const results = await Promise.all(fetchFunctions.map(fn => fn()));
      return results;
    },
    [cartProductIds.length]
  );

  const getTotal = () => {
    if (!products) return 0;
    return cart.reduce((total, cartItem) => {
      const product = products.find(p => p.id === cartItem.id);
      return total + (product ? product.price * cartItem.quantity : 0);
    }, 0);
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const orderData = {
        items: cart.map(item => {
          const product = products.find(p => p.id === item.id);
          return {
            productId: item.id,
            quantity: item.quantity,
            price: product?.price || 0,
            title: product?.title || ''
          };
        }),
        total: getTotal(),
        customerEmail: 'customer@example.com'
      };
      
      const order = await createOrder(orderData);
      toast.success(`Order #${order.id} created successfully!`);
      clearCart();
    } catch (error) {
      toast.error('Failed to create order. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
          <div className="bg-white rounded-3xl p-12 text-center">
            <p className="text-gray-500 text-xl mb-8">Your cart is empty</p>
            <Link
              to="/"
              className="inline-block bg-sky-400 text-white font-semibold px-8 py-4 rounded-full hover:bg-sky-300 transition-all duration-300 shadow-lg"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Shopping Cart ({getCartCount()} items)</h1>
          <button
            onClick={clearCart}
            className="text-red-500 hover:text-red-600 font-medium transition-colors"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((cartItem) => {
              const product = products?.find(p => p.id === cartItem.id);
              if (!product) return null;

              return (
                <div key={cartItem.id} className="bg-white rounded-3xl p-6 flex gap-6 shadow-sm">
                  <Link to={`/product/${product.id}`} className="flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-32 h-32 object-contain bg-gray-900 rounded-2xl"
                    />
                  </Link>

                  <div className="flex-grow">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-sky-400 transition-colors">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-500 mb-4 capitalize">{product.category}</p>
                    <p className="text-2xl font-bold text-gray-900 mb-4">${product.price}</p>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2">
                        <button
                          onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center bg-white rounded-full hover:bg-sky-400 hover:text-white transition-colors font-bold"
                        >
                          -
                        </button>
                        <span className="font-medium w-8 text-center">{cartItem.quantity}</span>
                        <button
                          onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-white rounded-full hover:bg-sky-400 hover:text-white transition-colors font-bold"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(cartItem.id)}
                        className="text-red-500 hover:text-red-600 font-medium transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">
                      ${(product.price * cartItem.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-8 shadow-sm sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">${getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>${getTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-sky-400 text-white font-bold py-4 rounded-full hover:bg-sky-300 transition-all duration-300 shadow-lg hover:shadow-xl mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCheckingOut ? 'Processing...' : 'Checkout'}
              </button>

              <Link
                to="/"
                className="block text-center text-sky-400 hover:text-sky-300 font-medium transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
