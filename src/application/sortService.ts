export const numericValueComparator = (a: string, b: string) => {
  return parseInt(a) - parseInt(b);
};

export const stringValueComparator = (a: string, b: string) => {
  return a.toLowerCase().localeCompare(b.toLowerCase());
};
