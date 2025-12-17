
import { useEffect, useRef } from "react";
import {motion , AnimatePresence} from 'framer-motion'
interface ImageZoomModalProps {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onThumbnailClick: (index: number) => void;
}

export const ImageZoomModal: React.FC<ImageZoomModalProps> = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onPrevious,
  onNext,
  onThumbnailClick
}) => {
  const thumbStripRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const activeThumb = thumbRefs.current[currentIndex];
    if (activeThumb) {
      activeThumb.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [currentIndex]);

  const toggleZoom = (e: React.MouseEvent<HTMLImageElement>) => {
    const el = e.target as HTMLImageElement;
    if (!el.dataset.zoom || el.dataset.zoom === "out") {
      el.style.transform = "scale(2.2)";
      el.dataset.zoom = "in";
      el.style.cursor = "zoom-out";
    } else {
      el.style.transform = "scale(1)";
      el.dataset.zoom = "out";
      el.style.cursor = "zoom-in";
    }
  };

  if (!isOpen) return null;

  const safeImages = Array.isArray(images) ? images : [];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[999] flex items-center justify-center"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white text-xl w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 hover:scale-110 transition-all"
        >
          ✕
        </button>

        {/* Left Arrow */}
        <button
          onClick={onPrevious}
          className="absolute left-6 text-white text-3xl w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 hover:scale-110 transition-all"
        >
          ❮
        </button>

        {/* Right Arrow */}
        <button
          onClick={onNext}
          className="absolute right-6 text-white text-3xl w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 hover:scale-110 transition-all"
        >
          ❯
        </button>

        {/* Main Content */}
        <div className="flex flex-col items-center gap-4">
          <div className="max-w-[90vw] h-[75vh] flex items-center justify-center relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={safeImages[currentIndex]}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.25 }}
                className="max-w-full max-h-full rounded-xl shadow-xl cursor-zoom-in"
                onClick={toggleZoom}
                style={{ transform: "scale(1)" }}
                data-zoom="out"
              />
            </AnimatePresence>
          </div>

          {/* Thumbnail Strip */}
          <div
            ref={thumbStripRef}
            className="flex gap-2 overflow-x-auto px-4 py-2 w-full max-w-[90vw] scrollbar-hide"
            style={{ scrollBehavior: "smooth" }}
          >
            {safeImages.map((thumb, i) => (
              <img
                key={i}
                ref={(el) => (thumbRefs.current[i] = el)}
                src={thumb}
                onClick={() => onThumbnailClick(i)}
                className={`h-16 w-24 object-cover rounded-lg cursor-pointer transition-all ${
                  i === currentIndex ? "ring-2 ring-white scale-105" : "opacity-60 hover:opacity-100"
                }`}
                alt={`Thumbnail ${i}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
