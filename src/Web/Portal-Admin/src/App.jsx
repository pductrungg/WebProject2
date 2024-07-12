import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import 'styles/custom.scss';
import Layout from 'components/layout/Layout';
import Login from 'pages/login/Login';
import {ConfigProvider} from 'antd';
import {GlobalTokenConfigTheme, ComponentTokenConfigTheme} from 'styles/ConfigTheme';
import useCheckLoggedIn from 'helpers/useCheckLoggedIn';

function App() {
  const isAuthorized = useCheckLoggedIn();

  // useEffect(() => {
  //   console.log('isAuthorized', isAuthorized);
  // }, [isAuthorized]);

  return (
    <ConfigProvider
      theme={{
        token: GlobalTokenConfigTheme,
        components: ComponentTokenConfigTheme,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route exact path="*" element={isAuthorized ? <Layout /> : <Navigate to="/login" />} />
          <Route path="/login" element={isAuthorized ? <Navigate to="/dashboard" /> : <Login />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer autoClose={2000} position="top-center" pauseOnFocusLoss={false} />
    </ConfigProvider>
  );
}

export default App;
