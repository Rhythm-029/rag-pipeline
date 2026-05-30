export const preprocessText = (
  text: string
): string => {
  return text
    .replace(/\s+/g, " ")
    .replace(/\n+/g, " ")
    .trim();
};