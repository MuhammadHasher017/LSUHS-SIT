import React from 'react';
import { useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import getRoutes from './routes.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner';

const RouterConfig = () => {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = !!user;

  console.log(isAuthenticated, user)

  return isAuthenticated === null ? (
    <LoadingSpinner loading fullScreen />
  ) : (
    <RouterProvider router={getRoutes(isAuthenticated, user)} />
  );};

export default RouterConfig; 