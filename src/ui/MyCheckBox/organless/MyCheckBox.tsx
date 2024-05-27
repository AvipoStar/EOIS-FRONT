import "../styles/MyCheckBox.css";

interface IMyCheckBox {
  value: any;
  onChange: any;
}

export const MyCheckBox = (params: IMyCheckBox) => {
  return (
    <input
      type="check"
      className="MyCheckBox"
      value={params.value}
      onChange={() => params.onChange()}
    />
  );
};
