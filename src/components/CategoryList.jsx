function CategoryList({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onCategoryChange("all")}
          className={`px-6 py-3 rounded-full transition-all duration-300 font-medium ${
            selectedCategory === "all"
              ? "bg-sky-400 text-white shadow-lg"
              : "bg-white text-gray-700 hover:bg-sky-100 shadow-sm"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-6 py-3 rounded-full transition-all duration-300 capitalize font-medium ${
              selectedCategory === category
                ? "bg-sky-400 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-sky-100 shadow-sm"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
