// src/hotel/components/HotelImportantInfo.tsx

import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Info, ChevronRight } from 'lucide-react';

interface HotelImportantInfoProps {
  rateConditions: string[];
  onViewMore: () => void;
  previewCount?: number;
  className?: string;
}

export const HotelImportantInfo: React.FC<HotelImportantInfoProps> = ({
  rateConditions,
  onViewMore,
  previewCount = 4,
  className = '',
}) => {
  const stripHtmlTags = (html: string) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = html;
    const decodedHtml = textarea.value;
    return decodedHtml.replace(/<\/?[^>]+(>|$)/g, '');
  };

  const previewConditions = rateConditions.slice(0, previewCount);
  const hasMore = rateConditions.length > previewCount;

  return (
    <div className={`w-full ${className}`}>
      <Card className="border-purple-100 shadow-xl overflow-hidden py-0">
        {/* Header */}
        <CardHeader className="bg-linear-to-r from-[#785ef7] to-[#5a3ec8] px-4 py-3">
          <h5 className="text-white text-lg font-bold flex items-center gap-2">
            <Info className="w-5 h-5" />
            Important Information
          </h5>
        </CardHeader>

        <CardContent className="p-4 md:p-5 space-y-3">
          {/* Display Preview Conditions */}
          {previewConditions.length > 0 ? (
            <ul className="space-y-2">
              {previewConditions.map((condition, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <span className="text-[#785ef7] font-bold mt-0.5 shrink-0">
                    •
                  </span>
                  <span>{stripHtmlTags(condition)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">
              No important information available
            </p>
          )}

          {/* View More Button */}
          {hasMore && (
            <Button
              variant="ghost"
              className="text-[#785ef7] text-sm font-semibold hover:text-[#5a3ec8] hover:bg-purple-50 transition-colors flex items-center gap-1 group p-0"
              onClick={onViewMore}
            >
              <span>View More</span>
              <ChevronRight
                size={16}
                className="transform group-hover:translate-x-1 transition-transform"
              />
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HotelImportantInfo;