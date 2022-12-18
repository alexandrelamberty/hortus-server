import { User } from "../schemas/user.schema";

export interface UserResponse {
  user: User;
}

export interface UsersResponse {
  users: User[];
  count: number;
}
