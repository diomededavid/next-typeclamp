'use client';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormProps = {
  example: string;
  exampleRequired: string;
};

type Inputs = {
  example?: string;
  exampleRequired?: string;
};

export const FormFields = ({}: FormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => alert(JSON.stringify(data));

  console.log(watch('example')); // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input defaultValue="test" {...register('example')} />
      <input {...register('exampleRequired', { required: false })} />
      {errors.exampleRequired && <span>This field is required</span>}
      <input type="submit" />
    </form>
  );
};

export default FormFields;
