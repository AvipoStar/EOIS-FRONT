import { useEffect, useState } from "react";

import { Page } from "../../../ui/Page/organless/Page";
import { useSelector } from "react-redux";
import { FilterBlock } from "../../../ui/FilterBlock/organless/FilterBlock";
import { MySelect } from "../../../ui/MySelect/organless/MySelect";
import { StudentsModal } from "./StudentsModal";
import { MyInput } from "../../../ui/MyInput/organless/MyInput";
import { ContainerWithLabel } from "../../../ui/ContainerWithLabel/organless/ContainerWithLabel";
import { IUser } from "../../LK/organless/LKPage";
import { useDebounse } from "../../../Common/hooks/useDebounce";
import { UserGallery } from "../../../ui/Gallery/organless/UserGallery";
import { getStudents } from "../logic/getStudents";

export const StudentsPage = () => {
  const sessions = useSelector((state: any) => state.sessions);

  const [students, setStudents] = useState<IUser[]>([]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<IUser | null>(null);
  const [reloadStudents, setReloadStudents] = useState(false);

  const [searchString, setSearchString] = useState("");
  const debouncedValue = useDebounse(searchString);

  useEffect(() => {
    fetchStudents();
  }, [debouncedValue]);

  useEffect(() => {
    if (reloadStudents) {
      fetchStudents();
      setReloadStudents(false);
    }
  }, [reloadStudents]);

  const fetchStudents = async () => {
    const result = await getStudents(debouncedValue);
    if (result) setStudents(result);
  };

  useEffect(() => {
    if (selectedStudent) setShowCreateModal(true);
  }, [selectedStudent]);

  return (
    <Page>
      {showCreateModal && (
        <StudentsModal
          editedCurator={selectedStudent}
          setShow={setShowCreateModal}
          setEditedCurator={setSelectedStudent}
          setReloadCurators={setReloadStudents}
        />
      )}
      <ContainerWithLabel title={"Поиск"}>
          <MyInput
            value={searchString}
            setValue={(e: any) => setSearchString(e)}
            placeholder="Поиск"
          />
        </ContainerWithLabel>
      <UserGallery
        array={students}
        onDoubliClick={(e: any) => setSelectedStudent(e)}
      />
    </Page>
  );
};
