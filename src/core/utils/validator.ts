export const isNumeric = (value: string): boolean => {
  return value === "" || /^(\d+\.?\d*|\.\d+)$/.test(value);
};
