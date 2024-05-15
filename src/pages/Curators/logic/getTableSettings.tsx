import { baseURL } from "../../../Common/axios/axiosInstance";

export const getTableSettings = (
    users: any[],
    profiles: any[],
  ) => {
    return [
      {
        label: "№",
        key:'id'
      },
      {
        label: "Фото",
        key: "photoPath",
        unusualView: function (value: any): any {
          return <img src={`${baseURL}${value}`} style={{width: '70px', borderRadius:'50%'}}/>
        },
      },
      {
        label: "ФИО",
        key: "id",
        unusualView: function (value: any): any {
            return users.map((u: any) => u.id == value && `${u.surname} ${u.name} ${u.patronymic}`)
          },
      },
      {
        label: "Профиль",
        key: "profile",
        unusualView: function (value: any): any {
            return profiles.map((p: any) => p.id == value && `${p.nameProfile}`)
          },
      },
    ];
  };
  