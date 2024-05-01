import "../styles/TaskmanagerBoard.css";

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
      <div className="TaskmanagerBoard__Name">{params?.board?.name}</div>
    </div>
  );
};
