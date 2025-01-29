
import { Form, FormField, Button } from 'semantic-ui-react'; 
import { useAppDispatch } from '../../store/store';
import { logIn } from './authSlice';
import ModalCover from '../../modals/ModalCover';
import { closeModal } from '../../modals/modalSlice';
import { useForm } from "react-hook-form";
import type { FieldValues } from 'react-hook-form';


function LoginForm() {
  const {register, handleSubmit, formState: {isSubmitting, isValid, isDirty, errors }} = useForm({
    mode: 'onTouched',

  });
  const dispatch = useAppDispatch();

  function onSubmit(data: FieldValues) {
    console.log(data);
    dispatch(logIn(data));
    dispatch(closeModal());

    // dispatch(logIn(data));
  }

  return (
    <ModalCover header='Sign-in to SchoolSync'>
    <Form onSubmit={handleSubmit(onSubmit)}>
    <FormField>
      <label>Email</label>
      <input
            placeholder='Email'
            {...register('email', {required: true})}
            type='email'
            defaultValue=''
            error={errors.email && 'Email is required'} />
    </FormField>
    <FormField>
      <label>Password</label>
      <input 
            placeholder='Password'
            {...register('password', {required: true})}
        //  type='text'
        defaultValue=''
        error={errors.password && 'Password is required'} />
    </FormField>
    <Button type='submit'
            disabled={!isValid || isSubmitting || !isDirty || Object.keys(errors).length > 0 }
            fluid
            size='large'
            color='orange'
            content='Login'
    >Submit</Button>
  </Form>
  </ModalCover>
  ) 
}

export default LoginForm;