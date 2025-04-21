import { BrowserRouter } from 'react-router-dom';

import AuthProvider from './contexts/auth/AuthContext';
import ThemeProvider from './contexts/theme/ThemeContext';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
