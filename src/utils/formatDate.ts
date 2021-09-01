import format from "date-fns/format";

export const formatDate = (timestamp: string): string => {
  const date = new Date(timestamp);
  return format(date, "MM/dd/yyyy HH:mm");
};
