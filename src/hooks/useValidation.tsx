import * as yup from 'yup';

const validationRequired = 'Required';

const useFieldValidation = () => {
  const yupFieldEnum = (Enum: Record<string, string>) =>
    yup
      .mixed<keyof typeof Enum>()
      .oneOf(Object.values(Enum), 'Vyberte jednu z možností')
      .nullable()
      .required(validationRequired);

  const yupField = {
    checkbox: yup.bool().oneOf([true], validationRequired),
    string: yup.string().nullable().required(validationRequired),
    date: yup.date().required(validationRequired),
    email: yup.string().email('Invalid email format').nullable().required(validationRequired),
  };

  return { yupField, yupFieldEnum };
};

export default useFieldValidation;
