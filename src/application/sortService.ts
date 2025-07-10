export const numericValueComparator = (a: string, b: string) => {
  return parseFloat(a) - parseFloat(b);
};

export const stringValueComparator = (a: string, b: string) => {
  return a.toLowerCase().localeCompare(b.toLowerCase());
};
