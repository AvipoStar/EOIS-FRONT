import { useEffect, useState } from "react";
import { MyModal } from "../../../ui/MyModal/organless/MyModal";
import { ContainerWithLabel } from "../../../ui/ContainerWithLabel/organless/ContainerWithLabel";
import { MySelect } from "../../../ui/MySelect/organless/MySelect";
import { MyInput } from "../../../ui/MyInput/organless/MyInput";
import { ITask } from "../organless/TaskmanagerBoardPage";
import { MyDatePicker } from "../../../ui/MyDatePicker/organless/MyDatePicker";
import { IUser } from "../../LK/organless/LKPage";
import { getExecutors } from "../logic/getExecutors";
import { useSelector } from "react-redux";
import { setTask } from "../logic/setTask";

interface ITaskmanagerTaskModal {
  task: ITask | null;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setReloadBoards: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TaskmanagerTaskModal = (params: ITaskmanagerTaskModal) => {
  const taskPriorities = useSelector((state: any) => state.taskPriorities);

  const [editedTask, setEditedTask] = useState<ITask | null>(null);
  const [executors, setexecutors] = useState<IUser[]>([]);
  const [convertedExecutors, setconvertedExecutors] = useState<any[]>([]);

  useEffect(() => {
    setEditedTask(params.task);
    fetchExecutors();
  }, [params.task]);

  const fetchExecutors = async () => {
    const result = await getExecutors(1);
    setexecutors(result);
  };

  useEffect(() => {
    const convStuds: any[] = [];
    executors.map((s) => {
      const newStud: any = s;
      newStud.fio = `${s.surname} ${s.name} ${s.patronymic}`;
      convStuds.push(s);
    });
    setconvertedExecutors(convStuds);
  }, [executors]);

  const handleChange = (selectedOption: any, fieldName: string) => {
    if (Array.isArray(selectedOption)) {
      const newField = selectedOption.map((so: any) => {
        return so.value;
      });
      setEditedTask((prev: any) => ({
        ...prev,
        [fieldName]: newField,
      }));
    } else
      setEditedTask((prev: any) => ({
        ...prev,
        [fieldName]: selectedOption.value
          ? selectedOption.value
          : selectedOption,
      }));
  };

  const saveTask = async () => {
    if (editedTask) {
      const result = await setTask(editedTask);
      if (result) {
        params.setReloadBoards(true);
        params.setShow(false);
      }
    }
  };

  return (
    <MyModal
      setShow={params.setShow}
      title={editedTask?.name ?? ""}
      editOrSave={"save"}
      handleSave={saveTask}
    >
      <ContainerWithLabel title={"Текст задачи"} darkTheme>
        <MyInput
          value={editedTask?.name}
          setValue={(e: any) => handleChange(e, "name")}
        />
      </ContainerWithLabel>
      <ContainerWithLabel title={"Комментарий"} darkTheme>
        <MyInput
          value={editedTask?.discription}
          setValue={(e: any) => handleChange(e, "discription")}
        />
      </ContainerWithLabel>
      <ContainerWithLabel title={"Дата конца задачи"} darkTheme>
        <MyDatePicker
          initialDate={editedTask?.deadLine ?? ""}
          onDateChange={(e: any) => handleChange(e, "deadLine")}
        />
      </ContainerWithLabel>
      <ContainerWithLabel title={"Приоритет"} darkTheme>
        <MySelect
          isMulty={false}
          options={taskPriorities}
          itemKey="id"
          label="name"
          placeholder="Приоритет"
          onChange={(e: any) => handleChange(e, "priority")}
        />
      </ContainerWithLabel>
      <ContainerWithLabel title={"Исполнители"} darkTheme>
        <MySelect
          isMulty={true}
          options={convertedExecutors}
          itemKey="id"
          label="fio"
          placeholder="Исполнители"
          onChange={(e: any) => handleChange(e, "executors")}
        />
      </ContainerWithLabel>
    </MyModal>
  );
};
