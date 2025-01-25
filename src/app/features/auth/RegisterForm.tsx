
import { Form, FormField, Button, Dropdown } from 'semantic-ui-react'; 
import React, { useState } from 'react';
import { AppUser } from './../../types/users'
import { doc } from 'firebase/firestore'
import { db } from './../../api/config/firebase'
import { setDoc, collection } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';



const gradeOptions = [
    { key: 'kg', text: 'Kindergarten', value: 'kindergarten' },
    { key: '1', text: '1st grade', value: '1st' },
    { key: '2', text: '2nd grade', value: '2nd' },
    { key: '3', text: '3rd grade', value: '3rd' },
    { key: '4', text: '4th grade', value: '4th' },
    { key: '5', text: '5th grade', value: '5th' },
  ];
function RegisterForm() {
    const [userForm, setUserForm] = useState<AppUser>({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        childName: '',
        grade: '',
    })
    const [selectedGrade, setSelectedGrade] = useState('');
    const navigate = useNavigate();

  
    const handleGradeChange = (e: React.SyntheticEvent<HTMLElement>, { value }: any) => {
        setSelectedGrade(value);
        setUserForm({ ...userForm, grade: value });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserForm({ ...userForm, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const userRef = doc(collection(db, 'users'));
            await setDoc(userRef, { ...userForm, id: userRef.id });
            console.log('User registered successfully');
            navigate("/user-profile");
        } catch (error) {
            console.log('Error registering user:', error);
        }
    };

  return (
    
    <Form onSubmit={handleSubmit}>
    <FormField>
      <label>Parent first name</label>
      <input placeholder='Parent first name'
            type='text' 
            value={userForm.firstName}
            name='firstName'
            onChange={handleInputChange}/>
    </FormField>
    <FormField>
      <label>Parent last name</label>
      <input placeholder='Parent last name'
            type='text' 
            value={userForm.lastName}
            name='lastName'
            onChange={handleInputChange} />
    </FormField>
    <FormField>
      <label>Email</label>
      <input placeholder='Email' 
            type='email' 
            value={userForm.email}
            name='email'
            onChange={handleInputChange}/>
    </FormField>
    <FormField>
      <label>Password</label>
      <input placeholder='Password'
            type='password' 
            value={userForm.password}
            name='password'
            onChange={handleInputChange}/>
    </FormField>
    <FormField>
      <label>Child's name</label>
      <input placeholder="Child's name"
            type='text' 
            value={userForm.childName}
            name='childName'
            onChange={handleInputChange} />
    </FormField>
    <FormField>
      <label>Child's grade</label>
      <Dropdown placeholder='Select Grade'
                fluid
                selection
                options={gradeOptions}
                onChange={handleGradeChange}
                value={selectedGrade}/>
    </FormField>

    <Button type='submit'>Submit</Button>
  </Form>
  
  );
}
export default RegisterForm;