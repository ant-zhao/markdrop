export default function SideBanner() {
  return (
    <div className="hidden flex-1 md:block">
      <div className="w-full min-h-screen flex flex-col justify-center items-center p-12 bg-white">
        <div className="w-full max-w-md">
          <img src="/logo.svg" alt="Logo" className="h-8 mb-8" />
          <h2 className="text-2xl font-semibold mb-4">
            Streamline your image editing process
          </h2>
          <p className="text-gray-600 mb-8">
            Remove watermarks in bulk with PixelBin.io
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="w-24 h-24 bg-gray-200 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
