import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

export interface IRadioOption {
  id: number;
  label: string;
}

interface MyRadioButtonProps {
  options: IRadioOption[];
  editedObject: any;
  onChange: any;
  darkTheme: boolean; // добавляем параметр darkTheme
}

export const MyRadioButton = (props: MyRadioButtonProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.value);
  };

  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={props.editedObject}
        onChange={handleChange}
      >
        {props.options.map((o: IRadioOption) => (
          <FormControlLabel
            key={o.id}
            value={o.id.toString()}
            control={<Radio style={{ color: props.editedObject === o.id.toString() ? 'var(--color-main-green)' : 'inherit' }} />}
            label={o.label}
            style={{ color: props.darkTheme ? 'var(--color-main-grey-dark)' : 'var(--color-main-grey-light)' }} // изменяем цвет текста в зависимости от darkTheme
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
