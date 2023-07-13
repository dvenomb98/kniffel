import React from 'react';
import { useField } from 'formik';
import { TextField, OutlinedTextFieldProps } from '@mui/material';

interface FormInputProps extends OutlinedTextFieldProps {
  name: string;
  label: string;
  helperText?: string;
}

const FormInput: React.FC<FormInputProps> = ({ name, label, helperText, ...props }) => {
  const [field, meta] = useField({ name });
  const errorText = meta.error && meta.touched ? meta.error : '';
  const id = `${name}-${field.name}`;

  return (
    <TextField
      id={id}
      label={label}
      {...field}
      {...props}
      helperText={errorText || helperText}
      error={!!errorText}
    />
  );
};

export default FormInput;
