import React, { useEffect } from "react";
import "../styles/MyTable.css";

interface IMyTable {
  list: any[];
  onDoubleClick: (item: any) => void;
  field: string | string[];
  separator?: string;
}

export const MyTable = (params: IMyTable) => {
  const handleDoubleClick = (item: any) => {
    params.onDoubleClick(item);
  };

  useEffect(() => {
    console.log('params.list', params.list)
  }, [params.list]);

  return (
    <ul className="MyTableList">
      {params.list.map((item: any) => (
        <li
          className="MyTableItem"
          key={item.id}
          onDoubleClick={() => handleDoubleClick(item)}
        >
          {Array.isArray(params.field)
            ? params.field.map((f: any) => `${item[f]}${params.separator ? ` ${params.separator} ` : ' '}`)
            : item[params.field]}
        </li>
      ))}
    </ul>
  );
};
