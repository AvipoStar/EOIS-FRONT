import React, { ReactNode } from "react";
import "../styles/Page.css"; 

interface IPage {
  children?: ReactNode;
}

export const Page = (params: IPage) => {
  return (
    <div className="Page">
      {params.children}
    </div>
  );
};

