import { IUser } from "../../../pages/LK/organless/LKPage";
import NoUser from "../../../Common/assets/icons/NoUser.svg";
import { baseURL } from "../../../Common/axios/axiosInstance";

import "../styles/UserGallery.css";
import { useSelector } from "react-redux";

interface IUserGallery {
  array: IUser[];
  onDoubliClick: (value: any) => void | null;
}

export const UserGallery = (params: IUserGallery) => {
  const profiles = useSelector((state: any) => state.profiles);

  return (
    <div className="Gallery">
      {params.array.map((a: IUser) => {
        return (
          <div
            className="GaleryUser"
            onDoubleClick={() => params.onDoubliClick(a)}
          >
            <img
              src={!a.photoPath ? NoUser : `${baseURL}${a.photoPath}`}
              className="GalleryUserPhoto"
            />
            <div className="GaleryUserInfo">
              <div
                style={{ fontSize: "20px" }}
              >{`${a.surname} ${a.name} ${a.patronymic}`}</div>
              <div>
                {profiles.map((p: any) => p.id == a.profile && p.nameProfile)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
