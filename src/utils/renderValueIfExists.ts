import isNotNullOrUndefined from "./isNotNullOrUndefined";

export default (value: string | number | undefined | null): string => {
  const isValueNotNullOrUndefined = isNotNullOrUndefined(value);
  if (!isValueNotNullOrUndefined) return "Unknown";
  return value!.toString();
};
