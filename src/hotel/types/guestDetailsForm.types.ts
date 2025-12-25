
export interface GuestData {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  contact_no: string;
  pan?: string;
}

export interface GSTDetails {
  gstNo: string;
  cName: string;
  cAddr: string;
  contactNo: string;
  email: string;
}

export interface FormErrors {
  [key: number]: {
    firstName?: string;
    lastName?: string;
    email?: string;
    contact_no?: string;
    pan?: string;
  };
  gstNo?: string;
  cName?: string;
  cAddr?: string;
  contactNo?: string;
  email?: string;
}

export interface GuestDetailsFormProps {
  peopleData: GuestData[];
  gstDetails: GSTDetails;
  showGSTDetails: boolean;
  errors: FormErrors;
  // onGuestChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  onGuestChange: <K extends keyof GuestData>(
  index: number,
  field: K,
  value: GuestData[K]
) => void;

  onGSTChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGSTToggle: (checked: boolean) => void;
  disabled?: boolean;
}
