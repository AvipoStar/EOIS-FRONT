import React from "react";
import "../styles/MyInput.css";

interface IMyInput {
  value: any;
  setValue: (value: React.SetStateAction<any>) => void;
  type?: string;
  enterOnly?: boolean;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const MyInput = (params: IMyInput) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (params.enterOnly && e.key === "Enter") {
      e.preventDefault(); // Предотвращаем действие по умолчанию (например, отправку формы)
      params.onKeyPress?.(e); // Вызываем переданную функцию onKeyPress, если она есть
    }
  };

  return (
    <input
      className="MyInput"
      value={params.value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        params.setValue(e.target.value)
      }
      type={params.type ? params.type : "text"}
      onKeyDown={handleKeyDown}
    />
  );
};
