import { axiosInstance } from "../../../Common/axios/axiosInstance";
import { ITask } from "../organless/TaskmanagerBoardPage";

export const setTask = async (task: ITask) => {
    console.log('task', task)
  if (task.id) {
    const response = await axiosInstance.patch("taskmanager/updateTask", {
      id: task.id,
      isDone: task.isDone,
      name: task.name,
      description: task.discription,
      deadline: task.deadLine,
      priority: task.priority,
      executors: task.executors
    });
    return response.data;
  } else {
    const response = await axiosInstance.post("taskmanager/createTask", {
      name: task.name,
      description: task.discription,
      idList: task.idList,
      creationDateTime: new Date(),
      deadline: task.deadLine,
      priority: task.priority,
      executors: task.executors

    });
    return response.data;
  }
};
