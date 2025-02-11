import {  SubmitHandler, useForm } from "react-hook-form";
import { Profile } from "../../types/profile";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../api/config/firebase";
import { Button, FormField, Form, TextArea } from "semantic-ui-react";
import { useAppDispatch } from "../../store/store";
import { updateProfile } from "./UserSlice";
import { useEffect } from "react";

type Props = {
    profile: Profile;
    setEditMode: (value: boolean) => void;
}
type FormValues = {
    description: string;
}


function UserForm({profile, setEditMode}: Props) {
    const {register, handleSubmit, reset, formState: {errors, isSubmitting, isDirty, isValid} }  = useForm<FormValues>({
        mode: 'onTouched',
        defaultValues: {description: profile.description }
});


const dispatch = useAppDispatch();
      
     const onSubmit: SubmitHandler<FormValues> = async (data) => {
       if (!profile.uid) {
        console.log('No user profile found')
        return;
    }
        try {
        await updateDoc(doc(db, 'users', profile.uid),{
            description: data.description
        }); 
        dispatch(updateProfile({...profile, description: data.description}));
        setEditMode(false);
    } catch (error) {
        console.log('Error updating user profile:', error);
    }
};

useEffect(()=> {
    reset( { description: profile.description});
}, [profile.description, reset]);

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormField>
                <TextArea 
            placeholder='More information about me'
            {...register('description')}/>
            {errors.description && <p>{errors.description.message}</p>}
            </FormField>
            
            <Button
             type='submit'
            // disabled={isSubmitting || !isValid || isDirty}
             floated='right'
            size='large'
            positive
            content='Update Profile'/>
        </Form>
    );
    }


export default UserForm;
