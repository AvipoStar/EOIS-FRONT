import { ReactNode } from "react";
import "../styles/ContainerWithLabel.css";

interface IContainerWithLabel {
  title: string;
  required?: boolean;
  children: ReactNode;
  darkTheme?: boolean;
}

export const ContainerWithLabel = (params: IContainerWithLabel) => {
  return (
    <div className="ContainerWithLabel">
      <div className={params.darkTheme ? "Label light" : "Label dark"}>
        {params.title} {params.required && <span className="required">*</span>}
      </div>
      {params.children}
    </div>
  );
};
