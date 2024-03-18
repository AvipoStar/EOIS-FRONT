import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { convertDate } from "../../../Common/functions/converDate";

interface IPlotBlock {
  title?: string;
  data: any;
}

export const MyPlot = (params: IPlotBlock) => {
  const [convertedData, setConvertedData] = useState<
    { name: string; value: number }[]
  >([]);

  useEffect(() => {
    const convData = params.data?.map((e: any) => ({
      name: convertDate(e.datetimeEvent),
      value: e.currentBalance,
    }));
    setConvertedData(convData);
  }, [params.data]);

  return (
    <LineChart
      width={600}
      height={300}
      className="LineChart"
      data={convertedData}
      margin={{ top: 0, right: 10, bottom: 30, left: 0 }}
    >
      <Line type="monotone" dataKey="value" stroke="var(--color-main-green)" className="Line"/>
      <CartesianGrid
        stroke="var(--color-main-grey-light)"
        strokeDasharray="5 5"
      />
      <XAxis
        dataKey="name"
        stroke="var(--color-main-grey-light)"
        tickMargin={20}
      />
      <YAxis stroke="var(--color-main-grey-light)" tickMargin={10}/>
      <Tooltip />
    </LineChart>
  );
};
