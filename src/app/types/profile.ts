export type Profile = {
    uid: string,
    photoUrl: string | null,
    firstName:string,
    lastName: string,
    childName: string,
    grade: string,
    description: string,

}

export interface UserProfile {
    firstName: string;
    lastName: string;
    photoURL: string;
  }