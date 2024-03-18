import React, { useEffect } from "react";
import "../styles/MySelect.css";

import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

interface IMySelect {
  isMulti: boolean;
  options: any[];
  onChange: any;
  selected?: any;
  key: string;
  label: string;
  defaultValues?: any[];
  placeholder: string;
  width?: string;
}

export const MySelect = (params: IMySelect) => {
  const getOptions = () => {
    const options = params.options?.map((o: any) => ({
      value: params.key === undefined ? o?.id : o[params.key],
      label: params.label === undefined ? o.name : o[params.label],
    }));
    return options;
  };

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderRadius: 10,
      backgroundColor: "#D9D9D9",
      textAlign: "left",
      zIndex: 2,
      fontSize: 20,
      padding: "10px",
      border: "1px solid #2B2B2B",
      // width: '100%',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#D9D9D9" : "#e7e7e7",
      color: state.isSelected ? "#2B2B2B" : "black",
      cursor: "pointer",
      borderBottom: "1px solid #2B2B2B",
      textAlign: "left",
      zIndex: 1000, // Увеличиваем значение zIndex
    }),
  };

  return (
    <div style={{ width: params.width ?? '100%' }}>
      <Select
        closeMenuOnSelect={!params.isMulti} // Сворачиваем меню при выборе, если isMulti равно false
        components={animatedComponents}
        defaultValue={params.defaultValues ?? []}
        isMulti={params.isMulti ?? false}
        options={getOptions() ?? []}
        onChange={params.onChange}
        styles={customStyles}
        placeholder={params.placeholder}
        isSearchable={true}
        value={params?.selected}
        menuPortalTarget={document.body}
        menuPosition='fixed'
      />
    </div>
  );
};