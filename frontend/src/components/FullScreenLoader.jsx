const FullScreenLoader = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
    </div>
  );
};

export default FullScreenLoader;
