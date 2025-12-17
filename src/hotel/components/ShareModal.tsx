import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Mail, User, MessageSquare, UserCircle, AlertCircle, Loader2 } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: any;
  toEmailList: string[];
  ccEmailList: string[];
  errors: any;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleAddEmail: (email: string, field: 'toEmail' | 'ccEmail') => void;
  handleDeleteEmail: (email: string, field: 'toEmail' | 'ccEmail') => void;
  handleApproverEmailBlur: () => void;
  toEmail: string;
  setToEmail: (val: string) => void;
  ccEmail: string;
  setCcEmail: (val: string) => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  formData,
  toEmailList,
  ccEmailList,
  errors,
  isLoading,
  onSubmit,
  handleChange,
  handleAddEmail,
  handleDeleteEmail,
  handleApproverEmailBlur,
  toEmail,
  setToEmail,
  ccEmail,
  setCcEmail
}) => {
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    email: string,
    field: 'toEmail' | 'ccEmail'
  ) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddEmail(email, field);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm p-2 sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-hidden border border-purple-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative bg-linear-to-r from-[#785ef7] via-[#6b4ee3] to-[#5a3ec8] text-white px-4 py-3 overflow-hidden">
              <div className="absolute inset-0 bg-black/5"></div>
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>

              <div className="relative flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                    <Send className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold tracking-wide">Share Options</h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-white/90 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="py-4 px-4 overflow-y-auto max-h-[calc(95vh-140px)] custom-scrollbar">
              <div className="space-y-4">
                {/* Client Name & SPOC Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                      <div className="w-1 h-4 bg-[#785ef7] rounded-full"></div>
                      Client Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        name="clientName"
                        type="text"
                        className="w-full border border-gray-200 rounded-lg pl-10 pr-3 py-2.5 text-sm bg-gray-50 outline-none"
                        value={formData.clientName}
                        disabled
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                      <div className="w-1 h-4 bg-[#785ef7] rounded-full"></div>
                      SPOC Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        name="spocName"
                        type="text"
                        placeholder="SPOC Name"
                        className={`w-full border ${
                          errors.spocName ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'
                        } rounded-lg pl-10 pr-3 py-2.5 text-sm outline-none focus:border-[#785ef7] focus:ring-2 focus:ring-[#785ef7]/20 transition-all`}
                        value={formData.spocName}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.spocName && (
                      <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.spocName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Approver Email */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                    <div className="w-1 h-4 bg-[#785ef7] rounded-full"></div>
                    Approver Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      name="spocEmail"
                      type="text"
                      placeholder="Enter Email"
                      className={`w-full border ${
                        errors.spocEmail ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'
                      } rounded-lg pl-10 pr-3 py-2.5 text-sm outline-none focus:border-[#785ef7] focus:ring-2 focus:ring-[#785ef7]/20 transition-all`}
                      value={formData.spocEmail}
                      onChange={handleChange}
                      onBlur={handleApproverEmailBlur}
                    />
                  </div>
                  {errors.spocEmail && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.spocEmail}
                    </p>
                  )}
                </div>

                {/* CC Email */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                    <div className="w-1 h-4 bg-[#785ef7] rounded-full"></div>
                    CC Email
                  </label>
                  <div className={`flex flex-wrap gap-2 border ${
                    errors.ccEmail ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'
                  } rounded-lg p-2.5 min-h-12 focus-within:border-[#785ef7] focus-within:ring-2 focus-within:ring-[#785ef7]/20 transition-all`}>
                    {ccEmailList.map((email) => (
                      <div
                        key={email}
                        className="bg-linear-to-r from-[#785ef7] to-[#6b4ee3] text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-sm"
                      >
                        <span className="break-all">{email}</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteEmail(email, 'ccEmail')}
                          className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    <input
                      type="text"
                      placeholder="Type email and press Enter"
                      className="flex-1 min-w-37.5 border-none outline-none text-sm bg-transparent"
                      value={ccEmail}
                      onChange={(e) => setCcEmail(e.target.value)}
                      onBlur={() => handleAddEmail(ccEmail, 'ccEmail')}
                      onKeyDown={(e) => handleKeyDown(e, ccEmail, 'ccEmail')}
                    />
                  </div>
                  {errors.ccEmail && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.ccEmail}
                    </p>
                  )}
                </div>

                {/* Remark */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                    <div className="w-1 h-4 bg-[#785ef7] rounded-full"></div>
                    Remark
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <textarea
                      name="remark"
                      rows={2}
                      placeholder="Add remark (optional)"
                      className="w-full border border-gray-200 bg-white rounded-lg pl-10 pr-3 py-2.5 text-sm outline-none focus:border-[#785ef7] focus:ring-2 focus:ring-[#785ef7]/20 transition-all resize-none"
                      value={formData.remark}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 bg-linear-to-r from-gray-50 to-purple-50 border-t border-gray-200 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all shadow-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onSubmit}
                disabled={isLoading}
                className={`px-6 py-2 text-sm font-semibold text-white bg-linear-to-r from-[#785ef7] to-[#5a3ec8] rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2 ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    SENDING...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    SEND
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};