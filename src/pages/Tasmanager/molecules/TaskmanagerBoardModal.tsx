import { useEffect, useState } from "react";
import { MyModal } from "../../../ui/MyModal/organless/MyModal";
import { ContainerWithLabel } from "../../../ui/ContainerWithLabel/organless/ContainerWithLabel";
import { MySelect } from "../../../ui/MySelect/organless/MySelect";
import { useSelector } from "react-redux";
import { MyInput } from "../../../ui/MyInput/organless/MyInput";
import { IBoard } from "../../../ui/TaskmanagerBoard/organless/TaskmanagerBoard";
import { MyColorPicker } from "../../../ui/MyColorPeacker/organless/MyColorPeacker";
import { setBoard } from "../logic/setBoard";

interface ITaskmanagerBoardModal {
  board: IBoard | null;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setReloadBoards: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TaskmanagerBoardModal = (params: ITaskmanagerBoardModal) => {
  const firmsOnCurrentSession = useSelector(
    (state: any) => state.firmsOnCurrentSession
  );
  const [editedBoard, setEditedBoard] = useState<IBoard | null>(null);

  useEffect(() => {
    if (params.board) setEditedBoard(params.board);
  }, [params.board]);

  const handleChange = (selectedOption: any, fieldName: string) => {
    setEditedBoard((prev: any) => ({
      ...prev,
      [fieldName]: selectedOption.value ? selectedOption.value : selectedOption,
    }));
  };

  const saveBoard = async () => {
    if (editedBoard) {
      const result = await setBoard(editedBoard);
      console.log("result", result);
      if (result) {
        params.setReloadBoards(true);
        params.setShow(false);
      }
    }
  };

  return (
    <MyModal
      setShow={params.setShow}
      title={
        params.board?.id
          ? `Редактирование доски ${params.board.id}`
          : `Создание доски`
      }
      editOrSave={params.board?.id ? "edit" : "save"}
      handleSave={saveBoard}
    >
      <ContainerWithLabel title={"Фирма"} darkTheme>
        <MySelect
          isMulty={false}
          options={firmsOnCurrentSession}
          itemKey="id"
          label="number"
          placeholder="Фирма"
          onChange={(e: any) => handleChange(e, "firm")}
          defaultValues={firmsOnCurrentSession
            .filter((e: any) => e.id === params.board?.firm)
            .map((e: any) => ({ value: e.id, label: e.name }))}
        />
      </ContainerWithLabel>
      <ContainerWithLabel title={"Название"} darkTheme>
        <MyInput
          value={editedBoard?.name}
          setValue={(e) => handleChange(e, "name")}
        />
      </ContainerWithLabel>
      <ContainerWithLabel title={"Описание"} darkTheme>
        <MyInput
          value={editedBoard?.description}
          setValue={(e) => handleChange(e, "description")}
        />
      </ContainerWithLabel>
      <ContainerWithLabel title={"Цвет обложки"} darkTheme>
        <MyColorPicker
          color={editedBoard?.coverColor ?? ""}
          setColor={(e) => handleChange(e, "coverColor")}
        />
      </ContainerWithLabel>
    </MyModal>
  );
};
