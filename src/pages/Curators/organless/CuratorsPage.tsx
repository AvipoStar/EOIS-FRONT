import { useEffect, useState } from "react";

import { Page } from "../../../ui/Page/organless/Page";
import { useSelector } from "react-redux";
import { FilterBlock } from "../../../ui/FilterBlock/organless/FilterBlock";
import { MySelect } from "../../../ui/MySelect/organless/MySelect";
import { InfoBlock } from "../../../ui/InfoBlock/organless/InfoBlock";
import { MyTable } from "../../../ui/MyTable/organless/MyTable";
import { CuratorsModal } from "./CuratorsModal";
import { MyInput } from "../../../ui/MyInput/organless/MyInput";
import { ContainerWithLabel } from "../../../ui/ContainerWithLabel/organless/ContainerWithLabel";
import { getCurators } from "../logic/getCurators";
import { IUser } from "../../LK/organless/LKPage";
import { useDebounse } from "../../../Common/hooks/useDebounce";
import { PerfectTable } from "../../../ui/PerfectTable/organelles/PerfectTable";
import { getTableSettings } from "../logic/getTableSettings";
import { UserGallery } from "../../../ui/Gallery/organless/UserGallery";

export const CuratorsPage = () => {
  const userInfo = useSelector((state: any) => state.userInfo);
  const profiles = useSelector((state: any) => state.profiles);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedProfiles, setSelectedProfiles] = useState<any | null>(null);
  const [curators, setCurators] = useState<IUser[]>([]);
  const [selectedCurator, setSelectedCurator] = useState<IUser | null>(null);
  const [reloadCurator, setReloadCurator] = useState(false);
  const [searchString, setSearchString] = useState("");
  const debouncedValue = useDebounse(searchString);

  useEffect(() => {
    setSelectedProfiles(profiles.map((e: any) => e.id));
  }, [profiles]);

  useEffect(() => {
    fetchCurators();
  }, [selectedProfiles, debouncedValue]);

  useEffect(() => {
    if (reloadCurator) {
      fetchCurators();
      setReloadCurator(false);
    }
  }, [reloadCurator]);

  const handleDirectionsChange = (event: any) => {
    const values = event.map((e: any) => e.value);
    setSelectedProfiles(values);
  };

  const fetchCurators = async () => {
    const prIds =
      selectedProfiles?.length > 0
        ? selectedProfiles
        : profiles.map((d: any) => d.id);
    const result = await getCurators(prIds, debouncedValue);
    if (result) setCurators(result);
  };

  useEffect(() => {
    if (selectedCurator) setShowCreateModal(true);
  }, [selectedCurator]);

  return (
    <Page>
      {showCreateModal && (
        <CuratorsModal
          editedCurator={selectedCurator}
          setShow={setShowCreateModal}
          setEditedCurator={setSelectedCurator}
          setReloadCurators={setReloadCurator}
        />
      )}
      <FilterBlock
        showCreateButton={userInfo.roleId != 2}
        setShowCreateModal={() => setShowCreateModal(true)}
        buttonText="Новый куратор"
      >
        <ContainerWithLabel title={"Поиск"}>
          <MyInput
            value={searchString}
            setValue={(e: any) => setSearchString(e)}
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
      {/* <InfoBlock title={"Кураторы"}> */}
        <UserGallery
          array={curators}
          onDoubliClick={(e: any) => setSelectedCurator(e)}
        />
        {/* <PerfectTable
          nameTable={"Кураторы"}
          table={curators}
          tableSettings={getTableSettings(curators, profiles)}
          forDoubleClick={(e: any) => setSelectedCurator(e)}
        /> */}
      {/* </InfoBlock> */}
    </Page>
  );
};
