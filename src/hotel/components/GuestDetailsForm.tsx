
import React from 'react';
import { ui, icons, guestDetailsTypes } from '@/index';

export const GuestDetailsForm: React.FC<guestDetailsTypes.GuestDetailsFormProps> = ({
  peopleData,
  gstDetails,
  showGSTDetails,
  errors,
  onGuestChange,
  onGSTChange,
  onGSTToggle,
  disabled = false,
}) => {
  return (
    <div className="w-full">
      <ui.Card className="border-2 border-[#785ef7]/20 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 py-0">
        {/* Header */}
        <ui.CardHeader className="bg-linear-to-r from-[#785ef7] to-[#644ed4] px-6 py-4">
          <div className="flex items-center justify-between">
            <h5 className="text-white text-xl font-bold flex items-center gap-2">
              <icons.User className="w-5 h-5" />
              Guest Details
            </h5>
            <ui.Badge className="bg-white/20 backdrop-blur-sm text-white border-0 hover:bg-white/30">
              {peopleData.length} Guest{peopleData.length > 1 ? 's' : ''}
            </ui.Badge>
          </div>
        </ui.CardHeader>

        <ui.CardContent className="p-6 space-y-5">
          {/* Guest Forms */}
          {peopleData.map((person, index) => (
            <div
              key={index}
              className="bg-linear-to-br from-purple-50/50 to-blue-50/50 rounded-xl p-5 border-2 border-[#785ef7]/10 hover:border-[#785ef7]/30 transition-all duration-300"
            >
              {peopleData.length > 1 && (
                <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-[#785ef7]/20">
                  <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#785ef7] to-[#644ed4] text-white flex items-center justify-center text-sm font-bold shadow-md">
                    {index + 1}
                  </div>
                  <h6 className="text-base font-bold text-gray-800">
                    Passenger {index + 1}
                  </h6>
                </div>
              )}

              {/* Name Row */}
              <div className="grid grid-cols-12 gap-3 mb-4">
                <div className="col-span-12 sm:col-span-2">
                  <ui.Label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                    Title <span className="text-red-500">*</span>
                  </ui.Label>
                  <ui.Select disabled={disabled} value={person.title}>
                    <ui.SelectTrigger className="w-full bg-white border-gray-300 focus:border-[#785ef7] focus:ring-[#785ef7]">
                      <ui.SelectValue placeholder="Title" />
                    </ui.SelectTrigger>
                    <ui.SelectContent className=''>
                      <ui.SelectItem value="Mr">Mr</ui.SelectItem>
                      <ui.SelectItem value="Mrs">Mrs</ui.SelectItem>
                      <ui.SelectItem value="Ms">Ms</ui.SelectItem>
                    </ui.SelectContent>
                  </ui.Select>
                </div>
                <div className="col-span-12 sm:col-span-5">
                  <ui.Label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                    First Name <span className="text-red-500">*</span>
                  </ui.Label>
                  <ui.Input
                    type="text"
                    disabled={disabled}
                    className={`text-sm border-gray-300 focus:border-[#785ef7] focus:ring-[#785ef7] ${
                      disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                    } ${errors[index]?.firstName ? 'border-red-400 bg-red-50' : ''}`}
                    value={person.firstName}
                    placeholder="Enter first name"
                  />
                  {errors[index]?.firstName && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <icons.AlertCircle size={12} />
                      {errors[index].firstName}
                    </p>
                  )}
                </div>
                <div className="col-span-12 sm:col-span-5">
                  <ui.Label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                    Last Name <span className="text-red-500">*</span>
                  </ui.Label>
                  <ui.Input
                    type="text"
                    disabled={disabled}
                    className={`text-sm border-gray-300 focus:border-[#785ef7] focus:ring-[#785ef7] ${
                      disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                    } ${errors[index]?.lastName ? 'border-red-400 bg-red-50' : ''}`}
                    value={person.lastName}
                    placeholder="Enter last name"
                  />
                  {errors[index]?.lastName && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <icons.AlertCircle size={12} />
                      {errors[index].lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email & Mobile Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <div>
                  <ui.Label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                    <icons.Mail size={12} className="text-[#785ef7]" />
                    Email Address <span className="text-red-500">*</span>
                  </ui.Label>
                  <ui.Input
                    type="email"
                    disabled={disabled}
                    className={`text-sm border-gray-300 focus:border-[#785ef7] focus:ring-[#785ef7] ${
                      disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                    } ${errors[index]?.email ? 'border-red-400 bg-red-50' : ''}`}
                    value={person.email}
                    placeholder="your@email.com"
                  />
                  {!disabled && (
                    <p className="text-[10px] text-gray-500 mt-1 flex items-center gap-1">
                      <icons.Mail size={10} className="text-blue-500" />
                      Booking voucher will be sent here
                    </p>
                  )}
                  {errors[index]?.email && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <icons.AlertCircle size={12} />
                      {errors[index].email}
                    </p>
                  )}
                </div>
                <div>
                  <ui.Label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                    <icons.Phone size={12} className="text-[#785ef7]" />
                    Mobile Number <span className="text-red-500">*</span>
                  </ui.Label>
                  <ui.Input
                    type="text"
                    disabled={disabled}
                    className={`text-sm border-gray-300 focus:border-[#785ef7] focus:ring-[#785ef7] ${
                      disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                    } ${errors[index]?.contact_no ? 'border-red-400 bg-red-50' : ''}`}
                    value={person.contact_no}
                    placeholder="+91 98765 43210"
                  />
                  {errors[index]?.contact_no && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <icons.AlertCircle size={12} />
                      {errors[index].contact_no}
                    </p>
                  )}
                </div>
              </div>

              {/* PAN Field */}
              <div className="bg-linear-to-r from-orange-50 to-amber-50 rounded-lg p-4 border-2 border-orange-200 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <icons.CreditCard size={16} className="text-orange-600" />
                  <ui.Label className="text-xs font-bold text-gray-800 flex items-center gap-1">
                    PAN Card Number <span className="text-red-600">*</span>
                  </ui.Label>
                </div>
                <ui.Input
                  type="text"
                  name="pan"
                  className={`uppercase text-sm font-mono ${
                    errors[index]?.pan
                      ? 'border-red-400 bg-red-50 focus:border-red-500'
                      : 'border-orange-300 bg-white focus:border-orange-400 focus:ring-orange-400'
                  }`}
                  placeholder="ABCDE1234F"
                  value={person.pan || ''}
                  onChange={(e) => {
                    const value = e.target.value.toUpperCase();
                    onGuestChange(index, {
                      target: { name: 'pan', value },
                    } as any);
                  }}
                  maxLength={10}
                  disabled={disabled}
                />
                {errors[index]?.pan && (
                  <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-medium">
                    <icons.AlertCircle size={12} />
                    {errors[index].pan}
                  </p>
                )}
                {!disabled && !errors[index]?.pan && (
                  <p className="text-[10px] text-orange-700 mt-1.5 flex items-center gap-1 font-medium">
                    <icons.AlertCircle size={10} />
                    Required for International Bookings
                  </p>
                )}
              </div>
            </div>
          ))}

          {/* GST Section */}
          <div className="bg-linear-to-br from-blue-50/50 to-indigo-50/50 rounded-xl p-5 border-2 border-blue-200/50 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <ui.Checkbox
                id="gst-checkbox"
                checked={showGSTDetails}
                onCheckedChange={onGSTToggle}
                disabled={disabled}
                className="border-[#785ef7] data-[state=checked]:bg-[#785ef7] data-[state=checked]:border-[#785ef7] text-white"
              />
              <ui.Label
                htmlFor="gst-checkbox"
                className="text-sm font-bold text-gray-800 cursor-pointer flex items-center gap-2"
              >
                <icons.Building2 size={16} className="text-[#785ef7]" />
                I have a GST Number (Optional)
              </ui.Label>
            </div>

            {showGSTDetails && (
              <div className="space-y-3 animate-fadeIn bg-white rounded-lg p-4 border border-blue-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <ui.Label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                      <icons.CreditCard size={12} className="text-[#785ef7]" />
                      GST Registration No. <span className="text-red-500">*</span>
                    </ui.Label>
                    <ui.Input
                      type="text"
                      name="gstNo"
                      className={`text-sm uppercase font-mono ${
                        errors.gstNo ? 'border-red-400 bg-red-50' : 'border-gray-300'
                      } focus:border-[#785ef7] focus:ring-[#785ef7]`}
                      placeholder="29ABCDE1234F1Z5"
                      value={gstDetails.gstNo}
                      onChange={onGSTChange}
                      disabled={disabled}
                    />
                    {errors.gstNo && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <icons.AlertCircle size={12} />
                        {errors.gstNo}
                      </p>
                    )}
                  </div>
                  <div>
                    <ui.Label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                      <icons.Building2 size={12} className="text-[#785ef7]" />
                      Company Name <span className="text-red-500">*</span>
                    </ui.Label>
                    <ui.Input
                      type="text"
                      name="cName"
                      className={`text-sm ${
                        errors.cName ? 'border-red-400 bg-red-50' : 'border-gray-300'
                      } focus:border-[#785ef7] focus:ring-[#785ef7]`}
                      placeholder="Company Name"
                      value={gstDetails.cName}
                      onChange={onGSTChange}
                      disabled={disabled}
                    />
                    {errors.cName && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <icons.AlertCircle size={12} />
                        {errors.cName}
                      </p>
                    )}
                  </div>
                  <div>
                    <ui.Label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                      <icons.MapPin size={12} className="text-[#785ef7]" />
                      Company Address <span className="text-red-500">*</span>
                    </ui.Label>
                    <ui.Input
                      type="text"
                      name="cAddr"
                      className={`text-sm ${
                        errors.cAddr ? 'border-red-400 bg-red-50' : 'border-gray-300'
                      } focus:border-[#785ef7] focus:ring-[#785ef7]`}
                      placeholder="Address"
                      value={gstDetails.cAddr}
                      onChange={onGSTChange}
                      disabled={disabled}
                    />
                    {errors.cAddr && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <icons.AlertCircle size={12} />
                        {errors.cAddr}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <ui.Label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                      <icons.Phone size={12} className="text-[#785ef7]" />
                      Contact Number <span className="text-red-500">*</span>
                    </ui.Label>
                    <ui.Input
                      type="text"
                      name="contactNo"
                      className={`text-sm ${
                        errors.contactNo ? 'border-red-400 bg-red-50' : 'border-gray-300'
                      } focus:border-[#785ef7] focus:ring-[#785ef7]`}
                      placeholder="Contact"
                      value={gstDetails.contactNo}
                      onChange={onGSTChange}
                      disabled={disabled}
                    />
                    {errors.contactNo && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <icons.AlertCircle size={12} />
                        {errors.contactNo}
                      </p>
                    )}
                  </div>
                  <div>
                    <ui.Label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                      <icons.Mail size={12} className="text-[#785ef7]" />
                      Company Email <span className="text-red-500">*</span>
                    </ui.Label>
                    <ui.Input
                      type="email"
                      name="email"
                      className={`text-sm ${
                        errors.email ? 'border-red-400 bg-red-50' : 'border-gray-300'
                      } focus:border-[#785ef7] focus:ring-[#785ef7]`}
                      placeholder="company@email.com"
                      value={gstDetails.email}
                      onChange={onGSTChange}
                      disabled={disabled}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <icons.AlertCircle size={12} />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </ui.CardContent>
      </ui.Card>
    </div>
  );
};

export default GuestDetailsForm;