import { Link, useLocation } from "react-router-dom";
import { useFavourites } from "../hooks/useFavourites";

function Navigation() {
  const location = useLocation();
  const { favourites } = useFavourites();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center h-16 space-x-8">
          <Link
            to="/"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              isActive("/")
                ? "bg-sky-400 text-white"
                : "text-gray-700 hover:bg-sky-100"
            }`}
          >
            Home
          </Link>
          <Link
            to="/favourites"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
              isActive("/favourites")
                ? "bg-sky-400 text-white"
                : "text-gray-700 hover:bg-sky-100"
            }`}
          >
            Favourites
            {favourites.length > 0 && (
              <span className="bg-sky-400 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {favourites.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
