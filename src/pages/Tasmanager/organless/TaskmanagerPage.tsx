import React, { useEffect, useState } from "react";
import { Page } from "../../../ui/Page/organless/Page";
import {
  IBoard,
  TaskmanagerBoard,
} from "../../../ui/TaskmanagerBoard/organless/TaskmanagerBoard";
import { getBoards } from "../logic/getBoards";
import { Navigate, useNavigate } from "react-router-dom";
import { FilterBlock } from "../../../ui/FilterBlock/organless/FilterBlock";
import { TaskmanagerBoardModal } from "./TaskmanagerBoardModal";

export const TaskmanagerPage = () => {
  const navigate = useNavigate();

  const [boards, setBoards] = useState<IBoard[]>([]);
  const [selectedBoard, setselectedBoard] = useState<IBoard | null>(null);

  const [showCreateModal, setshowCreateModal] = useState(false);
  const [reloadBoards, setreloadBoards] = useState(false);

  useEffect(() => {
    fetchBoards(1);
  }, []);

  useEffect(() => {
    fetchBoards(1);
  }, [reloadBoards]);

  const fetchBoards = async (firmId: number) => {
    const result = await getBoards(firmId);
    if (result) setBoards(result);
  };

  useEffect(() => {
    if (selectedBoard) navigate(`/tasks/${selectedBoard?.id}`);
    else navigate(`/tasks`);
  }, [selectedBoard]);

  return (
    <Page>
      {showCreateModal ? (
        <TaskmanagerBoardModal
          setShow={setshowCreateModal}
          setReloadBoards={setreloadBoards}
        />
      ) : (
        <></>
      )}
      {boards.map((b) => {
        return (
          <TaskmanagerBoard
            board={b}
            setSelectedBoard={(e: any) => setselectedBoard(e)}
          />
        );
      })}
      <div
        className="TaskmanagerBoard"
        onDoubleClick={() => setshowCreateModal(true)}
      >
        Новая доска
      </div>
    </Page>
  );
};
