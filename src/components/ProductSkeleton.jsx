function ProductSkeleton() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm animate-pulse">
      <div className="h-80 bg-gray-300"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="flex items-center justify-between">
          <div className="h-8 bg-gray-300 rounded w-1/3"></div>
          <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default ProductSkeleton;
