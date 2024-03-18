import React, { ChangeEvent, useState } from "react";
import "../styles/SubmitButton.css";

interface IMyInput {
  text: string;
  onClick: any;
}

export const SubmitButton = (params: IMyInput) => {
  return (
    <button className="SubmitButton" onClick={params.onClick}>
      {params.text}
    </button>
  );
};
