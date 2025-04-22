import { BrowserRouter } from 'react-router-dom';

import ThemeProvider from './contexts/theme/ThemeContext';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
