import { Roles } from "./../role";
export interface UserState {
  token: string;
  name: string;
  avatar: string;
  roles: Roles;
}
