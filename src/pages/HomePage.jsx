import { useState, useCallback, useMemo } from "react";
import CategoryList from "../components/CategoryList";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { useFetch } from "../hooks/useFetch";
import { fetchCategories, fetchProducts } from "../services/api";
import foto1 from "../assets/foto1.jpg";
import foto2 from "../assets/foto2.jpg";
import foto3 from "../assets/foto3.jpg";

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openFaq, setOpenFaq] = useState(null);
  const [activeSocial, setActiveSocial] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetch(fetchCategories, []);

  const fetchProductsCallback = useCallback(
    () => fetchProducts(selectedCategory === "all" ? null : selectedCategory),
    [selectedCategory]
  );

  const {
    data: products,
    loading: productsLoading,
    error: productsError,
    refetch,
  } = useFetch(fetchProductsCallback, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const error = categoriesError || productsError;

  const filteredAndSortedProducts = useMemo(() => {
    if (!products) return [];

    let filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortBy === "price-low") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [products, searchQuery, sortBy]);

  const faqs = [
    {
      question: "How to order?",
      answer: "Click on the clothes you like. Click 'Add to Cart'. Then go to cart and click 'Checkout'."
    },
    {
      question: "Can I return clothes?",
      answer: "Yes! You can return clothes in 30 days. The clothes must be new and clean."
    },
    {
      question: "Do you ship to other countries?",
      answer: "Yes, we ship to many countries. Shipping time is 5-10 days."
    },
    {
      question: "How to pick up my order?",
      answer: "You can pick up at our store. We will send you a message when your order is ready."
    }
  ];

  if (error) {
    return (
      <div className="container mx-auto px-4 pb-8">
        <Error message={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">New Clothes</h2>
        
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 w-full">
            <input
              type="text"
              placeholder="Search clothes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-3 rounded-full border-2 border-gray-200 focus:border-sky-400 focus:outline-none transition-colors text-sky-600 placeholder-sky-400"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-6 py-3 rounded-full border-2 border-gray-200 focus:border-sky-400 focus:outline-none transition-colors bg-white text-sky-600 w-full md:w-auto"
          >
            <option value="default">Sort by</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>
        
        {categoriesLoading ? (
          <Loading />
        ) : (
          <CategoryList
            categories={categories || []}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        )}

        {productsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {[...Array(8)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {filteredAndSortedProducts.length > 0 ? (
              filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-xl">No clothes found</p>
              </div>
            )}
          </div>
        )}
      </div>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Good Clothes for You
          </h2>
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-lg text-gray-600 mb-8">
              We have nice clothes. Good quality. Good price.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <img 
                src={foto1} 
                alt="Featured product 1" 
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <img 
                src={foto2} 
                alt="Featured product 2" 
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <img 
                src={foto3} 
                alt="Featured product 3" 
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl border-2 border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-xl font-bold text-gray-900">{faq.question}</h3>
                  <div className="w-12 h-12 rounded-full border-2 border-gray-900 flex items-center justify-center flex-shrink-0 ml-4">
                    <span className="text-2xl transform transition-transform duration-300" style={{
                      transform: openFaq === index ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}>
                      v
                    </span>
                  </div>
                </button>
                {openFaq === index && (
                  <div className="px-8 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-gradient-to-br from-sky-500 via-sky-400 to-sky-500 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-8">
          </div>
          
          <h2 className="text-5xl font-bold mb-6">Join Us!</h2>
          <p className="text-xl text-sky-100 mb-12 max-w-2xl mx-auto">
            Follow us on social media. Get news about new clothes and sales.
          </p>

          <div className="bg-white rounded-full p-2 max-w-3xl mx-auto mb-12 flex flex-wrap gap-2 justify-center">
            <button 
              onClick={() => setActiveSocial(activeSocial === 'instagram' ? null : 'instagram')}
              className={`px-8 py-3 rounded-full transition-colors font-medium ${
                activeSocial === 'instagram' 
                  ? 'bg-sky-400 text-white' 
                  : 'text-gray-700 hover:bg-sky-100'
              }`}
            >
              Instagram
            </button>
            <button 
              onClick={() => setActiveSocial(activeSocial === 'twitter' ? null : 'twitter')}
              className={`px-8 py-3 rounded-full transition-colors font-medium ${
                activeSocial === 'twitter' 
                  ? 'bg-sky-400 text-white' 
                  : 'text-gray-700 hover:bg-sky-100'
              }`}
            >
              Twitter
            </button>
            <button 
              onClick={() => setActiveSocial(activeSocial === 'linkedin' ? null : 'linkedin')}
              className={`px-8 py-3 rounded-full transition-colors font-medium ${
                activeSocial === 'linkedin' 
                  ? 'bg-sky-400 text-white' 
                  : 'text-gray-700 hover:bg-sky-100'
              }`}
            >
              LinkedIn
            </button>
            <button 
              onClick={() => setActiveSocial(activeSocial === 'whatsapp' ? null : 'whatsapp')}
              className={`px-8 py-3 rounded-full transition-colors font-medium ${
                activeSocial === 'whatsapp' 
                  ? 'bg-sky-400 text-white' 
                  : 'text-gray-700 hover:bg-sky-100'
              }`}
            >
              Whatsapp
            </button>
            <button 
              onClick={() => setActiveSocial(activeSocial === 'pinterest' ? null : 'pinterest')}
              className={`px-8 py-3 rounded-full transition-colors font-medium ${
                activeSocial === 'pinterest' 
                  ? 'bg-sky-400 text-white' 
                  : 'text-gray-700 hover:bg-sky-100'
              }`}
            >
              Pinterest
            </button>
          </div>

          {activeSocial && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto mb-8">
              <p className="text-white text-lg">
                Follow us on {activeSocial.charAt(0).toUpperCase() + activeSocial.slice(1)}: <span className="font-bold">@example.com</span>
              </p>
            </div>
          )}

          <p className="text-sky-200 text-sm">©2024, All Right Reserved.</p>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
