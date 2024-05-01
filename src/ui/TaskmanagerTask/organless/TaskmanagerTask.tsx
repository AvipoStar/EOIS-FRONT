import React, { useState, useRef } from "react";
import { ITask } from "../../../pages/Tasmanager/organless/TaskmanagerBoardPage";
import { useSelector } from "react-redux";
import "../styles/TaskmanagerTask.css";
import { moveTask } from "../../../pages/Tasmanager/logic/moveTask";
import dragIcon from "../../../Common/assets/icons/dragLight.svg";

export interface ITaskmanagerTask {
  task: ITask;
  showPrioritiesNames: boolean;
  setshowPrioritiesNames: React.Dispatch<React.SetStateAction<boolean>>;
  onDoubleClick: any;
  setReloadBoards: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TaskmanagerTask = (params: ITaskmanagerTask) => {
  const priorities = useSelector((state: any) => state.taskPriorities);

  const getPriorityColor = (priority: number) => {
    const priorityColor = priorities.find((p: any) => p.id === priority);
    return priorityColor ? priorityColor.color : "white";
  };

  // Создаем ссылку для задачи, которая будет использоваться при перетаскивании
  const taskRef = useRef<HTMLDivElement>(null);

  // Состояние, чтобы отслеживать, перетаскивается ли в данный момент задача или нет
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    // Задаем данные, которые будут передаваться при перетаскивании (например, идентификатор задачи)
    event.dataTransfer.setData("text/plain", params.task.id.toString());
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    // Предотвращаем стандартное поведение браузера для разрешения перетаскивания
    event.preventDefault();
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    // Предотвращаем стандартное поведение браузера для разрешения перетаскивания
    event.preventDefault();
    // Получаем данные из перетаскиваемого элемента
    const taskId = event.dataTransfer.getData("text/plain");
    // Выполняем функцию moveTaskApi с данными о перемещении
    try {
      await moveTask(
        Number(taskId),
        params.task.idList,
        params.task.serialNumber
      );
      params.setReloadBoards(true);
    } catch (error) {
      console.error("Error moving task:", error);
    }
  };

  return (
    <div
      ref={taskRef}
      key={params.task.id}
      className={`TaskmanagerTask ${isDragging ? "dragging" : ""}`}
      onDoubleClick={() => params.onDoubleClick(params.task)}
      style={{
        boxShadow: isDragging ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "none",
      }}
    >
      <img
        src={dragIcon}
        className="DNDIcon"
        draggable="true"
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragEnd={handleDragEnd}
      />
      <div>{params.task.name}</div>
      <div
        className={
          params.showPrioritiesNames
            ? "TaskmanagerTaskPriority Open"
            : "TaskmanagerTaskPriority"
        }
        style={{ backgroundColor: getPriorityColor(params.task.priority) }}
        onClick={() =>
          params.setshowPrioritiesNames(!params.showPrioritiesNames)
        }
      >
        {params.showPrioritiesNames &&
          priorities.find((p: any) => p.id === params.task.priority)?.name}
      </div>
    </div>
  );
};
