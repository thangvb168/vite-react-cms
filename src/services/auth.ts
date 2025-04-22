import { LoginProps } from '@/types/user';
import axiosInstance from '@/utils/axiosInstance';

export interface AuthService {
  login: (props: LoginProps) => Promise<any>;
}

const authService: AuthService = {
  login: async (props: LoginProps) => {
    try {
      const { email, password } = props;
      const allUserRes = await axiosInstance.get('/users');

      const user = allUserRes.data.find(
        (user: { email: string; password: string }) =>
          user.email === email && user.password === password
      );

      if (!user) {
        throw new Error('Email hoặc mật khẩu không đúng');
      }

      return user;
    } catch (error) {
      throw error;
    }
  },
};

export default authService;
