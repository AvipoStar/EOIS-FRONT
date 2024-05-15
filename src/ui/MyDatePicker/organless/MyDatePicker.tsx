import { useState } from 'react';
import '../styles/MyDatePicker.css'
interface IDatePicker {
  initialDate?: string;
  onDateChange: (newDate: string) => void;
}
export const MyDatePicker = (params: IDatePicker) => {
  const [date, setDate] = useState(params.initialDate);
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value;
    setDate(newDate);
    params.onDateChange(newDate);
  };
  return (
    <input
      className='MyDatePicker'
      type="datetime-local" // Изменяем тип на datetime-local
      value={date}
      onChange={handleDateChange}
      max="9999-12-31T23:59" // Максимальная дата и время
      min="1000-01-01T00:00" // Минимальная дата и время
    />
  );
};