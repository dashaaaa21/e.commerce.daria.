import { useParams, Link } from "react-router-dom";
import { useCallback } from "react";
import { useFetch } from "../hooks/useFetch";
import { fetchProductById } from "../services/api";
import { useFavourites } from "../hooks/useFavourites";
import { useCart } from "../hooks/useCart";
import Loading from "../components/Loading";
import Error from "../components/Error";
import heartFilled from "../assets/heart2.png";
import heartOutline from "../assets/heart.png";

function ProductDetailPage() {
  const { id } = useParams();
  const { isFavourite, toggleFavourite } = useFavourites();
  const { addToCart } = useCart();

  const fetchProduct = useCallback(() => fetchProductById(id), [id]);

  const {
    data: product,
    loading,
    error,
    refetch,
  } = useFetch(fetchProduct, [id]);

  const favourite = product ? isFavourite(product.id) : false;

  const handleFavouriteClick = () => {
    if (product) {
      toggleFavourite(product.id);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product.id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Error message={error} onRetry={refetch} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Link
          to="/"
          className="inline-flex items-center text-sky-400 hover:text-sky-300 font-medium mb-8 transition-colors"
        >
          <span className="mr-2">&lt;</span> Back to Products
        </Link>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative bg-gray-900 p-12 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-96 w-full object-contain"
              />
              <button
                data-testid="favourite-btn"
                onClick={handleFavouriteClick}
                className="absolute top-8 right-8 p-4 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300"
              >
                <img
                  src={favourite ? heartFilled : heartOutline}
                  alt={favourite ? "Remove from favourites" : "Add to favourites"}
                  className="w-6 h-6"
                />
              </button>
            </div>

            <div className="p-12 flex flex-col justify-center">
              <span className="inline-block px-4 py-2 bg-sky-100 text-sky-700 text-sm font-medium rounded-full mb-6 w-fit capitalize">
                {product.category}
              </span>

              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                {product.title}
              </h1>

              <div className="flex items-center gap-6 mb-8">
                <p className="text-5xl font-bold text-gray-900">
                  ${product.price}
                </p>
                {product.rating && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700 font-medium text-lg">
                      Rating: {product.rating.rate}
                    </span>
                    <span className="text-gray-500">
                      ({product.rating.count} reviews)
                    </span>
                  </div>
                )}
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Description
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>

              <button 
                onClick={handleAddToCart}
                className="w-full bg-sky-400 hover:bg-sky-300 text-white px-8 py-5 rounded-full transition-colors duration-300 text-lg font-bold shadow-lg hover:shadow-xl">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
