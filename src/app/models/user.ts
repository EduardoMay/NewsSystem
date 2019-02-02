export interface Roles {
  usuario?: boolean;
  admin?: boolean;
  editor?: boolean;
}

export interface UserInterface {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  photoUrl?: string;
  roles?: Roles;
}
