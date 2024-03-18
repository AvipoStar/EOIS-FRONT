import React from "react";
import "../styles/MyInput.css";

interface IMyInput {
  value: any;
  setValue: (value: React.SetStateAction<any>) => void;
  type?: string;
}

export const MyInput = (params: IMyInput) => {
  return (
    <>
      <input
        className="MyInput"
        value={params.value}
        onChange={(e: any) => params.setValue(e.target.value)}
        type={params.type ? params.type : "text"}
      />
    </>
  );
};
