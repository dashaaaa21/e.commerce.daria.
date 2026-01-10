import { Link } from "react-router-dom";
import { useFavourites } from "../hooks/useFavourites";
import { useCart } from "../hooks/useCart";
import heartFilled from "../assets/heart2.png";
import heartOutline from "../assets/heart.png";

function ProductCard({ product }) {
  const { isFavourite, toggleFavourite } = useFavourites();
  const { addToCart } = useCart();
  const favourite = isFavourite(product.id);

  const handleFavouriteClick = (e) => {
    e.preventDefault();
    toggleFavourite(product.id);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product.id);
  };

  return (
    <div data-testid="product-card" className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative h-80 bg-gray-900 overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
          />
          <button
            data-testid="favourite-btn"
            onClick={handleFavouriteClick}
            className="absolute top-6 left-6 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 z-10"
          >
            <img
              src={favourite ? heartFilled : heartOutline}
              alt={favourite ? "Remove from favourites" : "Add to favourites"}
              className="w-5 h-5"
            />
          </button>
          <button
            onClick={handleAddToCart}
            className="absolute bottom-6 right-6 px-6 py-3 bg-sky-400 text-white rounded-full shadow-lg hover:bg-sky-300 transition-all duration-300 z-10 font-medium"
          >
            Add to Cart
          </button>
        </div>
        <div className="p-6 relative">
          <h3 className="text-2xl font-bold text-gray-900 mb-2 line-clamp-1">
            {product.title}
          </h3>
          <p className="text-sm text-gray-500 mb-4 capitalize">{product.category}</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gray-900">${product.price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
