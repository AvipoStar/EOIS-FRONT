import "../styles/TaskmanagerBoard.css";
import DeleteIcon from "../../../Common/assets/icons/delete.svg";
import EditIcon from "../../../Common/assets/icons/edit.svg";

export interface IBoard {
  id: number;
  name: string;
  description: string;
  coverColor: string;
  firm: any;
}

export interface ITaskmanagerBoard {
  key: any;
  board: IBoard | null;
  setSelectedBoard: React.Dispatch<React.SetStateAction<any>>;
  onDelete: any;
  onEdit: any;
}

export const TaskmanagerBoard = (params: ITaskmanagerBoard) => {
  return (
    <div
      key={params.key}
      className="TaskmanagerBoard"
      onDoubleClick={() => params.setSelectedBoard(params.board?.id)}
    >
      <div
        className="TaskmanagerBoard__Header"
        style={{ backgroundColor: `${params?.board?.coverColor}` }}
      />
      <div className="TaskmanagerBoardFill">
        <div className="TaskmanagerBoard__Name">{params?.board?.name}</div>
        <div className="TaskmanagerBoardButtons">
          <img
            src={EditIcon}
            className="TaskmanagerBoardIcon"
            onClick={() => params.onEdit(params.board)}
          />
          <img
            src={DeleteIcon}
            className="TaskmanagerBoardIcon"
            onClick={() => params.onDelete(params.board)}
          />
        </div>
      </div>
    </div>
  );
};
