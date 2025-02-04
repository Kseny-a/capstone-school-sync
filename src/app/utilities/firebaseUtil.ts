import { doc, getDoc } from 'firebase/firestore';
import { UserProfile } from '../types/profile'; 
import { db } from '../api/config/firebase';



export async function getUserProfile(uid: string): Promise<UserProfile | null> {
    if (!uid) return null;
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as unknown as UserProfile;
        console.log('Document data:', docSnap.data());
      } else {
        console.log("No userprofile found in FB");
        return null;
      }
    } catch (error) {
      console.log('Error getting user profile:', error);
      return null;
    }
  }