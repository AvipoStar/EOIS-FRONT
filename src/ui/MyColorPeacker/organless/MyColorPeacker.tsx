import React from "react";
import "../styles/MyColorPicker.css";

interface IMyColorPicker {
  color: string;
  setColor: (value: React.SetStateAction<any>) => void;
}

export const MyColorPicker = (params: IMyColorPicker) => {
  return (
    <input
      type="color"
      value={params.color}
      onChange={(e: any) => params.setColor(e.target.value)}
      className="ColorPicker"
    />
  );
};
