export const isNumeric = (value: string) => {
  return /^(\d+(\.\d*)?)?$/.test(value); // allows 5, 5.0, 5., but not 5.. or non-numeric
};
