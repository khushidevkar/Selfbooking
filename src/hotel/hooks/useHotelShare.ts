
// src/hooks/useHotelShare.ts
import { useState } from 'react';
import Swal from 'sweetalert2';
import { hotelTypes, hotelUtils, hotelApi } from '@/index';

export const useHotelShare = (searchParams: hotelTypes.HotelSearchParams | null) => {
  // FIX: Handle null searchParams
  
  // const [selectedRooms, setSelectedRooms] = useState<any[]>([]);
  const [selectedRooms, setSelectedRooms] = useState<hotelTypes.SelectedRoom[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [toEmail, setToEmail] = useState('');
  const [toEmailList, setToEmailList] = useState<string[]>([]);

  const [ccEmail, setCcEmail] = useState('');
  const [ccEmailList, setCcEmailList] = useState<string[]>([]);

  const [errors, setErrors] = useState<hotelTypes.ShareFormErrors>({});

  //  FIX: Safely access searchParams properties with fallbacks
  const [formData, setFormData] = useState<hotelTypes.ShareFormData>({
    clientName: searchParams?.corporate_name || '',
    spocName: searchParams?.spoc_name || '',
    spocEmail: hotelUtils.cleanEmails(
      [searchParams?.approver1, searchParams?.approver2]
        .filter((e) => e)
        .join(', ')
    ),
    remark: '',
  });

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name as keyof hotelTypes.ShareFormErrors]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof hotelTypes.ShareFormErrors];
        return newErrors;
      });
    }
  };

  // Add email to list
  const handleAddEmail = (
    email: string,
    field: 'toEmail' | 'ccEmail'
  ) => {
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) return;

    // Validate email format
    if (!hotelUtils.validateEmail(trimmedEmail)) {
      setErrors((prev) => ({ ...prev, [field]: 'Invalid email format' }));
      return;
    }

    const currentList = field === 'toEmail' ? toEmailList : ccEmailList;
    const setCurrentList = field === 'toEmail' ? setToEmailList : setCcEmailList;
    const setEmailInput = field === 'toEmail' ? setToEmail : setCcEmail;

    // Check if email already exists in the same list
    if (currentList.map((e) => e.toLowerCase()).includes(trimmedEmail)) {
      setErrors((prev) => ({ ...prev, [field]: 'Email already added' }));
      return;
    }

    // Get all approver emails
    const approverEmails = formData.spocEmail
      ? formData.spocEmail
          .split(',')
          .map((email) => email.trim().toLowerCase())
          .filter((e) => e)
      : [];

    // Check if email exists in Approver list
    if (approverEmails.includes(trimmedEmail)) {
      setErrors((prev) => ({
        ...prev,
        [field]: 'This email is already in Approver Email',
      }));
      return;
    }

    // Check cross-list duplicates
    if (
      field === 'ccEmail' &&
      toEmailList.map((e) => e.toLowerCase()).includes(trimmedEmail)
    ) {
      setErrors((prev) => ({
        ...prev,
        [field]: 'This email is already in TO Email',
      }));
      return;
    }

    if (
      field === 'toEmail' &&
      ccEmailList.map((e) => e.toLowerCase()).includes(trimmedEmail)
    ) {
      setErrors((prev) => ({
        ...prev,
        [field]: 'This email is already in CC Email',
      }));
      return;
    }

    // Add email to list
    setCurrentList((prevEmails) => [...prevEmails, trimmedEmail]);
    setEmailInput('');
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  // Delete email from list
  const handleDeleteEmail = (email: string, field: 'toEmail' | 'ccEmail') => {
    const setList = field === 'toEmail' ? setToEmailList : setCcEmailList;
    setList((prevEmails) => prevEmails.filter((e) => e !== email));
  };

  // Handle approver email blur (clean and deduplicate)
  const handleApproverEmailBlur = () => {
    if (formData.spocEmail) {
      const originalEmails = formData.spocEmail
        .split(',')
        .map((email) => email.trim().toLowerCase())
        .filter((email) => email);

      const validEmails = originalEmails.filter((email) =>
        hotelUtils.validateEmail(email)
      );
      const uniqueEmails = [...new Set(validEmails)];

      const hasDuplicates = originalEmails.length !== uniqueEmails.length;
      const hasInvalidEmails = originalEmails.length !== validEmails.length;

      if (hasDuplicates || hasInvalidEmails) {
        let errorMessage = '';
        if (hasDuplicates && hasInvalidEmails) {
          errorMessage = 'Duplicate and invalid emails have been removed';
        } else if (hasDuplicates) {
          errorMessage = 'Duplicate emails have been removed';
        } else {
          errorMessage = 'Invalid emails have been removed';
        }

        setErrors((prev) => ({
          ...prev,
          spocEmail: errorMessage,
        }));

        setTimeout(() => {
          setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors.spocEmail;
            return newErrors;
          });
        }, 2000);
      }

      setFormData((prev) => ({
        ...prev,
        spocEmail: uniqueEmails.join(', '),
      }));
    }
  };


  
  // Prepare share options
  const prepareShareOptions = (): hotelTypes.ShareOption[] => {
    if (!selectedRooms || selectedRooms.length === 0) return [];

    const grouped = Object.values(
      selectedRooms.reduce<Record<string, hotelTypes.ShareOption>>(
        (acc, room) => {
        const hotelCode = room.HotelCode;
        const key = hotelCode;

        if (!acc[key]) {
          acc[key] = {
            hotel_code: hotelCode,
            booking_code: room.BookingCode,
            hotel_name: room.HotelName,
            hotel_address: room.Address,
            city: room.CityName,
            source: room.Source ?? '2',
            Rooms: [],
          };
        }

        acc[key].Rooms.push({
          RoomType: Array.isArray(room.Name) ? room.Name[0] : room.Name,
          MealPlan: room.MealType || null,
          BaseFare: room.DayRates
            ? JSON.stringify(room.DayRates.flat().map((d) => d.BasePrice))
            : null,
          TotalFare: Number(room.TotalFare || 0),
          Tax: Number(room.TotalTax || 0),
        });

        return acc;
      }, {})
    );

    return grouped;
  };

  // Handle share button click
  const handleShareOptions = () => {
    if (!selectedRooms || selectedRooms.length === 0) return;
    setIsModalOpen(true);
  };

  // Submit share form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    //  FIX: Guard against null searchParams
    if (!searchParams) {
      await Swal.fire({
        title: 'Error!',
        text: 'Search parameters not available',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    setIsLoading(true);

    const shareOptions = prepareShareOptions();

    const requestBody = {
      Options: shareOptions,
      additional_email: toEmailList,
      approver_email: hotelUtils.cleanEmails(formData.spocEmail).split(', '),
      cc_email: ccEmailList,
      remark: formData.remark,
      admin_id: searchParams.admin_id,
      booking_id: searchParams.booking_id,
      checkin_date: searchParams.checkIn,
      checkout_date: searchParams.checkOut,
      no_of_seats: searchParams.Adults || 2,
      city: searchParams.city_name || '',
    };

    try {
      const response = await hotelApi.shareHotelOptions(requestBody);
      const data = response.data;

      if (data.success === '1') {
        setIsModalOpen(false);
        setSelectedRooms([]);

        await Swal.fire({
          title: 'Mail Sent',
          text: 'Mail Sent Successfully',
          imageUrl: 'https://cdn-icons-png.flaticon.com/512/845/845646.png',
          imageWidth: 75,
          imageHeight: 75,
          confirmButtonText: 'OK',
        });
      } else {
        setIsModalOpen(false);
        setSelectedRooms([]);
        await Swal.fire({
          title: 'Error!',
          text: 'Something went wrong. Please try again.',
          imageWidth: 75,
          imageHeight: 75,
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      await Swal.fire({
        title: 'Error!',
        text: 'Failed to send email. Please try again.',
        imageWidth: 75,
        imageHeight: 75,
        confirmButtonText: 'OK',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle modal close
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Add room to selected list
  // const addRoom = (room: any) => {
  const addRoom = (room: hotelTypes.SelectedRoom) => {
    setSelectedRooms((prev) => [...prev, room]);
  };

  // Remove room from selected list
  const removeRoom = (bookingCode: string) => {
    setSelectedRooms((prev) =>
      prev.filter((r) => r.BookingCode !== bookingCode)
    );
  };

  // Check if room is selected
  const isRoomSelected = (bookingCode: string) => {
    return selectedRooms.some((r) => r.BookingCode === bookingCode);
  };

  return {
    selectedRooms,
    setSelectedRooms,
    isModalOpen,
    setIsModalOpen,
    isLoading,
    toEmail,
    setToEmail,
    toEmailList,
    setToEmailList,
    ccEmail,
    setCcEmail,
    ccEmailList,
    setCcEmailList,
    errors,
    formData,
    handleChange,
    handleAddEmail,
    handleDeleteEmail,
    handleApproverEmailBlur,
    handleShareOptions,
    handleSubmit,
    handleCancel,
    addRoom,
    removeRoom,
    isRoomSelected,
  };
};