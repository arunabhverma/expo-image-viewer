export const shortTheTitle = (title: string) => {
  return title.length >= 15
    ? title.slice(0, 6) + "..." + title.slice(title.length - 6, title.length)
    : title;
};
