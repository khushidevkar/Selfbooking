export const formatDateTime = (dateString: string | undefined): string => {
  if (!dateString) return "";

  const date = new Date(dateString.replace(" ", "T"));
  if (isNaN(date.getTime())) return ""; // handle invalid date

  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const formatHotelDateTime = (dateTimeStr: string | undefined): string => {
  if (!dateTimeStr) return "N/A";

  const [datePart, timePart] = dateTimeStr.split(" ");
  if (!datePart || !timePart) return "Invalid date";

  const [day, month, year] = datePart.split("-");
  const fromDate = new Date(`${year}-${month}-${day}T${timePart}`);

  if (isNaN(fromDate.getTime())) return "Invalid date";

  return fromDate.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
