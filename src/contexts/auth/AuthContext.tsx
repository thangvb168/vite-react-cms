import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { login as loginApi } from '@/services/auth';
import User, { LoginProps } from '@/types/user';

type AuthContextType = {
  isAuth: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (props: LoginProps) => Promise<void>;
  logout: () => void;
  initializing: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [initializing, setInitializing] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      console.log('OK');
      setUser(JSON.parse(storedUser));
      setIsAuth(true);
    }

    setInitializing(true);
  }, []);

  const login = async (props: LoginProps) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await loginApi(props);
      setUser(userData);
      setIsAuth(true);
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/');
    } catch (err) {
      console.log(error);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Đăng nhập thất bại');
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuth(false);
    localStorage.removeItem('user');
    navigate('/login');
  };

  const value: AuthContextType = {
    isAuth,
    user,
    loading,
    error,
    login,
    logout,
    initializing,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
