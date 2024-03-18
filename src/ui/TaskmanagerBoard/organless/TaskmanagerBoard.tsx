import React, { useEffect, useState } from "react";
import "../styles/TaskmanagerBoard.css";

export interface IBoard {
  id: number;
  name: string;
  description: string;
  coverColor: string;
  firm: any;
}

export interface ITaskmanagerBoard {
  board: IBoard | null;
  setSelectedBoard: React.Dispatch<React.SetStateAction<IBoard | null>>;
}

export const TaskmanagerBoard = (params: ITaskmanagerBoard) => {
  return (
    <div
      className="TaskmanagerBoard"
      onDoubleClick={() => params.setSelectedBoard(params.board)}
    >
      <div
        className="TaskmanagerBoard__Header"
        style={{ backgroundColor: `${params?.board?.coverColor}` }}
      />
      <div className="TaskmanagerBoard__Name">{params?.board?.name}</div>
    </div>
  );
};
