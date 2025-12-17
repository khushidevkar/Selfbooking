// import { ui, icons } from '@/index';
// // import { DayPicker } from 'react-day-picker';
// // import 'react-day-picker/dist/style.css';

// interface DateSelectorProps {
//   label: string;
//   date: Date | null;                  // use null instead of undefined
//   isOpen: boolean;
//   setIsOpen: (val: boolean) => void;
//   onChange: (date: Date | null) => void;  // use null
//   minDate?: Date;
// }

// export const DateSelector: React.FC<DateSelectorProps> = ({
//   label,
//   date,
//   isOpen,
//   setIsOpen,
//   onChange,
//   minDate
// }) => {
//   return (
   


//      <ui.FormField label={label} icon={icons.CalendarDays}>
//       <ui.Popover  open={isOpen} onOpenChange={setIsOpen}>
//         <ui.PopoverTrigger  asChild>
//           <ui.Button
//             variant="outline"
//             className="w-full justify-between h-11 bg-white hover:bg-gray-50 border-gray-200"
//           >
//             <span className="font-semibold">
//               {date ? date.toLocaleDateString('en-GB') : `Select ${label.toLowerCase()}`}
//             </span>
//             <icons.Calendar className="ml-2 h-4 w-4 opacity-50" />
//           </ui.Button>
//         </ui.PopoverTrigger>
//         <ui.PopoverContent className="w-auto p-0 border-0 bg-white shadow-xl shadow-black/15" align="start">
//           <ui.Calendar
          
//             mode="single"
//             selected={date ?? undefined}
//             onSelect={(selected) => {
//               onChange(selected ?? null);
//               setIsOpen(false);
//             }}
//             disabled={minDate ? { before: minDate } : undefined}
//             initialFocus
//           />
//         </ui.PopoverContent>
//       </ui.Popover>
//     </ui.FormField>
//   );
// };


import { ui, icons } from "@/index";

interface DateSelectorProps {
  label: string;
  date: Date | null;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  onChange: (date: Date | null) => void;
  minDate?: Date;
}

export const DateSelector: React.FC<DateSelectorProps> = ({
  label,
  date,
  isOpen,
  setIsOpen,
  onChange,
  minDate,
}) => {
  return (
    <ui.FormField label={label} icon={icons.CalendarDays}>
      <ui.Popover open={isOpen} onOpenChange={setIsOpen}>
        <ui.PopoverTrigger asChild>
          <ui.Button
            variant="outline"
            className="
          
              w-full justify-between h-11
              bg-white
              border-gray-200
              hover:bg-gray-50
              focus-visible:ring-2
              focus-visible:ring-[#785ef7]/40
              focus-visible:ring-offset-2
            "
          >
            <span className="font-semibold">
              {date
                ? date.toLocaleDateString("en-GB")
                : `Select ${label.toLowerCase()}`}
            </span>
            <icons.Calendar className="ml-2 h-4 w-4 opacity-50" />
          </ui.Button>
        </ui.PopoverTrigger>

        <ui.PopoverContent
          align="start"
          className="
          
            w-auto p-0
            border-0
            bg-white
            rounded-xl
            shadow-xl shadow-black/15
          "
        >
          <ui.Calendar
            mode="single"
            selected={date ?? undefined}
            onSelect={(selected) => {
              onChange(selected ?? null);
              setIsOpen(false);
            }}
            disabled={minDate ? { before: minDate } : undefined}
            initialFocus
            className="
               [&_.rdp-day]:cursor-pointer
              [&_.rdp-day:hover]:bg-[#785ef7]/5
              [&_.rdp-day_selected]:bg-[#785ef7]
              [&_.rdp-day_selected]:text-white
              [&_.rdp-day_selected:hover]:bg-[#785ef7]
              [&_.rdp-day_today]:border-[#785ef7]
            "
          />
        </ui.PopoverContent>
      </ui.Popover>
    </ui.FormField>
  );
};
