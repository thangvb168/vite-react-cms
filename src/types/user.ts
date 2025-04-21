export default interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginProps {
  email: string;
  password: string;
}
