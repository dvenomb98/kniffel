import React from 'react';
import { useField } from 'formik';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  CheckboxProps,
} from '@mui/material';

interface FormCheckboxProps extends CheckboxProps {
  name: string;
  label: string;
  helperText?: string;
}

const FormCheckbox: React.FC<FormCheckboxProps> = ({ name, label, helperText, ...props }) => {
  const [field, meta] = useField({ name });
  const errorText = meta.error && meta.touched ? meta.error : '';
  const id = `${name}-${field.name}`;

  return (
    <FormControl id={id} error={!!errorText}>
      <FormControlLabel
        control={
          <Checkbox
            id={id}
            {...field}
            {...props}
            checked={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
        }
        label={label}
      />
      {!!helperText && (
        <FormHelperText>
          <span className="text-small">{helperText}</span>
        </FormHelperText>
      )}
      {!!errorText && (
        <FormHelperText error>
          <span className="text-small">{errorText}</span>
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default FormCheckbox;
