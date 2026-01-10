import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const FavouritesContext = createContext();

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem("favourites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const addFavourite = (productId) => {
    setFavourites((prev) => [...prev, productId]);
    toast.success("Added to favourites!");
  };

  const removeFavourite = (productId) => {
    setFavourites((prev) => prev.filter((id) => id !== productId));
    toast.success("Removed from favourites");
  };

  const toggleFavourite = (productId) => {
    if (favourites.includes(productId)) {
      removeFavourite(productId);
    } else {
      addFavourite(productId);
    }
  };

  const isFavourite = (productId) => {
    return favourites.includes(productId);
  };

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        addFavourite,
        removeFavourite,
        toggleFavourite,
        isFavourite,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}
