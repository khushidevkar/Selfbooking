
import React, { useState } from 'react';
import { ui, icons } from '@/index';

interface BookingActionsProps {
  onDownloadVoucher?: () => Promise<void>;
  onCancelBooking?: (remarks: string) => Promise<void>;
  isLoading?: boolean;
  showCancelButton?: boolean;
  className?: string;
}

export const BookingActions: React.FC<BookingActionsProps> = ({
  onDownloadVoucher,
  onCancelBooking,
  isLoading = false,
  showCancelButton = true,
  className = '',
}) => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDownload = async () => {
    if (onDownloadVoucher) {
      await onDownloadVoucher();
    }
  };

  const handleCancelSubmit = async () => {
    if (!onCancelBooking || !remarks.trim()) return;
    
    setIsSubmitting(true);
    try {
      await onCancelBooking(remarks);
      setShowCancelModal(false);
      setRemarks('');
    } catch (error) {
      console.error('Cancel booking error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className={`flex flex-wrap gap-3 ${className}`}>
        {onDownloadVoucher && (
          <ui.Button
            onClick={handleDownload}
            disabled={isLoading}
            className="bg-linear-to-r from-[#785ef7] to-[#5a3ec8] hover:from-[#644ed4] hover:to-[#4a2eb8] text-white shadow-md hover:shadow-lg transition-all"
          >
            {isLoading ? (
              <icons.Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <icons.Download className="w-4 h-4 mr-2" />
            )}
            Download Voucher
          </ui.Button>
        )}

        {showCancelButton && onCancelBooking && (
          <ui.Button
            onClick={() => setShowCancelModal(true)}
            variant="outline"
            className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
          >
            <icons.XCircle className="w-4 h-4 mr-2" />
            Cancel Booking
          </ui.Button>
        )}
      </div>

      {/* Cancel Booking Modal */}
      <ui.Dialog open={showCancelModal} onOpenChange={setShowCancelModal}>
        <ui.DialogContent className="max-w-md">
          <ui.DialogHeader>
            <ui.DialogTitle className="flex items-center gap-2 text-red-600">
              <icons.XCircle className="w-5 h-5" />
              Cancel Booking
            </ui.DialogTitle>
          </ui.DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <ui.Label htmlFor="remarks" className="text-sm font-semibold text-gray-700">
                Cancellation Reason <span className="text-red-600">*</span>
              </ui.Label>
              <ui.Textarea
                id="remarks"
                placeholder="Please provide a reason for cancellation..."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows={4}
                className="mt-1 resize-none"
              />
              {!remarks.trim() && (
                <p className="text-xs text-gray-500 mt-1">
                  A cancellation reason is required to proceed
                </p>
              )}
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-xs text-gray-700">
                <strong>Note:</strong> Cancellation charges may apply based on the hotel's
                cancellation policy. Please review the policy before proceeding.
              </p>
            </div>
          </div>

          <ui.DialogFooter className="flex gap-2 mt-6">
            <ui.Button
              variant="outline"
              onClick={() => {
                setShowCancelModal(false);
                setRemarks('');
              }}
              disabled={isSubmitting}
            >
              Keep Booking
            </ui.Button>
            <ui.Button
              onClick={handleCancelSubmit}
              disabled={!remarks.trim() || isSubmitting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isSubmitting ? (
                <>
                  <icons.Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                'Confirm Cancellation'
              )}
            </ui.Button>
          </ui.DialogFooter>
        </ui.DialogContent>
      </ui.Dialog>
    </>
  );
};

export default BookingActions;