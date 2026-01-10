import bannerImage from '../assets/banner-foto.jpg';

function HeroSection() {
  const scrollToProducts = () => {
    window.scrollTo({
      top: window.innerHeight - 100,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative text-white py-40">
      <div className="absolute inset-0">
        <img 
          src={bannerImage} 
          alt="Banner" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            New Clothes Shop
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Find your style. Buy clothes online.
          </p>
          <button
            onClick={scrollToProducts}
            className="inline-block bg-sky-400 text-white font-semibold px-8 py-4 rounded-full hover:bg-sky-300 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
