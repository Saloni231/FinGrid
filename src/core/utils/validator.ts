export const isNumeric = (value: string): boolean => {
  const trimmed = value.trim();
  return /^\d+(\.\d+)?$/.test(trimmed);
};
