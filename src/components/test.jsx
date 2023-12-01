
import React, { useState } from 'react';

function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('image', selectedFile);

    // TODO: Send the form data to the server
  };

  console.log(selectedFile);

  return (
    <div className="flex flex-col items-center justify-center">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        disabled={!selectedFile}
        className={`px-4 py-2 rounded-md text-white ${
          selectedFile ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Upload
      </button>
    </div>
  );
}

export default ImageUploader