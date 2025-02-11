import { Grid, Loader } from 'semantic-ui-react';
import UserHeader from './UserHeader';
import UserContent from './UserContent';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useEffect, useState } from 'react';
import { setError, setLoading, success} from './UserSlice';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../api/config/firebase'; 
import { Profile } from '../../types/profile';



function UserProfile() {
  const { uid } = useParams<{ uid: string }>();
  const dispatch = useAppDispatch();
  const { status, data } = useAppSelector(state => state.profiles);
  const [profile, setProfile] = useState<Profile | null>(null);


  useEffect(() => {
    async function loadProfile() {
      if (!uid) return;
      console.log('loading profile:', uid);
        dispatch(setLoading());
      if (status === 'loading') return (<p> Loading profile details...</p>);
        try {
    //     const foundProfile = data.find((u) => u.uid === uid )
    //     if (foundProfile) {
    //       console.log('Profile found:', foundProfile);
    //        setProfile(foundProfile);
    //       }
    //   }
    // }, [data, uid]);

    // useEffect(() => {
    //   async function loadProfile() {
    //     if (!uid) return;
    //     console.log('Loading profile:', uid);
    //      dispatch(setLoading());
    //     try {
        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // setProfile(docSnap.data() as Profile);
          const profileData = docSnap.data() as Profile;
          console.log('Document data:', profileData);
          setProfile(profileData);
          dispatch(success([profileData]));
        } else {
          console.log('No such document');
          setProfile(null);
          dispatch(setError());
        }
      } catch (error) {
        console.log('Error getting document:', error);
        dispatch(setError());
      }
    }
 
      loadProfile();
      // if (status === 'loading') return <Loader content='Loading profile...'/>;

  }, [uid, dispatch]);

  console.log('Profile:', profile);
  console.log('Status:', status);
  console.log('Data:', data);
    
  if (!profile) {
  
      return (<h2>Profile is loading ...</h2>);
  }


  return (
  <Grid>
    <Grid.Column width={16}>
        <UserHeader profile={profile}/>
        <UserContent profile={profile} />
    </Grid.Column >
  </Grid>
  )
};
export default UserProfile;