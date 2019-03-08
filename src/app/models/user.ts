export interface Roles {
  miembro?: boolean;
  admin?: boolean;
  editor?: boolean;
}

export interface UserInterface {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  idPhoto?: string;
  photoUrl?: string;
  roles?: Roles;
}
