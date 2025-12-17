
import { motion,AnimatePresence } from 'framer-motion';

interface ImageGalleryProps {
  isOpen: boolean;
  images: string[];
  onClose: () => void;
  onImageClick: (index: number) => void;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  isOpen,
  images,
  onClose,
  onImageClick
}) => {
  if (!isOpen) return null;

  const safeImages = Array.isArray(images) ? images : [];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 z-999 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b bg-[#785ef7]">
            <h2 className="text-xl font-bold text-white">Hotel Photos</h2>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Gallery */}
          <div className="p-4 overflow-y-auto max-h-[calc(90vh-80px)]">
            {safeImages.length > 0 ? (
              <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-2 space-y-2">
                {safeImages.map((img, index) => (
                  <div
                    key={index}
                    className="break-inside-avoid relative mb-4 cursor-pointer rounded-lg overflow-hidden"
                    onClick={() => onImageClick(index)}
                  >
                    <img
                      src={img}
                      alt={`Hotel ${index}`}
                      className="w-full rounded-lg object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No images available</p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};