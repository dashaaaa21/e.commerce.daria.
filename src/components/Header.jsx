import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import cartIcon from "../assets/icon.png";

function Header() {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-medium text-gray-900">
            e.commerce.daria.
          </Link>
          
          <Link to="/cart" data-testid="cart-icon" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
            <img src={cartIcon} alt="Cart" className="w-6 h-6" />
            {cartCount > 0 && (
              <span data-testid="cart-count" className="absolute -top-1 -right-1 bg-sky-400 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
