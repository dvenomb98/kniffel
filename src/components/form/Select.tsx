import React from 'react';
import { useField } from 'formik';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
  FormHelperText,
} from '@mui/material';

interface FormSelectProps extends SelectProps {
  name: string;
  label?: string;
  options: {
    value: any;
    label: string;
  }[];
  helperText?: string;
}

const FormSelect: React.FC<FormSelectProps> = ({ name, label, options, helperText, ...props }) => {
  const [field, meta] = useField({ name });
  const errorText = meta.error && meta.touched ? meta.error : '';
  const id = `${name}-${field.name}`;

  if (!options?.length) return null;

  return (
    <FormControl id={id} error={!!errorText}>
      {!!label && <InputLabel id={id}>{label}</InputLabel>}
      <Select id={id} {...field} labelId={id} {...props} label={label}>
        {options.map(({ label, value }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
      {(!!helperText || !!errorText) && (
        <FormHelperText error={!!errorText}>{errorText || helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

export default FormSelect;
