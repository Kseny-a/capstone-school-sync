
import { Form, Button, Dropdown, Message } from 'semantic-ui-react'; 
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



const gradeOptions = [
    { key: 'kg', text: 'Kindergarten', value: 'kindergarten' },
    { key: '1', text: '1st grade', value: '1st' },
    { key: '2', text: '2nd grade', value: '2nd' },
    { key: '3', text: '3rd grade', value: '3rd' },
    { key: '4', text: '4th grade', value: '4th' },
    { key: '5', text: '5th grade', value: '5th' },
  ];

  function RegisterForm() {
    const {register, handleSubmit, setValue, watch, formState: {isSubmitting, isValid, isDirty, errors }} = useForm({
      mode: 'onTouched',
    });
    const dispatch = useAppDispatch();

    useEffect(() => {
      register("grade", { required: "Grade is required" });
    }, [register]);

     
    const handleGradeChange = (e: React.SyntheticEvent<HTMLElement>, { value }: any) => {
      setValue('grade', value, { shouldValidate: true });
    };
    const grade = watch('garde')

    async function onSubmit(data: FieldValues) {
      try {
        const userCreds = await createUserWithEmailAndPassword(auth, data.email, data.password);
        console.log('User created:', userCreds.user.uid);
        await updateProfile(userCreds.user, 
          { displayName: `${data.firstName} ${data.lastName}`
          });
        await setDoc(doc(db, 'users', userCreds.user.uid),{
          uid: userCreds.user.uid,
          email:data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          childName: data.childName,
          grade: data.grade,
        });
        dispatch(closeModal());}
      catch (error) {
        console.log(error);
      }
    }

// function RegisterForm({ setAuth }: Props) {
//     const [userForm, setUserForm] = useState<AppUser>({
//         id: '',
//         firstName: '',
//         lastName: '',
//         email: '',
//         password: '',
//         childName: '',
//         grade: '',
//     })
//     const [selectedGrade, setSelectedGrade] = useState('');
//     const navigate = useNavigate();

  
    // const handleGradeChange = (e: React.SyntheticEvent<HTMLElement>, { value }: any) => {
    //     setSelectedGrade(value);
    //     setUserForm({ ...userForm, grade: value });
    // };

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setUserForm({ ...userForm, [name]: value });
//     };

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         try {
//             const userRef = doc(collection(db, 'users'));
//             await setDoc(userRef, { ...userForm, id: userRef.id });
//             console.log('User registered successfully');
//             setAuth(true);
//             navigate("/user-profile");

//         } catch (error) {
//             console.log('Error registering user:', error);
//         }
//     };

  return (
    <ModalCover header='Register to SchoolSync' size='small'>
    <Form onSubmit={handleSubmit(onSubmit)}>
    <Form.Field>
      <label>Parent first name</label>
      <input placeholder='Parent first name'
            {...register('firstName', {required: 'First name is required'})}
            defaultValue=''
            error={errors.firstName && 'First name is required'}
            // type='text' 
            // value={userForm.firstName}
            // name='firstName'
            // onChange={handleInputChange}/>
            />
    </Form.Field>
    <Form.Field>
      <label>Parent last name</label>
      <input placeholder='Parent last name'
             {...register('lastName', {required: 'Last name is required'})}
              defaultValue=''
              error={errors.lastName && 'Last name is required'}
            /* // type='text' 
            // value={userForm.lastName}
            // name='lastName'
            // onChange={handleInputChange}  */
            />
        
    </Form.Field>
    <Form.Field>
      <label>Email</label>
      <input
            placeholder='Email'
            {...register('email', {required: true})}
            type='email'
            defaultValue=''
            error={errors.email && 'Email is required'} />
      </Form.Field>
    <Form.Field>
      <label>Password</label>
      <input 
            placeholder='Password'
            {...register('password', {required: true})}
            type='password'
            defaultValue=''
            error={errors.password && 'Password is required'} />
    </Form.Field>
    <Form.Field>
      <label>Child's name</label>
      <input placeholder="Child's name"
            type='text' 
            {...register('childName', {required: true})}
            defaultValue=''
            error={errors.childName && "Child's name is required"} />
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

    <Button type='submit'
            disabled={!isValid || isSubmitting || !isDirty || Object.keys(errors).length > 0 }
            fluid
            size='large'
            color='orange'
            content='Register'>
      Submit</Button>
  </Form>
  </ModalCover>
  
  );
}
export default RegisterForm;