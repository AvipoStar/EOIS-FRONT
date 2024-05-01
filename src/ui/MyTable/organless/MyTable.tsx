import { useEffect } from "react";
import "../styles/MyTable.css";
import React from "react";

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

  return (
    <div className="MyTableList">
      {params.list.map((item: any) => (
        <div
          className="MyTableItem"
          key={item.id}
          onDoubleClick={() => handleDoubleClick(item)}
        >
          {Array.isArray(params.field) ? (
            params.field.map((f: any, index: number) => (
              <React.Fragment key={index}>
                <span>{item[f]}</span>
                {index !== params.field.length - 1 && (
                  <span>
                    {params.separator ? `${params.separator} ` : " "}
                  </span>
                )}
              </React.Fragment>
            ))
          ) : (
            <span>{item[params.field]}</span>
          )}
        </div>
      ))}
    </div>
  );
};
