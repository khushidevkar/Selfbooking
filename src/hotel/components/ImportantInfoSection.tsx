
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Info, ChevronRight } from 'lucide-react';

interface ImportantInfoSectionProps {
  rateConditions: string[];
  previewCount?: number;
  className?: string;
}

export const ImportantInfoSection: React.FC<ImportantInfoSectionProps> = ({
  rateConditions,
  previewCount = 4,
  className = '',
}) => {
  const [showModal, setShowModal] = useState(false);

  // Helper function to decode HTML entities
  const decodeHtmlEntities = (text: string): string => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  };

  // Helper function to strip HTML tags
  const stripHtmlTags = (html: string): string => {
    const decodedHtml = decodeHtmlEntities(html);
    return decodedHtml.replace(/<\/?[^>]+(>|$)/g, '');
  };

  // Clean all rate conditions
  const cleanRateConditions = (conditions: string[]): string[] => {
    return conditions.map((condition) => stripHtmlTags(condition));
  };

  // Get preview conditions
  const previewConditions = rateConditions.slice(0, previewCount);
  const hasMore = rateConditions.length > previewCount;
  const cleanedConditions = cleanRateConditions(rateConditions);

  // Don't render if no conditions
  if (!rateConditions || rateConditions.length === 0) {
    return null;
  }

  return (
    <>
      <Card className={`py-0 border-gray-200 shadow-lg overflow-hidden ${className} `}>
        <CardContent className="p-6 space-y-3">
          {/* Header */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-linear-to-br from-[#785ef7] to-[#5a3ec8] rounded-lg flex items-center justify-center shrink-0">
              <Info className="w-4 h-4 text-white" />
            </div>
            <h5 className="text-xl font-semibold text-gray-900">
              Important Information
            </h5>
          </div>

          {/* Preview List */}
          <ul className="space-y-2">
            {previewConditions.map((condition, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-gray-700"
              >
                <span className="text-[#785ef7] font-bold mt-0.5 shrink-0">
                  •
                </span>
                <span className="leading-relaxed">{condition}</span>
              </li>
            ))}
          </ul>

          {/* View More Button */}
          {hasMore && (
            <Button
              variant="ghost"
              className="text-[#785ef7] text-sm font-semibold hover:text-[#5a3ec8] hover:bg-purple-50 transition-colors flex items-center gap-1 group p-0 h-auto mt-3"
              onClick={() => setShowModal(true)}
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

      {/* Full Details Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Info className="w-5 h-5 text-[#785ef7]" />
              All Hotel Rules & Conditions
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <ul className="space-y-2">
              {cleanedConditions.map((condition, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <span className="text-[#785ef7] font-bold mt-0.5 shrink-0">
                    •
                  </span>
                  <span className="leading-relaxed">{condition}</span>
                </li>
              ))}
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImportantInfoSection;