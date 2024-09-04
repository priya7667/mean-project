export interface LoggedUserData {
    id: string;
    email: string;
    name: string;
    role: string;
    branch: string;
    profilePictureUrl?: string;
    status: string;
    lastLogin: Date;
    createdAt: Date;
    updatedAt: Date;
}
