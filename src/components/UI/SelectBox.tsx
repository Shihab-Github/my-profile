import React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

interface SelectBoxProps {
  list: Array<{
    title: string;
    value: number;
  }>;
  label: string;
  name: string;
  defaultValue?: string | number | null;
  required?: boolean;
}

const SelectBox = (props: SelectBoxProps) => {
  const { list, label, name, defaultValue } = props;
  return (
    <FormControl fullWidth>
      <InputLabel id="select-from-month-label">{label}</InputLabel>
      <Select
        labelId="select-from-month-label"
        id="from-month"
        name={name}
        label={label}
        defaultValue={defaultValue}
      >
        {list.map((s) => (
          <MenuItem value={s.value} key={s.value}>
            {s.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectBox;
