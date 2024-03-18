import React, { ReactNode, useState } from "react";

import "../styles/FilterBlock.css";

import filterIcon from "../../../Common/assets/icons/filter.svg";
import closeIcon from "../../../Common/assets/icons/close.svg";
import plusIcon from "../../../Common/assets/icons/plus.svg";

interface IFilterBlock {
  children: ReactNode;
  showCreateButton: Boolean;
  setShowCreateModal: any;
  buttonText: string;
}

export const FilterBlock = (params: IFilterBlock) => {
  const [show, setshow] = useState(false);
  return (
    <div className="FilterBlock">
      {!show ? (
        <div className="FilterBlock Closed">
          <img src={filterIcon} style={{ cursor: "pointer" }} onClick={() => setshow(true)} />
          {params.showCreateButton && (
            <button className="CreateButton" onClick={() => params.setShowCreateModal()}>
              <img src={plusIcon} style={{ cursor: "pointer" }} />
              <div>{params.buttonText}</div>
            </button>
          )}
        </div>
      ) : (
        <div className="FilterBlock Opened">
          <div className="FilterInnerBlock">{params.children}</div>
          <img src={closeIcon} style={{ cursor: "pointer" }} onClick={() => setshow(false)} />
        </div>
      )}
    </div>
  );
};
