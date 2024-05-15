import { useEffect, useState } from "react";
import "../styles/LKPage.css";

import { Page } from "../../../ui/Page/organless/Page";
import { InfoBlock } from "../../../ui/InfoBlock/organless/InfoBlock";
import { useDispatch, useSelector } from "react-redux";
import { convertDate } from "../../../Common/functions/converDate";
import { baseURL } from "../../../Common/axios/axiosInstance";
import { LKEditModal } from "./LKEditModal";
import { LKAttachModal } from "./LKAttachModal";
import { checkUserFirmRelation } from "../logic/checkUserFirmRelation";
import { getUserInfo } from "../../../API/getUserInfo";
import { setUserInfo } from "../../../Common/redux/redusers/dataSlice";
import { PerfectTable } from "../../../ui/PerfectTable/organelles/PerfectTable";
import { getUserSessions } from "../logic/getUserSessions";
import { getSessionsTableSettings } from "../logic/getSessionsTableSettings";

export interface IUser {
  id: number | null;
  name: "";
  surname: "";
  patronymic: "";
  bornDate: "";
  roleId: number;
  balance: number;
  gender: number;
  profileId: number;
  photoPath: string;
  studentIsAttachedToFirm: boolean;
  userPhoto?: any;
  profile?: any;
}

export const LKPage = () => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state: any) => state.userInfo);
  const roles = useSelector((state: any) => state.roles);
  const profiles = useSelector((state: any) => state.profiles);
  const sessions = useSelector((state: any) => state.sessions);

  const [showModalEditProfile, setshowModalEditProfile] = useState(false);
  const [showAttachModal, setshowAttachModal] = useState(false);
  const [userFirmInfo, setuserFirmInfo] = useState<any | null>(null);

  const [reloadPage, setreloadPage] = useState(false);

  const [userSessions, setuserSessions] = useState<any[]>([]);

  useEffect(() => {
    if (userInfo.roleId == 2) {
      fetchUserFirmRelation(userInfo.id);
      fetchUserSessions(userInfo.id);
    }
  }, [userInfo.id]);

  const handleEditClick = () => {
    setshowModalEditProfile(true);
  };

  const handleAttachClick = () => {
    setshowAttachModal(true);
  };

  const fetchUserFirmRelation = async (userId: number) => {
    const response = await checkUserFirmRelation(userId);
    setuserFirmInfo(response);

    // Создаем копию объекта userInfo с возможностью расширения
    let newUserInfo = { ...userInfo };
    newUserInfo.firmId = response?.firm_number;
    dispatch(setUserInfo(newUserInfo));
  };

  useEffect(() => {
    const reload = async () => {
      if (reloadPage) {
        const newUserInfo = await getUserInfo(userInfo.id);
        dispatch(setUserInfo(newUserInfo));
        setreloadPage(false);
      }
    };
    reload();
  }, [reloadPage, userInfo.id]);

  const fetchUserSessions = async (userId: number) => {
    const result = await getUserSessions(userId);
    if (result) setuserSessions(result);
  };

  return (
    <>
      {showModalEditProfile && (
        <LKEditModal
          setShowModal={setshowModalEditProfile}
          setReloadPage={setreloadPage}
        />
      )}
      {showAttachModal && <LKAttachModal setShowModal={setshowAttachModal} />}
      <Page>
        <div className="TopBlock">
          <div className="MainUserInfoBlock">
            <div className="UserPhotoBlock">
              <img
                src={`${baseURL}${userInfo.photoPath}`}
                className="UserPhoto"
                alt="Фото"
              />
            </div>
            <div className="UserInfoBlock">
              <div className="UserFIOBlock">{`${userInfo.surname} ${userInfo.name} ${userInfo.patronymic}`}</div>
              <div className="UserSubInfoBlock">
                <div className="UserSubInfoItem">{`Дата рождения: ${
                  userInfo.bornDate && convertDate(userInfo.bornDate)
                }`}</div>
                <div className="UserSubInfoItem">{`Пол: ${
                  userInfo.gender == 1 ? "Мужской" : "Женский"
                }`}</div>
                <div className="UserSubInfoItem">
                  {`Роль: ${roles
                    ?.map(
                      (role: any) =>
                        role.id === userInfo.roleId && role.nameRole
                    )
                    .filter(Boolean)}`}
                </div>
                <div
                  className="UserSubInfoItemm__EditProfile"
                  onClick={handleEditClick}
                >
                  Редактирование профиля
                </div>
                {!userFirmInfo && userInfo.roleId == 2 && (
                  <div
                    className="UserSubInfoItemm__EditProfile"
                    onClick={handleAttachClick}
                  >
                    Прикрепиться к фирме
                  </div>
                )}
              </div>
            </div>
          </div>
          {userInfo.roleId == 2 && (
            <>
              <div className="CurrentSessionUserInfo">
                <InfoBlock title="Текущий баланс">
                  <div
                    className={
                      userInfo.balance >= 0
                        ? "UserBalance Positive"
                        : "UserBalance Negative"
                    }
                  >
                    {userInfo.balance}
                  </div>
                </InfoBlock>

                <InfoBlock title={`Текущая фирма: ${userFirmInfo?.firm_name}`}>
                  <div className="UserCurrentFirm">
                    {`Текущий профиль: ${profiles
                      .map(
                        (p: any) =>
                          p.id == userFirmInfo?.profile && p.nameProfile
                      )
                      .filter(Boolean)}`}
                  </div>
                  <div className="UserCurrentFirm">
                    {`Текущие проекты: ${userFirmInfo?.projects}`}
                  </div>
                </InfoBlock>
              </div>
            </>
          )}
        </div>
        {userInfo.roleId == 2 && (
          <InfoBlock title={"Прошлые смены"}>
            <PerfectTable
              nameTable={"Прошлые смены"}
              table={userSessions}
              tableSettings={getSessionsTableSettings(profiles, sessions)}
            />
          </InfoBlock>
        )}
      </Page>
    </>
  );
};
