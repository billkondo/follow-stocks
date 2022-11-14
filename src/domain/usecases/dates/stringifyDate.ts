const stringifyDate = (date = new Date(), format = 'dd/mm/yyyy') => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDate = format
    .replace('dd', formatNumber(day.toString(), 2))
    .replace('mm', formatNumber(month.toString(), 2))
    .replace('yyyy', formatNumber(year.toString(), 4));

  return formattedDate;
};

const formatNumber = (number = '', pad = 2) => {
  return number.padStart(pad, '0');
};

export default stringifyDate;
