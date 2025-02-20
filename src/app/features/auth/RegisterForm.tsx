
import { Form, Button, Dropdown, Message, Label } from 'semantic-ui-react'; 
import React, { useEffect } from 'react';
import { doc } from 'firebase/firestore'
import { db } from './../../api/config/firebase'
import { setDoc } from 'firebase/firestore';
import { useAppDispatch } from '../../store/store';
import ModalCover from '../../modals/ModalCover';
import { closeModal } from '../../modals/modalSlice';
import { useForm } from "react-hook-form";
import type { FieldValues } from 'react-hook-form';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../api/config/firebase';
import { setError } from '../users/UserSlice';



const gradeOptions = [
    { key: 'kg', text: 'Kindergarten', value: 'kindergarten' },
    { key: '1', text: '1st grade', value: '1st' },
    { key: '2', text: '2nd grade', value: '2nd' },
    { key: '3', text: '3rd grade', value: '3rd' },
    { key: '4', text: '4th grade', value: '4th' },
    { key: '5', text: '5th grade', value: '5th' },
  ];

  function RegisterForm() {
    const {register, handleSubmit, setValue, watch, setError, formState: {isSubmitting, isValid, isDirty, errors }} = useForm({
      mode: 'onTouched',
    });
    const dispatch = useAppDispatch();

    useEffect(() => {
      register("grade", { required: "Grade is required" });
    }, [register]);

     
    const handleGradeChange = (e: React.SyntheticEvent<HTMLElement>, { value }: any) => {
      setValue('grade', value, { shouldValidate: true });
    };
    const grade = watch('grade')

    async function onSubmit(data: FieldValues) {
      try {
        const userCreds = await createUserWithEmailAndPassword(auth, data.email, data.password);
        console.log('User created:', userCreds.user.uid);
        await updateProfile(userCreds.user, 
          { displayName: data.firstName
          });
        await setDoc(doc(db, 'users', userCreds.user.uid),{
          uid: userCreds.user.uid,
          email:data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          childName: data.childName,
          password: data.password,
          grade: data.grade,
        });
        dispatch(closeModal());}
      catch (error) {
        console.log('Registration error:', error);
        setError('serverError', {
          type: 'manual', 
          message: error.message
        });
      }
    }

  return (
    <ModalCover header='Register to SchoolSync' size='small'>
    <Form onSubmit={handleSubmit(onSubmit)}>
    <Form.Field>
      <label>Parent first name</label>
      <input placeholder='Parent first name'
            {...register('firstName', {required: 'First name is required'})}
            defaultValue=''
            />
            {errors.firstName && <Message error content={errors.firstName.message} />}
    </Form.Field>
    <Form.Field>
      <label>Parent last name</label>
      <input placeholder='Parent last name'
             {...register('lastName', {required: 'Last name is required'})}
              defaultValue=''
            />
     {errors.lastName && <Message error content={errors.lastName.message} />}       
        
    </Form.Field>
    <Form.Field>
      <label>Email</label>
      <input
            placeholder='Email'
            {...register('email', { required: 'Email is required' })}
            type='email'
      
            />
            {errors.email && <Message error content={errors.email.message}/>}
      
      </Form.Field>
    <Form.Field>
      <label>Password</label>
      <input 
            placeholder='Password must be at least 6 characters'
            type='password'
            {...register('password', { 
              required: 'Password is required', 
              minLength: { value: 6, message: 'Password must be at least 6 characters long' }
            })}
            />
            {errors.password && <Message error content={errors.password.message} />}
    </Form.Field>
    <Form.Field>
      <label>Child's name</label>
      <input placeholder="Child's name"
            type='text' 
            {...register('childName', {required: "Child's name is required"})}
            defaultValue=''
            error={errors.childName && "Child's name is required"}
             />
              {errors.childName && <Message error content={errors.childName.message} />}
    </Form.Field>
    <Form.Field>
      <label>Child's grade</label>
      <Dropdown placeholder='Select Grade'
                fluid
                selection
                options={gradeOptions}
                onChange={handleGradeChange}
                value={grade}
                />
                {errors.grade && <Message error content={errors.grade.message} />}
    </Form.Field>

    {errors.serverError && (
        <Label
          basic
          color='red'
          style={{ display: 'block', marginBottom: 10 }}
          content={errors.serverError.message}
        />)}

    <Button 
            type='submit'
            disabled={!isValid || isSubmitting || !isDirty }
            fluid
            size='large'
            color='orange'
            >
      Submit</Button>
      {/* Object.keys(errors).length > 0 */}
  </Form>
  </ModalCover>
  
  );
}
export default RegisterForm;