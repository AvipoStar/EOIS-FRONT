import { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

interface IDatePiker {
  dateStart: any;
  dateEnd: any;
  setDates: any;
}

export const MyMultyDatePiker = (params: IDatePiker) => {
  const [date, setdate] = useState<any | null>(null);

  useEffect(() => {
    setdate({ ...date, dateStart: params.dateStart, dateEnd: params.dateEnd });
  }, [params]);

  const handleSelect = (ranges: any) => {
    console.log("ranges", ranges);
  };

  return <DateRangePicker ranges={[date]} onChange={handleSelect} />;
};
