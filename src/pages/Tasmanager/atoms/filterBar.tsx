import React, { useState } from "react";
import { MySelect } from "../../../ui/MySelect/organless/MySelect";

const viewModes = [
  { id: 0, name: "Доска" },
  { id: 1, name: "Список" },
];

interface IFilterBar {
  setviewMode: any;
}

export const FilterBar = (params: IFilterBar) => {
  return (
    <div>
      <MySelect
        isMulty={false}
        options={viewModes}
        onChange={(e: any) => {
          params.setviewMode(e.value);
        }}
        itemKey={"id"}
        label={"name"}
        placeholder={"Режим отображения"}
      />
    </div>
  );
};
