
import { Form, FormField, Button } from 'semantic-ui-react'; 
import { useAppDispatch } from '../../store/store';
import ModalCover from '../../modals/ModalCover';
import { closeModal } from '../../modals/modalSlice';
import { useForm } from "react-hook-form";
import type { FieldValues } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../api/config/firebase';
import { Link, useNavigate } from 'react-router-dom';



function LoginForm() {
  const {register, handleSubmit, formState: {isSubmitting, isValid, isDirty, errors }} = useForm({
    mode: 'onTouched',
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  
  async function onSubmit(data: FieldValues) {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password)
      dispatch(closeModal());
      navigate('/events')}
    catch (error) {
      console.log(error);
    }
  }

  return (
    <ModalCover header='Sign-in to SchoolSync' size='mini'>
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
            type='password'
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
  );
}

export default LoginForm;
