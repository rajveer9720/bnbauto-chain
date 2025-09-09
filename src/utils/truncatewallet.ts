export const truncateAddress = (
  address: string,
  startChars: number = 7,
  endChars: number = 5
) => {
  if (!address) return "";

  const start = address.substring(0, startChars);
  const end = address.substring(address.length - endChars);

  return `${start}...${end}`;
};

export const getRandomTimeout = (): number => {
  const min = 30 * 1000; // 30 seconds in ms
  const max = 2 * 60 * 1000; // 2 minutes in ms
  return Math.floor(Math.random() * (max - min + 1)) + min;
};