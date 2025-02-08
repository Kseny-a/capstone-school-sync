import {  SubmitHandler, useForm } from "react-hook-form";
import { Profile } from "../../types/profile";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../api/config/firebase";
import { Button, FormField, Form, TextArea } from "semantic-ui-react";

type Props = {
    profile: Profile;
    setEditMode: (value: boolean) => void;
}
type FormValues = {
    description: string;
}


function UserForm({profile, setEditMode}: Props) {
    const {register, handleSubmit, formState: {errors, isSubmitting, isDirty, isValid} }  = useForm({
        mode: 'onTouched',
        defaultValues: {
            description: profile.description,
        }
})
      
     const onSubmit: SubmitHandler<FormValues> = async (data) => {
       if (!profile.uid) {
        console.log('No user profile found')
        return;
    }
        try {
        await updateDoc(doc(db, 'users', profile.uid),{
            description: data.description
        }); 
        setEditMode(false);
    } catch (error) {
        console.log('Error updating user profile:', error);
    }
};

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormField>
                <TextArea 
            placeholder='More information about me'
            {...register('description')}/>
            </FormField>
            
            <Button
             type='submit'
            //  disabled={isSubmitting || !isValid || isDirty}
             floated='right'
            size='large'
            positive
            content='Update Profile'/>
        </Form>
    );
    }


export default UserForm;
