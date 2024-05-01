import { useEffect, useState } from "react";

import { Page } from "../../../ui/Page/organless/Page";
import { useSelector } from "react-redux";
import { FilterBlock } from "../../../ui/FilterBlock/organless/FilterBlock";
import { MySelect } from "../../../ui/MySelect/organless/MySelect";
import { InfoBlock } from "../../../ui/InfoBlock/organless/InfoBlock";
import { MyTable } from "../../../ui/MyTable/organless/MyTable";
import { getStudentsInFirms } from "../logic/getStudentsInFirms";
import { IUser } from "../../LK/organless/LKPage";
import { getEventsForUser } from "../logic/getEventsForUser";
import { PaymentsModal } from "./PaymentsModal";
import { MyPlot } from "../../../ui/MyPlot/organless/MyPlot";

export interface IPayment {
  id: number;
  eventTypeId: number;
  targetUserIds: number[];
  initiatorId: number;
  datetimeEvent: string;
  amount: number;
  description: string;
}

export const PaymentsPage = () => {
  const userInfo = useSelector((state: any) => state.userInfo);
  const firmsOnCurrentSession = useSelector(
    (state: any) => state.firmsOnCurrentSession
  );
  const [studentsInFirms, setStudentsInFirms] = useState<IUser[]>([]);
  const [convertedStudents, setConvertedStudents] = useState<any[]>([]);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [selectedFilter, setSelectedFilter] = useState<{
    firms: any;
    students: any;
  } | null>(null);

  const [eventsForUser, seteventsForUser] = useState<IPayment[]>([]);
  const [selectedEvent, setselectedEvent] = useState<IPayment | null>(null);

  const [reloadPayments, setReloadPayments] = useState(false);

  useEffect(() => {
    const firmIds =
      selectedFilter?.firms.length > 0
        ? selectedFilter?.firms.map((f: any) => f)
        : firmsOnCurrentSession?.map((f: any) => f?.id);
    fetchStudentsInFirms(firmIds);
  }, [selectedFilter?.firms]);

  const fetchStudentsInFirms = async (firmIds: number[]) => {
    const studs = await getStudentsInFirms(firmIds);
    if (studs) setStudentsInFirms(studs);
  };

  useEffect(() => {
    const convStuds: any[] = [];
    studentsInFirms.map((s) => {
      const newStud: any = s;
      newStud.fio = `${s.surname} ${s.name} ${s.patronymic}`;
      convStuds.push(s);
    });
    setConvertedStudents(convStuds);
  }, [studentsInFirms]);

  useEffect(() => {
    fetchUserEvents(selectedFilter?.students);
  }, [selectedFilter?.students]);

  const fetchUserEvents = async (userId: number) => {
    const userEvents = await getEventsForUser(userId);
    if (userEvents) seteventsForUser(userEvents);
  };

  useEffect(() => {
    if (reloadPayments) {
      fetchUserEvents(selectedFilter?.students);
      setReloadPayments(false);
    }
  }, [reloadPayments]);

  const handleFilterChange = (event: any, field: "firms" | "students") => {
    const values = event.length ? event.map((e: any) => e.value) : event.value;
    setSelectedFilter((prevFilter: any) => {
      return {
        ...prevFilter,
        [field]: values,
      };
    });
  };

  return (
    <Page>
      {showCreateModal && (
        <PaymentsModal
          selectedEvent={selectedEvent}
          setShow={setShowCreateModal}
          setEditedPayment={setselectedEvent}
          setReloadPayments={setReloadPayments}
        />
      )}
      <FilterBlock
        showCreateButton={userInfo.roleId == 1}
        setShowCreateModal={() => setShowCreateModal(true)}
        buttonText="Новое событие"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "stretch",
            gap: "5px",
          }}
        >
          <MySelect
            isMulty={true}
            options={firmsOnCurrentSession}
            onChange={(e: any) => handleFilterChange(e, "firms")}
            itemKey="id"
            label="number"
            placeholder="Фирмы"
            width="40%"
          />
          <MySelect
            isMulty={false}
            options={convertedStudents}
            onChange={(e: any) => handleFilterChange(e, "students")}
            itemKey="id"
            label="fio"
            placeholder="Участники"
          />
        </div>
      </FilterBlock>
      <InfoBlock title={"Штрафы и поощрения"}>
        <MyPlot data={eventsForUser} />
      </InfoBlock>
      <InfoBlock title={"Список штрафов и поощрений"}>
        <MyTable
          list={eventsForUser}
          onDoubleClick={(e: IPayment) => setselectedEvent(e)}
          field={["description", "amount"]}
        />
      </InfoBlock>
    </Page>
  );
};
