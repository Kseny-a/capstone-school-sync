export type Profile = {
    id: string,
    photoUrl: string | null,
    firstName:string,
    lastName: string,
    childName: string,
    description: string,

}

export interface UserProfile {
    firstName: string;
    lastName: string;
    photoURL: string;
  }