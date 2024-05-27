/**
 * Конвертирует дату в формат "дд.мм.гггг" с возможностью включения времени.
 * @param {string} date - Строка с датой в формате "гггг-мм-ддTчч:мм:сс".
 * @param {boolean} includeTime - Флаг для опционального включения времени. По умолчанию равен false.
 * @returns {string} - Строка с конвертированной датой в формате "дд.мм.гггг" или "дд.мм.гггг чч:мм:сс" в зависимости от значения флага includeTime.
 */
export const convertDate = (date: string, includeTime = false) => {
  const [datePart, timePart] = date.split("T");
  const [year, month, day] = datePart.split("-");
  if (includeTime) {
    const [hours, minutes, seconds] = timePart.split(":");
    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
  } else {
    return `${day}.${month}.${year}`;
  }
};

/**
 * Конвертирует дату в формат "гггг.мм.дд" .
 * @param {string} date - Строка с датой в формате "гггг-мм-ддTчч:мм:сс".
 * @returns {string} - Строка с конвертированной датой в формате "дд.мм.гггг" или "дд.мм.гггг чч:мм:сс" в зависимости от значения флага includeTime.
 */
export const convertDate4BD = (date: string) => {
  const [datePart, timePart] = date.split("T");
  const [year, month, day] = datePart.split("-");

  return `${year}-${month}-${day}`;
};
