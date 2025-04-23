import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import authService from '@/services/auth';
import User, { LoginProps } from '@/types/user';

export interface AuthState {
  token?: string;
  user?: User;
  error?: string;
  loading?: boolean;
  isAuth?: boolean;

  loginUser: (props: LoginProps) => Promise<void>;
  logoutUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: undefined,
      user: undefined,

      loginUser: async (props: LoginProps) => {
        const { email, password } = props;
        set({ loading: true, error: undefined });

        try {
          const userData = await authService.login({ email, password });
          set({ user: userData, isAuth: true });

          console.log('Success:', userData);
        } catch (error) {
          if (error instanceof Error) {
            set({ error: error.message });
          } else {
            set({ error: 'Đăng nhập thất bại' });
          }
        } finally {
          set({ loading: false });
        }
      },

      logoutUser: async () => {
        set({
          token: undefined,
          user: undefined,
          isAuth: false,
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuth: state.isAuth,
      }),
    }
  )
);
