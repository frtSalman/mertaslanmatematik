const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/uploads"
    : "https://www.mertaslanmatematik.com/api/uploads";

function LightboxQB({ props }) {
  const { lightboxOpen, setLightboxOpen, pullZoneURL } = props;

  if (!lightboxOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <div className="absolute z-10 flex gap-3 top-4 right-4">
        {/* Delete Button */}

        {/* Close Button */}
        <button
          className="flex items-center justify-center w-10 h-10 text-2xl text-white transition-colors bg-gray-700 rounded-full hover:bg-gray-800"
          onClick={(e) => {
            e.stopPropagation();
            setLightboxOpen(false);
          }}
          title="Close lightbox"
        >
          &times;
        </button>
      </div>

      <div className="flex flex-col items-center justify-center w-full h-full p-4">
        <div className="relative flex items-center justify-center flex-grow w-full">
          <img
            src={pullZoneURL}
            alt={`Enlarged pic`}
            className="max-w-[90vw] max-h-[80vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    </div>
  );
}

export default LightboxQB;
