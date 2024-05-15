import { useEffect, useState } from "react";

import { Page } from "../../../ui/Page/organless/Page";
import { InfoBlock } from "../../../ui/InfoBlock/organless/InfoBlock";
import { SessionsModal } from "./SessionsModal";
import { getSessions } from "../logic/getSessions";
import { FilterBlock } from "../../../ui/FilterBlock/organless/FilterBlock";
import { ContainerWithLabel } from "../../../ui/ContainerWithLabel/organless/ContainerWithLabel";
import { MyInput } from "../../../ui/MyInput/organless/MyInput";
import { useSelector } from "react-redux";
import { useDebounse } from "../../../Common/hooks/useDebounce";
import { PerfectTable } from "../../../ui/PerfectTable/organelles/PerfectTable";
import { getTableSettings } from "../logic/getTableSettings";

export interface ISession {
  id: number;
  dateStart: string;
  dateEnd: string;
  place: string;
  firmCount: number;
}

export const SessionsPage = () => {
  const userInfo = useSelector((state: any) => state.userInfo);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [sessions, setSessions] = useState<ISession[]>([]);
  const [selectedSessions, setSelectedSessions] = useState<ISession | null>(
    null
  );
  const [reloadProjectsSessions, setReloadSessions] = useState(false);

  const [searchString, setSearchString] = useState("");
  const debouncedValue = useDebounse(searchString);


  useEffect(() => {
    fetchSessions();
  }, [debouncedValue]);

  useEffect(() => {
    if (reloadProjectsSessions) {
      fetchSessions();
      setReloadSessions(false);
    }
  }, [reloadProjectsSessions]);

  const fetchSessions = async () => {
    const result = await getSessions(debouncedValue);
    if (result) setSessions(result);
  };

  useEffect(() => {
    if (selectedSessions) setShowCreateModal(true);
  }, [selectedSessions]);

  return (
    <Page>
      {showCreateModal && (
        <SessionsModal
          editedSession={selectedSessions}
          setShow={setShowCreateModal}
          setEditedSession={setSelectedSessions}
          setReloadSession={setReloadSessions}
        />
      )}
      <FilterBlock
        showCreateButton={userInfo.roleId != 2}
        setShowCreateModal={() => setShowCreateModal(true)}
        buttonText="Новая сессия"
      >
        <ContainerWithLabel title={"Поиск"}>
          <MyInput
            value={searchString}
            setValue={(e: any) => setSearchString(e)}
          />
        </ContainerWithLabel>
      </FilterBlock>
      <InfoBlock title={"Сессии"}>
      <PerfectTable
          nameTable={"Кураторы"}
          table={sessions}
          tableSettings={getTableSettings(sessions)}
          forDoubleClick={(e: any) => setSelectedSessions(e)}
        />
        {/* <MyTable
          list={sessions}
          onDoubleClick={(e: ISession) => setSelectedSessions(e)}
          field={["place", "dateStart", "dateEnd"]}
          separator="-"
        /> */}
      </InfoBlock>
    </Page>
  );
};
