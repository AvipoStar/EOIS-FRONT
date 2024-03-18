import React, { useEffect, useState } from "react";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

interface IDatePiker {
  dateStart: any;
  dateEnd: any;
  setDates: any
}

export const MyMultyDatePiker = (params: IDatePiker) => {
  const [date, setdate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection' 
  });

  const handleSelect = (ranges: any)=>{
    console.log('ranges', ranges);
    // {
    //   selection: {
    //     startDate: [native Date Object],
    //     endDate: [native Date Object],
    //   }
    // }
  }

  return (
    <DateRangePicker
    ranges={[date]}
    onChange={handleSelect}
  />
  );
};
