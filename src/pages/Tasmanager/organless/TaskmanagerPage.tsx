import { useEffect, useState } from "react";
import "../styles/Taskmanager.css";
import { Page } from "../../../ui/Page/organless/Page";
import {
  IBoard,
  TaskmanagerBoard,
} from "../../../ui/TaskmanagerBoard/organless/TaskmanagerBoard";
import { getBoards } from "../logic/getBoards";
import { useNavigate } from "react-router-dom";
import { TaskmanagerBoardModal } from "../molecules/TaskmanagerBoardModal";
import { FilterBlock } from "../../../ui/FilterBlock/organless/FilterBlock";
import { MySelect } from "../../../ui/MySelect/organless/MySelect";
import { useSelector } from "react-redux";
import { AgileEducationModal } from "../atoms/AgileEducationModal";

import QuestionIcon from "../../../Common/assets/icons/question.svg";
import { deleteBoard } from "../logic/deleteBoard";
import { DeleteBoardModal } from "../atoms/DeleteBoardModal";

export const TaskmanagerPage = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state: any) => state.userInfo);
  const firms = useSelector((state: any) => state.firmsOnCurrentSession);

  const [boards, setBoards] = useState<IBoard[]>([]);
  const [selectedBoard, setselectedBoard] = useState<IBoard | null>(null);

  const [showCreateModal, setshowCreateModal] = useState(false);
  const [showEducationModal, setshowEducationModal] = useState(false);
  const [showDeleteBoardModal, setshowDeleteBoardModal] = useState(false);

  const [reloadBoards, setreloadBoards] = useState(false);

  const [selectedFirms, setselectedFirms] = useState<number[]>([]);

  const [board4delete, setboard4delete] = useState<IBoard | null>(null);
  const [board4edit, setboard4edit] = useState<IBoard | null>(null);

  useEffect(() => {
    fetchBoards(selectedFirms.map((f: any) => (f.value ? f.value : f)));
  }, [selectedFirms]);

  useEffect(() => {
    if (reloadBoards) fetchBoards(selectedFirms.map((f: any) => f.value));
  }, [reloadBoards]);

  const fetchBoards = async (firmId: number[]) => {
    let fIds: number[] = [];
    if (userInfo.roleId == 2) {
      fIds.push(userInfo.firmId);
    } else {
      fIds = firmId;
    }
    const result = await getBoards(fIds);
    if (result) setBoards(result);
  };

  useEffect(() => {
    if (selectedBoard) navigate(`/tasks/${selectedBoard}`);
    else navigate(`/tasks`);
  }, [selectedBoard]);

  useEffect(() => {
    if (userInfo.roleId == 2) setselectedFirms(userInfo.firmId);
    else setselectedFirms(firms.map((f: any) => f.id));
  }, [firms]);

  const onDeleteClick = (board: IBoard) => {
    setboard4delete(board);
    setshowDeleteBoardModal(true);
  };

  const checkDeleteBoard = async (modalResult: boolean = false) => {
    if (modalResult) {
      deleteBoard(board4delete?.id);
      setTimeout(() => {
        setreloadBoards(true);
      }, 500);
    }
    setboard4delete(null);
    setshowDeleteBoardModal(false);
  };

  const onEditClick = (board: IBoard) => {
    setboard4edit(board);
    setshowCreateModal(true);
  };

  return (
    <Page>
      <img
        src={QuestionIcon}
        className="QuestionIcon"
        onClick={() => setshowEducationModal(true)}
      />
      {showEducationModal && (
        <AgileEducationModal setShow={setshowEducationModal} />
      )}
      {showDeleteBoardModal && (
        <DeleteBoardModal
          setShow={setshowDeleteBoardModal}
          board={board4delete}
          setResult={checkDeleteBoard}
        />
      )}
      {showCreateModal ? (
        <TaskmanagerBoardModal
          setShow={setshowCreateModal}
          setReloadBoards={setreloadBoards}
          board={board4edit}
        />
      ) : (
        <></>
      )}
      {userInfo.roleId != 2 && (
        <FilterBlock
          showCreateButton={true}
          setShowCreateModal={() => setshowCreateModal(true)}
          buttonText="Новый проект"
        >
          <MySelect
            isMulty={true}
            options={firms}
            onChange={(e: any) => setselectedFirms(e)}
            itemKey={"id"}
            label={"number"}
            placeholder={"Фирма"}
          />
        </FilterBlock>
      )}
      {boards &&
        boards.length &&
        boards.length > 0 &&
        boards?.map((b) => {
          return (
            <TaskmanagerBoard
              board={b}
              setSelectedBoard={(e: any) => setselectedBoard(e)}
              key={b.id}
              onDelete={onDeleteClick}
              onEdit={onEditClick}
            />
          );
        })}
    </Page>
  );
};
