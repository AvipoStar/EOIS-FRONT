import React, { useEffect } from "react";
import { ReactNode } from "react";
import "../styles/MyModal.css";
import HideImage from "../../../Common/assets/icons/arrowRigth.svg";

interface MyModalProps {
  children: ReactNode[] | ReactNode;
  setShow: any;
  title: string;
  editOrSave: "save" | "edit";
  setEdited?: React.Dispatch<React.SetStateAction<any | null>>;
  handleSave: () => any;
}

export const MyModal = (params: MyModalProps) => {
  const onHide = () => {
    params?.setEdited && params?.setEdited(null);
    params.setShow(false);
    document.body.classList.remove('modal-open');
  };

  useEffect(() => {
    document.body.classList.add('modal-open');
  }, []);

  return (
    <div className="MyModal">
      <div className="MyModal__Background" onClick={() => onHide()} />
      <div className="MyModal__Background__Children">
        <div style={{display:'flex', flexDirection: 'column'}}>
          <div className="MyModal__Title">{params.title}</div>
          <div className="MyModal__HideButton__Background" onClick={() => onHide()}>
            <img src={HideImage} className="MyModal__HideButton" />
          </div>
          {params.children}
        </div>
        <div className="ButtonBar">
          <div className="ButtonCancel" onClick={() => onHide()}>
            Отмена
          </div>
          <div className="ButtonSave" onClick={params.handleSave}>{`${
            params.editOrSave == "edit" ? "Сохранение изменений" : "Создать"
          }`}</div>
        </div>
      </div>
    </div>
  );
};
