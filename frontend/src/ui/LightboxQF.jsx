import useUpdateStats from "../hooks/useUpdateStats";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/uploads"
    : "https://www.mertaslanmatematik.com/api/uploads";

const BUNNY_KEY = import.meta.env.BUNNY_KEY;

function LightboxQF({ props }) {
  const {
    lightboxOpen,
    setLightboxOpen,
    statOfDay,
    pullZoneURL,
    currentImageIndex,
    setCurrentImageIndex,
  } = props;
  const { mutate: updateStats, isPending: isUpdating } = useUpdateStats();

  if (!lightboxOpen || !statOfDay) return null;

  const deleteFromBunny = async () => {
    /* unsolvedQuestions dan sil */
    const response = await fetch(
      `${API_URL}/unsolved-question-url/${statOfDay.unsolvedQPaths[currentImageIndex]}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();

    try {
      await fetch(`${data.deleteUrl}`, {
        method: "DELETE",
        headers: {
          AccessKey: BUNNY_KEY,
        },
      });
    } catch (error) {
      console.log(error);
    }

    /* stats dan sil */
    const updatedQPath = statOfDay.unsolvedQPaths.filter(
      (p) => p !== statOfDay.unsolvedQPaths[currentImageIndex]
    );
    const updatedStats = { ...statOfDay, unsolvedQPaths: [...updatedQPath] };
    updateStats(updatedStats);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <div className="absolute z-10 flex gap-3 top-4 right-4">
        {/* Delete Button */}
        <button
          className="flex items-center justify-center w-10 h-10 text-white transition-colors bg-red-500 rounded-full hover:bg-red-600"
          onClick={(e) => {
            e.stopPropagation();
            deleteFromBunny();
          }}
          title="Delete image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>

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
            src={pullZoneURL + statOfDay.unsolvedQPaths[currentImageIndex]}
            alt={`Enlarged ${currentImageIndex + 1}`}
            className="max-w-[90vw] max-h-[80vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        {/* Image Counter - Now positioned below image */}
        <div className="py-2 text-white">
          {currentImageIndex + 1} / {statOfDay.unsolvedQPaths.length}
        </div>
      </div>

      <button
        className="absolute z-10 flex items-center justify-center w-10 h-10 text-3xl text-white transform -translate-y-1/2 rounded-full left-4 top-1/2 bg-black/50"
        onClick={(e) => {
          e.stopPropagation();
          setCurrentImageIndex((prev) =>
            prev > 0 ? prev - 1 : statOfDay.unsolvedQPaths.length - 1
          );
        }}
      >
        &lt;
      </button>

      <button
        className="absolute z-10 flex items-center justify-center w-10 h-10 text-3xl text-white transform -translate-y-1/2 rounded-full right-4 top-1/2 bg-black/50"
        onClick={(e) => {
          e.stopPropagation();
          setCurrentImageIndex((prev) =>
            prev < statOfDay.unsolvedQPaths.length - 1 ? prev + 1 : 0
          );
        }}
      >
        &gt;
      </button>
    </div>
  );
}

export default LightboxQF;
