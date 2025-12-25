
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { icons } from "@/index";

interface ImageGalleryModalProps {
  isOpen: boolean;
  images: string[];
  onClose: () => void;
  onImageClick: (index: number) => void;
}

const BATCH_SIZE = 20;

export const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({
  isOpen,
  images,
  onClose,
  onImageClick,
}) => {
  const safeImages = Array.isArray(images) ? images : [];

  // Hooks MUST be unconditional
  const [visibleCount, setVisibleCount] = React.useState(BATCH_SIZE);
  const loadMoreRef = React.useRef<HTMLDivElement | null>(null);

  // Reset when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setVisibleCount(BATCH_SIZE);
    }
  }, [isOpen]);

  // Infinite scroll observer
  React.useEffect(() => {
    if (!isOpen || !loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) =>
            Math.min(prev + BATCH_SIZE, safeImages.length)
          );
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [isOpen, safeImages.length]);

  //  Early return AFTER hooks
  if (!isOpen) return null;

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
          {/* HEADER */}
          <div className="flex justify-between items-center p-4 bg-[#785ef7]">
            <h2 className="text-xl font-bold text-white">Hotel Photos</h2>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition"
            >
              <icons.X className="w-6 h-6" />
            </button>
          </div>

          {/* GALLERY */}
          <div className="p-4 overflow-y-auto max-h-[calc(90vh-80px)] custom-scrollbar">
            {safeImages.length > 0 ? (
              <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-2 space-y-2">
                {safeImages.slice(0, visibleCount).map((img, index) => (
                  <ImageWithSkeleton
                    key={index}
                    src={img}
                    index={index}
                    onClick={onImageClick}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No images available</p>
            )}

            {visibleCount < safeImages.length && (
              <div
                ref={loadMoreRef}
                className="h-12 flex items-center justify-center text-xs text-gray-400"
              >
                Loading more images…
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

interface ImageWithSkeletonProps {
  src: string;
  index: number;
  onClick: (index: number) => void;
}

const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  src,
  index,
  onClick,
}) => {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <div
      className="break-inside-avoid relative mb-4 cursor-pointer rounded-lg overflow-hidden"
      onClick={() => onClick(index)}
    >
      {!loaded && <Skeleton className="w-full h-45 rounded-lg" />}

      <img
        src={src}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`w-full rounded-lg object-cover transition-all duration-500 ${
          loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
        } hover:scale-105`}
        alt={`Hotel ${index}`}
      />
    </div>
  );
};

