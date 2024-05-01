import { useEffect, useState } from "react";
import "../styles/TaskmanagerBoardPage.css";
import { useParams } from "react-router-dom";
import { getTasksOnBoard } from "../logic/getTasksOnBoard";
import { TaskmanagerTask } from "../../../ui/TaskmanagerTask/organless/TaskmanagerTask";
import { TaskmanagerTaskModal } from "../molecules/TaskmanagerTaskModal";
import { MyInput } from "../../../ui/MyInput/organless/MyInput";
import { setColumn } from "../logic/setColumn";
import dragIcon from "../../../Common/assets/icons/dragLight.svg";
import { moveList } from "../logic/moveList";
import { IBoard } from "../../../ui/TaskmanagerBoard/organless/TaskmanagerBoard";
import { FilterBar } from "../atoms/filterBar/filterBar";
import { MyTable } from "../../../ui/MyTable/organless/MyTable";
import { PerfectTable } from "../../../ui/PerfectTable/organelles/PerfectTable";
import { getTasksTableSettings } from "../logic/getTableSettings";
import { useSelector } from "react-redux";

interface IList {
  id?: number;
  name?: string;
  serialNumber?: number;
  tasksOnList?: ITask[];
}

export interface ITask {
  id: number;
  name: string;
  discription: string; // Исправлено на description
  idList: number;
  serialNumber: number;
  creationDateTime: string;
  priority: number;
  deadLine: string;
  isDone: boolean;
}

export const TaskmanagerBoardPage = () => {
  const priorities = useSelector((state: any) => state.taskPriorities);

  const [tasks, setTasks] = useState<IList[]>([]);
  const [boardData, setboardData] = useState<IBoard | null>(null);
  let { id } = useParams<{ id: string }>(); // Получаем значение параметра id из маршрута

  const [showPrioritiesNames, setshowPrioritiesNames] = useState(false);
  const [showTaskModal, setshowTaskModal] = useState(false);
  const [editedTask, seteditedTask] = useState<ITask | null>(null);

  const [reloadTasks, setreloadTasks] = useState(false);

  const [newColumnFlag, setnewColumnFlag] = useState(false);
  const [newColumn, setnewColumn] = useState<IList | null>(null);

  const [isDragging, setIsDragging] = useState(false);

  const [viewMode, setviewMode] = useState(0);
  const [tasksList, settasksList] = useState<ITask[]>([]);

  useEffect(() => {
    fetchTasks(id);
    setreloadTasks(false);
  }, [id, reloadTasks]);

  const fetchTasks = async (boardId: any) => {
    const result = await getTasksOnBoard(boardId);
    if (result) {
      // Сортируем задачи по параметру serialNumber перед установкой состояния
      const sortedTasks = result.lists
        .map((list: IList) => ({
          ...list,
          tasksOnList: list?.tasksOnList?.sort(
            (a: ITask, b: ITask) => a.serialNumber - b.serialNumber
          ),
        }))
        .sort((a: any, b: any) => a.serialNumber - b.serialNumber); // Добавляем сортировку по serialNumber у листа
      setTasks(sortedTasks);

      const tL: any[] = [];
      result.lists.map((list: IList) =>
        list?.tasksOnList?.map((t: ITask) => {
          tL.push(t);
        })
      );
      settasksList(tL);
    }
    if (result.board_info) {
      setboardData(result.board_info);
    }
  };

  const handleEditTask = (task: ITask | null) => {
    seteditedTask(task);
    setshowTaskModal(!showTaskModal);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        newColumnFlag &&
        !event.target.closest(".NewTaskButton") &&
        !event.target.closest(".MyInput")
      ) {
        setnewColumnFlag(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    setNewColumnData("name", "");
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [newColumnFlag, setnewColumnFlag]);

  const setNewColumnData = (field: string, value: any) => {
    setnewColumn({ ...newColumn, [field]: value });
  };

  useEffect(() => {
    const createColumn = async () => {
      const column = {
        name: newColumn?.name ? newColumn?.name : "",
        idBoard: Number(id),
        serialNumber: tasks.length + 1,
      };

      const result = await setColumn(column);
    };
    if (newColumn?.name && newColumn?.name.length !== 0) createColumn();
  }, [newColumn?.name]);

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    listId?: string
  ) => {
    // Задаем данные, которые будут передаваться при перетаскивании (например, идентификатор задачи)
    if (listId) event.dataTransfer.setData("text/plain", listId);
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDrop = async (
    e: React.DragEvent<HTMLDivElement>,
    list: IList
  ) => {
    e.preventDefault();
    const draggedColumnId = e.dataTransfer.getData("text/plain");
    // Implement logic to swap columns here
    try {
      if (list && list.serialNumber) {
        const result = await moveList(
          Number(draggedColumnId),
          list.serialNumber
        );
        if (result) {
          fetchTasks(id);
        }
      }
    } catch (error) {
      console.error("Error moving task:", error);
    }
  };

  return (
    <div className="TaskmanagerShell">
      <div className="ActionsBar">
        {boardData?.name}
        <FilterBar setviewMode={setviewMode} />
      </div>
      <div className="TrelloLikePage__Boards" style={viewMode == 0 ? {flexDirection: 'row'} : {flexDirection: 'column'}}>
        {showTaskModal && (
          <TaskmanagerTaskModal
            task={editedTask}
            setShow={setshowTaskModal}
            setReloadBoards={setreloadTasks}
          />
        )}

        {viewMode == 0 ? (
          <>
            {tasks.map((list: IList) => (
              <div key={list.id} className="TaskmanagerColumn">
                <div className="TaskmanagerColumnHeader">
                  <img
                    src={dragIcon}
                    className="DNDColumnIcon"
                    draggable="true"
                    onDragStart={(e) =>
                      handleDragStart(e, list?.id?.toString())
                    }
                    onDragOver={(e) => handleDragOver(e)}
                    onDrop={(e) => handleDrop(e, list)}
                    onDragEnd={handleDragEnd}
                  />
                  {list.name}
                </div>
                <div
                  className="NewTaskButton"
                  onClick={() => handleEditTask(null)}
                >
                  Новая задача
                </div>
                {list?.tasksOnList?.map((task: ITask) => (
                  <TaskmanagerTask
                    key={task.id} // Добавляем ключ
                    task={task}
                    showPrioritiesNames={showPrioritiesNames}
                    setshowPrioritiesNames={setshowPrioritiesNames}
                    onDoubleClick={handleEditTask}
                    setReloadBoards={setreloadTasks}
                  />
                ))}
              </div>
            ))}
            <div className="TaskmanagerColumn">
              {!newColumnFlag ? (
                <div
                  className="NewTaskButton"
                  onClick={() => setnewColumnFlag(true)}
                >
                  + Новая колонка
                </div>
              ) : (
                <MyInput
                  value={newColumn?.name}
                  setValue={(e) => setNewColumnData("name", e)}
                  enterOnly
                />
              )}
            </div>
          </>
        ) : (
          <>
            <PerfectTable
              nameTable={"Задачи"}
              table={tasksList}
              tableSettings={getTasksTableSettings(priorities)}
            />
            {/* <MyTable
              list={tasksList}
              onDoubleClick={handleEditTask}
              field={["name", "priority"]}
              separator=","
            /> */}
          </>
        )}
      </div>
    </div>
  );
};
