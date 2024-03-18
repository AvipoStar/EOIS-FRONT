import { useEffect, useState } from "react";
import "../styles/Auth.css";
import { ContainerWithLabel } from "../../../ui/ContainerWithLabel/organless/ContainerWithLabel";
import { MyInput } from "../../../ui/MyInput/organless/MyInput";
import { MyDatePicker } from "../../../ui/MyDatePicker/organless/MyDatePicker";
import { SubmitButton } from "../../../ui/SubmitButton/organless/SubmitButton";
import { IRadioOption, MyRadioButton } from "../../../ui/MyRadioButton/organless/MyRadioButton";
import { AuthOrReg } from "../../../API/auth";
import { ToastContainer } from "react-toastify";
import { getUserInfo } from "../../../API/getUserInfo";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../../Common/redux/redusers/dataSlice";

export interface IAuthData {
  surname?: string;
  name?: string;
  patronimyc?: string;
  bornDate?: Date;
  gender?: number;
  login?: string;
  password?: string;
  testSelect?: any;
}

const options: IRadioOption[] = [
  { id: 0, label: "Ж" },
  { id: 1, label: "М" },
];

const defaultAuthData: IAuthData = {
  surname: "",
  name: "",
  patronimyc: "",
  bornDate: new Date(),
  gender: 0,
  login: "",
  password: "",
};

export const Auth = () => {

  const dispatch = useDispatch()

  const [authData, setAuthData] = useState<IAuthData>(defaultAuthData);
  const [authOrReg, setAuthOrReg] = useState(true);

  const handleClick = () => {
    setAuthOrReg(!authOrReg);
  };

  const handleLogin = async () => {
    const result = await AuthOrReg(authData, authOrReg);
    if (result) {
      localStorage.setItem("EOIS_TOKEN", result?.token);
      fetchUserInfo(result.user_id)
    }

  };

  const fetchUserInfo = async (userId: number) => {
    const userInfo = await getUserInfo(userId)
    dispatch(setUserInfo(userInfo))
  };

  return (
    <div className="Auth">
      <div className="BackgroundBlock">
        {!authOrReg && (
          <>
            <ContainerWithLabel title="Фамилия">
              <MyInput value={authData?.surname} setValue={(e) => setAuthData({ ...authData, surname: e })} />
            </ContainerWithLabel>
            <ContainerWithLabel title="Имя">
              <MyInput value={authData?.name} setValue={(e) => setAuthData({ ...authData, name: e })} />
            </ContainerWithLabel>
            <ContainerWithLabel title="Отчество">
              <MyInput value={authData?.patronimyc} setValue={(e) => setAuthData({ ...authData, patronimyc: e })} />
            </ContainerWithLabel>
            <ContainerWithLabel title="Дата рождения">
              <MyDatePicker
                selectedDate={authData?.bornDate}
                onDateChange={(e) => setAuthData({ ...authData, bornDate: e })}
              />
            </ContainerWithLabel>
            <ContainerWithLabel title="Пол">
              <MyRadioButton
                options={options}
                editedObject={authData.gender}
                onChange={(e: any) => setAuthData({ ...authData, gender: e })}
              />
            </ContainerWithLabel>
          </>
        )}
        <ContainerWithLabel title="Логин">
          <MyInput value={authData?.login} setValue={(e) => setAuthData({ ...authData, login: e })} />
        </ContainerWithLabel>
        <ContainerWithLabel title="Пароль">
          <MyInput
            type="password"
            value={authData?.password}
            setValue={(e) => setAuthData({ ...authData, password: e })}
          />
        </ContainerWithLabel>
      </div>
      <div className="ButtonsBlock">
        <SubmitButton text={authOrReg ? "Вход" : "Регистрация"} onClick={handleLogin} />
        <div className="AltButton" onClick={handleClick}>
          {!authOrReg ? "Вход" : "Регистрация"}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
