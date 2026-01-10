import { useMemo } from "react";
import { useFavourites } from "../hooks/useFavourites";
import { useMultipleFetch } from "../hooks/useFetch";
import { fetchProductById } from "../services/api";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import Error from "../components/Error";

function FavouritesPage() {
  const { favourites } = useFavourites();

  const fetchFunctions = useMemo(
    () => favourites.map((id) => () => fetchProductById(id)),
    [favourites]
  );

  const { data: products, loading, error, refetch } = useMultipleFetch(fetchFunctions);

  if (loading) {
    return (
      <div className="container mx-auto px-4 pb-8">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 pb-8">
        <Error message={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Favourites</h1>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="w-24 h-24 text-gray-300 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            No favourites yet
          </h2>
          <p className="text-gray-500">
            Start adding products to your favourites to see them here!
          </p>
        </div>
      ) : (
        <div>
          <p className="text-gray-600 mb-6">
            You have {products.length} favourite {products.length === 1 ? "product" : "products"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default FavouritesPage;
