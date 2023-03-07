export const dateToUnix = (date: Date | string) => {
  return Math.floor(new Date(date).getTime() / 1000);
};

export const unixToDate = (unix: number | string) => {
  return new Date(Number(unix) * 1000);
};
