import React from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import RenderRoutes from './components/utility/renderRoutes';
import routes from './routes/routes.jsx';
import theme from './themes/theme.json';
import '../styles/fonts.css';
import './App.css';

function App() {
  // Mock user object - in a real app, this would come from authentication
  const user = {
    id: 1,
    name: 'Randall N.',
    roles: ['admin'],
    permissions: ['read:all', 'write:all']
  };

  return (
    <ConfigProvider theme={theme}>
      <BrowserRouter>
        <MainLayout theme={theme}>
          <RenderRoutes routes={routes} user={user} />
        </MainLayout>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
