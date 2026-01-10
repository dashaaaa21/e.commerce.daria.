function Error({ message, onRetry }) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center bg-red-50 border border-red-200 rounded-lg p-8 max-w-md">
        <h3 className="text-xl font-semibold text-red-800 mb-2">
          Oops! Something went wrong
        </h3>
        <p className="text-red-600 mb-4">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors duration-300"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

export default Error;
