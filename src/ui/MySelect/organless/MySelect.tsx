import Select from "react-select";
import "../styles/MySelect.css";
interface IMySelect {
  isMulty: boolean;
  options: any[];
  onChange: any;
  selected?: any;
  itemKey: string; // Изменили название свойства key на itemKey
  label: string;
  defaultValues?: any[];
  placeholder: string;
  width?: string;
}

export const MySelect = (params: IMySelect) => {
  const getOptions = () => {
    const labelField = params.label;
    const options = params.options?.map((o: any) => ({
      value: params.itemKey == undefined ? o?.id : o[params.itemKey],
      label: labelField ? o[labelField] : o.name,
    }));
    return options;
  };

  const customStyles = {
    control: (provided: any, _state: any) => ({
      ...provided,
      backgroundColor: "#D9D9D9",
      textAlign: "left",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#D9D9D9" : "#e7e7e7",
      color: state.isSelected ? "var(--color-main-grey-dark)" : "black",
      cursor: "pointer",
      borderBottom: "1px solid #2B2B2B",
    }),
    menu: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#D9D9D9" : "#e7e7e7",
    }),
  };

  return (
    <div style={{ width: params.width ?? "100%" }}>
      <Select
        className="Select"
        styles={customStyles}
        closeMenuOnSelect={!params.isMulty}
        defaultValue={params.defaultValues ?? []}
        isMulti={params.isMulty ?? false}
        options={getOptions() ?? []}
        onChange={params.onChange}
        placeholder={params.placeholder}
        isSearchable={true}
        value={params?.selected}
        menuPortalTarget={document.body}
        menuPosition="fixed"
        noOptionsMessage={() => "Нет данных"}
        loadingMessage={() => "Поиск"}
      />
    </div>
  );
};
