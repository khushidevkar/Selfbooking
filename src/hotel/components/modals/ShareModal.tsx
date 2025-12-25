// import { motion, AnimatePresence } from 'framer-motion';
// import { icons } from '@/index';

// interface ShareModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   formData: any;
//   toEmailList: string[];
//   ccEmailList: string[];
//   errors: any;
//   isLoading: boolean;
//   onSubmit: (e: React.FormEvent) => void;
//   handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
//   handleAddEmail: (email: string, field: 'toEmail' | 'ccEmail') => void;
//   handleDeleteEmail: (email: string, field: 'toEmail' | 'ccEmail') => void;
//   handleApproverEmailBlur: () => void;
//   toEmail: string;
//   setToEmail: (val: string) => void;
//   ccEmail: string;
//   setCcEmail: (val: string) => void;
// }

// export const ShareModal: React.FC<ShareModalProps> = ({
//   isOpen,
//   onClose,
//   formData,
//   toEmailList,
//   ccEmailList,
//   errors,
//   isLoading,
//   onSubmit,
//   handleChange,
//   handleAddEmail,
//   handleDeleteEmail,
//   handleApproverEmailBlur,
//   toEmail,
//   setToEmail,
//   ccEmail,
//   setCcEmail
// }) => {
//   const handleKeyDown = (
//     e: React.KeyboardEvent<HTMLInputElement>,
//     email: string,
//     field: 'toEmail' | 'ccEmail'
//   ) => {
//     if (e.key === "Enter" || e.key === ",") {
//       e.preventDefault();
//       handleAddEmail(email, field);
//     }
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm p-2 sm:p-4"
//           onClick={onClose}
//         >
//           <motion.div
//             initial={{ scale: 0.9, opacity: 0, y: 20 }}
//             animate={{ scale: 1, opacity: 1, y: 0 }}
//             exit={{ scale: 0.9, opacity: 0, y: 20 }}
//             transition={{ type: "spring", stiffness: 300, damping: 25 }}
//             className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-hidden border border-purple-100"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Header */}
//             <div className="relative bg-linear-to-r from-[#785ef7] via-[#6b4ee3] to-[#5a3ec8] text-white px-4 py-3 overflow-hidden">
//               <div className="absolute inset-0 bg-black/5"></div>
//               <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
//               <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>

//               <div className="relative flex justify-between items-center">
//                 <div className="flex items-center gap-3">
//                   <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
//                     <icons.Send className="w-5 h-5" />
//                   </div>
//                   <h2 className="text-xl font-bold tracking-wide">Share Options</h2>
//                 </div>
//                 <ui.Button
//                   onClick={onClose}
//                   className="text-white/90 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all"
//                 >
//                   <icons.X className="w-5 h-5" />
//                 </ui.Button>
//               </div>
//             </div>

//             {/* Body */}
//             <div className="py-4 px-4 overflow-y-auto max-h-[calc(95vh-140px)] custom-scrollbar">
//               <div className="space-y-4">
//                 {/* Client Name & SPOC Name */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <ui.Label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
//                       <div className="w-1 h-4 bg-[#785ef7] rounded-full"></div>
//                       Client Name
//                     </ui.Label>
//                     <div className="relative">
//                       <icons.User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                       <ui.Input
//                         name="clientName"
//                         type="text"
//                         className="w-full border border-gray-200 rounded-lg pl-10 pr-3 py-2.5 text-sm bg-gray-50 outline-none"
//                         value={formData.clientName}
//                         disabled
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <ui.Label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
//                       <div className="w-1 h-4 bg-[#785ef7] rounded-full"></div>
//                       SPOC Name <span className="text-red-500">*</span>
//                     </ui.Label>
//                     <div className="relative">
//                       <icons.UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                       <ui.Input
//                         name="spocName"
//                         type="text"
//                         placeholder="SPOC Name"
//                         className={`w-full border ${
//                           errors.spocName ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'
//                         } rounded-lg pl-10 pr-3 py-2.5 text-sm outline-none focus:border-[#785ef7] focus:ring-2 focus:ring-[#785ef7]/20 transition-all`}
//                         value={formData.spocName}
//                         onChange={handleChange}
//                       />
//                     </div>
//                     {errors.spocName && (
//                       <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
//                         <icons.AlertCircle className="w-3 h-3" />
//                         {errors.spocName}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Approver Email */}
//                 <div>
//                   <ui.Label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
//                     <div className="w-1 h-4 bg-[#785ef7] rounded-full"></div>
//                     Approver Email <span className="text-red-500">*</span>
//                   </ui.Label>
//                   <div className="relative">
//                     <icons.Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                     <ui.Input
//                       name="spocEmail"
//                       type="text"
//                       placeholder="Enter Email"
//                       className={`w-full border ${
//                         errors.spocEmail ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'
//                       } rounded-lg pl-10 pr-3 py-2.5 text-sm outline-none focus:border-[#785ef7] focus:ring-2 focus:ring-[#785ef7]/20 transition-all`}
//                       value={formData.spocEmail}
//                       onChange={handleChange}
//                       onBlur={handleApproverEmailBlur}
//                     />
//                   </div>
//                   {errors.spocEmail && (
//                     <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
//                       <icons.AlertCircle className="w-3 h-3" />
//                       {errors.spocEmail}
//                     </p>
//                   )}
//                 </div>

//                 {/* CC Email */}
//                 <div>
//                   <ui.Label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
//                     <div className="w-1 h-4 bg-[#785ef7] rounded-full"></div>
//                     CC Email
//                   </ui.Label>
//                   <div className={`flex flex-wrap gap-2 border ${
//                     errors.ccEmail ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'
//                   } rounded-lg p-2.5 min-h-12 focus-within:border-[#785ef7] focus-within:ring-2 focus-within:ring-[#785ef7]/20 transition-all`}>
//                     {ccEmailList.map((email) => (
//                       <div
//                         key={email}
//                         className="bg-linear-to-r from-[#785ef7] to-[#6b4ee3] text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-sm"
//                       >
//                         <span className="break-all">{email}</span>
//                         <ui.Button
//                           type="button"
//                           onClick={() => handleDeleteEmail(email, 'ccEmail')}
//                           className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
//                         >
//                           <icons.X className="w-3 h-3" />
//                         </ui.Button>
//                       </div>
//                     ))}
//                     <ui.Input
//                       type="text"
//                       placeholder="Type email and press Enter"
//                       className="flex-1 min-w-37.5 border-none outline-none text-sm bg-transparent"
//                       value={ccEmail}
//                       onChange={(e) => setCcEmail(e.target.value)}
//                       onBlur={() => handleAddEmail(ccEmail, 'ccEmail')}
//                       onKeyDown={(e) => handleKeyDown(e, ccEmail, 'ccEmail')}
//                     />
//                   </div>
//                   {errors.ccEmail && (
//                     <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
//                       <icons.AlertCircle className="w-3 h-3" />
//                       {errors.ccEmail}
//                     </p>
//                   )}
//                 </div>

//                 {/* Remark */}
//                 <div>
//                   <ui.Label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
//                     <div className="w-1 h-4 bg-[#785ef7] rounded-full"></div>
//                     Remark
//                   </ui.Label>
//                   <div className="relative">
//                     <icons.MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
//                     <ui.Textarea
//                       name="remark"
//                       rows={2}
//                       placeholder="Add remark (optional)"
//                       className="w-full border border-gray-200 bg-white rounded-lg pl-10 pr-3 py-2.5 text-sm outline-none focus:border-[#785ef7] focus:ring-2 focus:ring-[#785ef7]/20 transition-all resize-none"
//                       value={formData.remark}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Footer */}
//             <div className="px-4 py-3 bg-linear-to-r from-gray-50 to-purple-50 border-t border-gray-200 flex justify-end gap-3">
//               <ui.Button
//                 type="button"
//                 onClick={onClose}
//                 className="px-5 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all shadow-sm"
//               >
//                 Cancel
//               </ui.Button>
//               <ui.Button
//                 type="button"
//                 onClick={onSubmit}
//                 disabled={isLoading}
//                 className={`px-6 py-2 text-sm font-semibold text-white bg-linear-to-r from-[#785ef7] to-[#5a3ec8] rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2 ${
//                   isLoading ? 'opacity-70 cursor-not-allowed' : ''
//                 }`}
//               >
//                 {isLoading ? (
//                   <>
//                     <icons.Loader2 className="w-4 h-4 animate-spin" />
//                     SENDING...
//                   </>
//                 ) : (
//                   <>
//                     <icons.Send className="w-4 h-4" />
//                     SEND
//                   </>
//                 )}
//               </ui.Button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };


import { motion, AnimatePresence } from 'framer-motion';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { hotelTypes, icons, ui } from '@/index';

interface ShareModalProps {
  isOpen?: boolean;
  onClose: () => void;
  formData?: hotelTypes.ShareFormData;
  toEmailList?: string[];
  ccEmailList?: string[];
  errors?: hotelTypes.ShareFormErrors;
  isLoading?: boolean;
  onSubmit: (e: React.FormEvent) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleAddEmail: (email: string, field: 'toEmail' | 'ccEmail') => void;
  handleDeleteEmail: (email: string, field: 'toEmail' | 'ccEmail') => void;
  handleApproverEmailBlur: () => void;
  toEmail?: string;
  setToEmail: (val: string) => void;
  ccEmail?: string;
  setCcEmail: (val: string) => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen = false,
  onClose,
  formData = {},
  toEmailList = [],
  ccEmailList = [],
  errors = {},
  isLoading = false,
  onSubmit,
  handleChange,
  handleAddEmail,
  handleDeleteEmail,
  handleApproverEmailBlur,
  toEmail = '',
  setToEmail,
  ccEmail = '',
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
        <DialogPrimitive.Root open={isOpen} onOpenChange={onClose}>
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-9999 bg-black/60 backdrop-blur-sm"
              />
            </DialogPrimitive.Overlay>
            <DialogPrimitive.Content asChild forceMount>
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="fixed left-[50%] top-[50%] z-9999 translate-x-[-50%] translate-y-[-50%] w-full max-w-2xl max-h-[95vh] overflow-hidden"
              >
                <div className="bg-white rounded-2xl shadow-2xl border-2 border-purple-200/50 overflow-hidden">
                  {/* Custom Header with Enhanced Gradient */}
                  <div className="relative bg-linear-to-br from-[#785ef7] via-[#6b4ee3] to-[#5a3ec8] text-white px-6 py-5 overflow-hidden">
                    {/* Animated background elements */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24 blur-2xl"></div>
                    <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-purple-300/10 rounded-full blur-xl"></div>

                    <div className="relative flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl shadow-lg">
                          <icons.Send className="w-6 h-6" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold tracking-tight">Share Options</h2>
                          <p className="text-purple-100 text-sm mt-0.5">Send hotel details to your client</p>
                        </div>
                      </div>
                      <DialogPrimitive.Close asChild>
                        <ui.Button className="text-white/80 hover:text-white hover:bg-white/20 rounded-xl p-2.5 transition-all hover:rotate-90 duration-300">
                          <icons.X className="w-5 h-5" />
                        </ui.Button>
                      </DialogPrimitive.Close>
                    </div>
                  </div>

                  {/* Body with enhanced styling */}
                  <div className="py-6 px-6 overflow-y-auto max-h-[calc(95vh-240px)] custom-scrollbar">
                    <div className="space-y-6">
                      {/* Client Name & SPOC Name */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <ui.Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <div className="w-1.5 h-5 bg-linear-to-b from-[#785ef7] to-[#6b4ee3] rounded-full"></div>
                            Client Name
                          </ui.Label>
                          <div className="relative group">
                            <icons.User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#785ef7] transition-colors" />
                            <ui.Input
                              name="clientName"
                              type="text"
                              className="pl-10 bg-linear-to-br from-gray-50 to-gray-100 border-gray-200 h-11 font-medium"
                              value={formData?.clientName || ''}
                              disabled
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <ui.Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <div className="w-1.5 h-5 bg-linear-to-b from-[#785ef7] to-[#6b4ee3] rounded-full"></div>
                            SPOC Name <span className="text-red-500">*</span>
                          </ui.Label>
                          <div className="relative group">
                            <icons.UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#785ef7] transition-colors" />
                            <ui.Input
                              name="spocName"
                              type="text"
                              placeholder="Enter SPOC name"
                              className={`pl-10 h-11 transition-all ${
                                errors?.spocName 
                                  ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-200' 
                                  : 'border-gray-200 focus:border-[#785ef7] focus:ring-[#785ef7]/20'
                              }`}
                              value={formData?.spocName || ''}
                              onChange={handleChange}
                            />
                          </div>
                          {errors?.spocName && (
                            <motion.p 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-500 text-xs flex items-center gap-1.5 bg-red-50 px-2 py-1 rounded-md"
                            >
                              <icons.AlertCircle className="w-3.5 h-3.5" />
                              {errors.spocName}
                            </motion.p>
                          )}
                        </div>
                      </div>

                      {/* Approver Email */}
                      <div className="space-y-2">
                        <ui.Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <div className="w-1.5 h-5 bg-linear-to-b from-[#785ef7] to-[#6b4ee3] rounded-full"></div>
                          Approver Email <span className="text-red-500">*</span>
                        </ui.Label>
                        <div className="relative group">
                          <icons.Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#785ef7] transition-colors" />
                          <ui.Input
                            name="spocEmail"
                            type="email"
                            placeholder="approver@company.com"
                            className={`pl-10 h-11 transition-all ${
                              errors?.spocEmail 
                                ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-200' 
                                : 'border-gray-200 focus:border-[#785ef7] focus:ring-[#785ef7]/20'
                            }`}
                            value={formData?.spocEmail || ''}
                            onChange={handleChange}
                            onBlur={handleApproverEmailBlur}
                          />
                        </div>
                        {errors?.spocEmail && (
                          <motion.p 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-xs flex items-center gap-1.5 bg-red-50 px-2 py-1 rounded-md"
                          >
                            <icons.AlertCircle className="w-3.5 h-3.5" />
                            {errors.spocEmail}
                          </motion.p>
                        )}
                      </div>

                      {/* CC Email with enhanced tags */}
                      <div className="space-y-2">
                        <ui.Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <div className="w-1.5 h-5 bg-linear-to-b from-[#785ef7] to-[#6b4ee3] rounded-full"></div>
                          CC Email
                          <span className="text-xs text-gray-500 font-normal">(Optional)</span>
                        </ui.Label>
                        <div className={`flex flex-wrap gap-2 border rounded-lg p-3 min-h-14 transition-all ${
                          errors?.ccEmail 
                            ? 'border-red-300 bg-red-50' 
                            : 'border-gray-200 bg-white hover:border-[#785ef7]/50'
                        } focus-within:border-[#785ef7] focus-within:ring-2 focus-within:ring-[#785ef7]/20 focus-within:bg-purple-50/30`}>
                          <AnimatePresence mode="popLayout">
                            {ccEmailList && ccEmailList.length > 0 && ccEmailList.map((email) => (
                              <motion.div
                                key={email}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              >
                                <ui.Badge
                                  variant="default"
                                  className="bg-linear-to-r from-[#785ef7] to-[#6b4ee3] hover:from-[#6b4ee3] hover:to-[#5a3ec8] text-white px-3 py-2 gap-2 shadow-sm hover:shadow-md transition-all"
                                >
                                  <icons.Mail className="w-3 h-3" />
                                  <span className="break-all font-medium">{email}</span>
                                  <ui.Button
                                    type="button"
                                    onClick={() => handleDeleteEmail(email, 'ccEmail')}
                                    className="hover:bg-white/30 rounded-full p-1 transition-colors ml-1"
                                  >
                                    <icons.X className="w-3 h-3" />
                                  </ui.Button>
                                </ui.Badge>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                          <ui.Input
                            type="email"
                            placeholder="Type email and press Enter or comma"
                            className="flex-1 min-w-50 border-none outline-none text-sm bg-transparent placeholder:text-gray-400"
                            value={ccEmail}
                            onChange={(e) => setCcEmail(e.target.value)}
                            onBlur={() => handleAddEmail(ccEmail, 'ccEmail')}
                            onKeyDown={(e) => handleKeyDown(e, ccEmail, 'ccEmail')}
                          />
                        </div>
                        {errors?.ccEmail && (
                          <motion.p 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-xs flex items-center gap-1.5 bg-red-50 px-2 py-1 rounded-md"
                          >
                            <icons.AlertCircle className="w-3.5 h-3.5" />
                            {errors.ccEmail}
                          </motion.p>
                        )}
                      </div>

                      {/* Remark with enhanced styling */}
                      <div className="space-y-2">
                        <ui.Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <div className="w-1.5 h-5 bg-linear-to-b from-[#785ef7] to-[#6b4ee3] rounded-full"></div>
                          Remark
                          <span className="text-xs text-gray-500 font-normal">(Optional)</span>
                        </ui.Label>
                        <div className="relative group">
                          <icons.MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400 group-focus-within:text-[#785ef7] transition-colors" />
                          <ui.Textarea
                            name="remark"
                            rows={3}
                            placeholder="Add any additional notes or instructions..."
                            className="pl-10 resize-none border-gray-200 focus:border-[#785ef7] focus:ring-[#785ef7]/20 hover:border-[#785ef7]/50 transition-all"
                            value={formData?.remark || ''}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Footer */}
                  <div className="px-6 py-4 bg-linear-to-br from-gray-50 via-purple-50/30 to-gray-50 border-t-2 border-purple-100/50 flex justify-end gap-3">
                    <ui.Button
                      type="button"
                      variant="outline"
                      onClick={onClose}
                      className="font-semibold border-2 text-gray-400 hover:bg-gray-100 hover:border-[#785ef7] hover:text-[#785ef7] transition-all"
                    >
                      <icons.X className="w-4 h-4 mr-2" />
                      Cancel
                    </ui.Button>
                    <ui.Button
                      type="button"
                      onClick={onSubmit}
                      disabled={isLoading}
                      className="bg-linear-to-r from-[#785ef7] via-[#6b4ee3] to-[#5a3ec8] hover:from-[#6b4ee3] hover:via-[#5a3ec8] hover:to-[#4a2eb8] text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed px-6"
                    >
                      {isLoading ? (
                        <>
                          <icons.Loader2 className="w-4 h-4 animate-spin mr-1" />
                          SENDING...
                        </>
                      ) : (
                        <>
                          <icons.Send className="w-4 h-4 mr-2" />
                          SEND EMAIL
                        </>
                      )}
                    </ui.Button>
                  </div>
                </div>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
      )}
    </AnimatePresence>
  );
};