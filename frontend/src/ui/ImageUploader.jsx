import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const ImageUploader = (props) => {
  const [files, setFiles] = useState([]);
  const { handleFilesSelected, isImagesUploaded, setIsImagesUploaded } = props;
  const onDrop = useCallback(
    (acceptedFiles) => {
      const mappedFiles = acceptedFiles.map((file) => ({
        ...file,
        rawFile: file,
        preview: URL.createObjectURL(file),
        id: Math.random().toString(36).slice(2),
      }));

      setFiles(mappedFiles);
      if (handleFilesSelected) handleFilesSelected(mappedFiles);
    },
    [handleFilesSelected]
  );

  const removeFile = (id) => {
    const updatedFiles = files.filter((file) => file.id !== id);
    setFiles(updatedFiles);
    if (handleFilesSelected) handleFilesSelected(updatedFiles);
  };

  const clearAll = () => {
    files.forEach((file) => URL.revokeObjectURL(file.preview));
    setFiles([]);
    if (handleFilesSelected) handleFilesSelected([]);
  };

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    noClick: true,
    noKeyboard: true,
  });

  useEffect(() => {
    clearAll();
    setIsImagesUploaded(false);
  }, [isImagesUploaded]);

  return (
    <div className="max-w-3xl mx-auto max-h-[75px] overflow-auto no-scrollbar">
      {/* COMPACT DROPZONE */}
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-1 text-center cursor-pointer
          transition-all duration-300 flex items-center justify-around
          ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400 bg-gray-50"
          }
        `}
      >
        <input {...getInputProps()} />

        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 ${
              isDragActive ? "text-blue-500" : "text-gray-500"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>

          <div className="text-left">
            <p className="text-sm font-medium text-gray-800">
              {isDragActive ? "Drop images" : "Drag & drop or"}
            </p>
            <p className="text-xs text-gray-500">JPG, PNG, WEBP (Max 10MB)</p>
          </div>
        </div>

        <button
          type="button"
          onClick={open}
          className="px-3 py-1 text-xs text-white transition-colors bg-blue-600 rounded hover:bg-blue-700"
        >
          Browse
        </button>
      </div>

      {/* COMPACT PREVIEW SECTION */}
      {files.length > 0 && (
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-gray-700">
              {files.length} file{files.length !== 1 ? "s" : ""}
            </span>
            <button
              type="button"
              onClick={clearAll}
              className="text-xs font-medium text-red-600 hover:text-red-800"
            >
              Clear all
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {files.map((file) => (
              <div
                key={file.id}
                className="relative w-16 h-16 border border-gray-200 rounded-md"
              >
                <img
                  src={file.preview}
                  alt={file.name}
                  className="object-cover w-full h-full rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeFile(file.id)}
                  className="absolute flex items-center justify-center w-4 h-4 text-white bg-red-500 rounded-full -top-1 -right-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
