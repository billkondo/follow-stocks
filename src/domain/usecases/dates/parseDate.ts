const parseDate = (dateString = '31/12/2020', format = 'dd/mm/yyyy') => {
  const day = extractNumber(dateString, 'dd', format);
  const month = extractNumber(dateString, 'mm', format);
  const year = extractNumber(dateString, 'yyyy', format);

  return new Date(year, month - 1, day);
};

const extractNumber = (dateString = '', pattern = '', format = '') => {
  const index = format.search(pattern);
  const extractedNumber = dateString.substring(index, index + pattern.length);

  return parseInt(extractedNumber);
};

export default parseDate;
