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

export const StudentsPage = () => {
  const userInfo = useSelector((state: any) => state.userInfo);
  const profiles = useSelector((state: any) => state.profiles);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedProfiles, setSelectedProfiles] = useState<any | null>(null);
  const [students, setStudents] = useState<IUser[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<IUser | null>(null);
  const [reloadStudents, setReloadStudents] = useState(false);
  const [searchString, setSearchString] = useState("");
  const debouncedValue = useDebounse(searchString);

  useEffect(() => {
    setSelectedProfiles(profiles.map((e: any) => e.id));
  }, [profiles]);

  useEffect(() => {
    fetchCurators();
  }, [selectedProfiles, debouncedValue]);

  useEffect(() => {
    if (reloadStudents) {
      fetchCurators();
      setReloadStudents(false);
    }
  }, [reloadStudents]);

  const handleDirectionsChange = (event: any) => {
    const values = event.map((e: any) => e.value);
    setSelectedProfiles(values);
  };

  const fetchCurators = async () => {
    // const prIds =
    //   selectedProfiles?.length > 0
    //     ? selectedProfiles
    //     : profiles.map((d: any) => d.id);
    // const result = await getCurators(prIds, debouncedValue);
    // if (result) setStudents(result);
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
      <FilterBlock
        showCreateButton={false}
        setShowCreateModal={() => setShowCreateModal(true)}
        buttonText={""} // buttonText="Новый куратор"
      >
        <ContainerWithLabel title={"Поиск"}>
          <MyInput
            value={searchString}
            setValue={(e: any) => setSearchString(e)}
            placeholder="Поиск"
          />
        </ContainerWithLabel>
        <MySelect
          isMulty={true}
          options={profiles}
          onChange={(e: any) => handleDirectionsChange(e)}
          itemKey="id"
          label="nameProfile"
          placeholder="Профиль"
        />
      </FilterBlock>
      <UserGallery
        array={students}
        onDoubliClick={(e: any) => setSelectedStudent(e)}
      />
    </Page>
  );
};
