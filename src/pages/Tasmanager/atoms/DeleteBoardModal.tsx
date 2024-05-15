import "../styles/AgileEducationModal.css";
import { IBoard } from "../../../ui/TaskmanagerBoard/organless/TaskmanagerBoard";
interface IDeleteBoardModal {
  setShow: any;
  board: IBoard | null;
  setResult: any;
}

export const DeleteBoardModal = (params: IDeleteBoardModal) => {
  return (
    <div className="AgileEducationModal">
      <div
        className="AgileEducationModalBackground"
        onClick={() => params.setShow(false)}
      />
      <div className="AgileEducationModalForm">
        <div>Вы точно хотите удалить проект {params.board?.name}?</div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <button className="ButtonSave" onClick={() => params.setResult(true)}>
            Да
          </button>
          <button
            className="ButtonCancel"
            onClick={() => params.setResult(false)}
          >
            Нет
          </button>
        </div>
      </div>
    </div>
  );
};
