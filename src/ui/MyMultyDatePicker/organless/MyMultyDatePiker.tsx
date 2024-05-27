import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import "../styles/MyMultyDatePiker.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

interface IDatePiker {
  dateStart?: string;
  dateEnd?: string;
  setDates: any;
}

export const MyMultyDatePiker = (params: IDatePiker) => {
  const [selection, setSelection] = useState({
    startDate: params?.dateStart ? new Date(params?.dateStart) : new Date(),
    endDate: params?.dateEnd ? new Date(params?.dateEnd) : new Date(),
    key: "selection",
  });

  const handleSelect = (ranges: any) => {
    setSelection(ranges.selection);
    params.setDates(ranges.selection.startDate, ranges.selection.endDate);
  };

  return (
    <DateRange
      editableDateInputs={true}
      moveRangeOnFirstSelection={false}
      ranges={[selection]}
      onChange={handleSelect}
      showMonthAndYearPickers={false}
      className="custom-date-range"
    />
  );
};
