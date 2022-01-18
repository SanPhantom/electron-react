import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Layouts from './layouts';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';

function App() {

  const theme = React.useMemo(() => createTheme({
    palette:{
      mode: 'dark',
      primary: {
        main: '#9feaf9'
      }
    }
  }), [])

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Layouts>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/excel2json" element={<AboutPage />}></Route>
          </Routes>
        </Layouts>
      </ThemeProvider>

    </div>
  );
}

export default App;
