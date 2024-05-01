import React from 'react';
import "../styles/MyInput.css";

interface IMyInput {
  value: any;
  setValue: (value: React.SetStateAction<any>) => void;
  type?: string;
  enterOnly?: boolean;
}

export const MyInput = (params: IMyInput) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (params.enterOnly && e.key === 'Enter') {
      // Обработка ввода только при нажатии Enter
      e.preventDefault(); // Предотвращаем действие по умолчанию (например, отправку формы)
      params.setValue(e.currentTarget.value);
    }
  };

  return (
    <>
      <input
        className="MyInput"
        value={params.value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => params.setValue(e.target.value)}
        type={params.type ? params.type : "text"}
        onKeyDown={handleKeyDown}
      />
    </>
  );
};