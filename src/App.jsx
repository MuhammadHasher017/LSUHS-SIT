import React from 'react';
import WithAntdTheme from './components/hoc/WithAntdTheme';
import RouterConfig from './routes/routerConfig';
import '../styles/fonts.css';
import './App.css';

function App() {
  return (
    <WithAntdTheme>
      <RouterConfig />
    </WithAntdTheme>
  );
}

export default App;
