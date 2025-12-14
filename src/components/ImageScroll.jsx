import React, { useEffect, useState } from 'react';

const ImageScroll = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;

    // Auto-scroll to next image every 3 seconds
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div className="w-full overflow-hidden bg-black dark:bg-black py-4 sm:py-8 md:py-12">
      <div className="relative w-full">
        {/* Image Container */}
        <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-[500px] overflow-hidden shadow-2xl">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image.src}
                alt={image.alt || `Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="text-white text-lg sm:text-xl md:text-2xl font-semibold">
                    {image.caption}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-[#05B1DE]'
                  : 'w-2 bg-gray-500 hover:bg-gray-400'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageScroll;
