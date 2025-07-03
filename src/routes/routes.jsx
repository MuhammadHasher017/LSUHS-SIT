import React, { Suspense } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import AuthLayout from '../layout/AuthLayout';
import Login from '../pages/Login/Login.page.jsx';
import SignUp from '../pages/SignUp/SignUp.page.jsx';
import NotFound from '../pages/NotFound/NotFound.page.jsx';
import { DynamicTableWithData } from '../components/tables/DynamicTableWithData';
import LoadingSpinner from '@/components/common/Loader/LoadingSpinner';
import { Outlet } from 'react-router-dom';

const Dashboard = React.lazy(() => import('../pages/Dashboard/Dashboard.page.jsx'));
const Events = React.lazy(() => import('../pages/Events/Events.page.jsx'));
const Unauthorized = React.lazy(() => import('../pages/Unauthorized/Unauthorized.page.jsx'));
const Settings = React.lazy(() => import('../pages/Settings/Settings.page.jsx'));
const Community = React.lazy(() => import('../pages/Community/Community.page.jsx'));
const Surveys = React.lazy(() => import('../pages/Surveys/Surveys.page.jsx'));
const Goals = React.lazy(() => import('../pages/Goals/Goals.page.jsx'));
const Location = React.lazy(() => import('../pages/Location/Location.page.jsx'));
const Inventory = React.lazy(() => import('../pages/Inventory/Inventory.page.jsx'));
const Results = React.lazy(() => import('../pages/Results/Results.page.jsx'));
const Orders = React.lazy(() => import('../pages/Orders/Orders.page.jsx'));
const Patients = React.lazy(() => import('../pages/Patients/Patients.page.jsx'));

const withSuspense = (Component) => (props) => (
  <Suspense fallback={<LoadingSpinner/>}>
    {React.createElement(Component, props)}
  </Suspense>
);

const getRoutes = (isAuthenticated) => {
  return createBrowserRouter([
    {
      path: '/auth',
      element: isAuthenticated ? (
        <Navigate to='/' replace />
      ) : (
        <AuthLayout />
      ),
      children: [
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'signup',
          element: <SignUp />,
        },
      ],
    },
    {
      path: '/',
      element: isAuthenticated ? <MainLayout /> : <Navigate to='/auth/login' replace />,
      children: [
        { path: '', element: <Navigate to='/dashboard' replace /> },
        {
          path: 'dashboard',
          element: React.createElement(withSuspense(Dashboard)),
        },
        {
          path: 'patients',
          element: React.createElement(withSuspense(Patients)),
          roles: ['admin', 'manager'],
          fallback: React.createElement(withSuspense(Unauthorized))
        },
        {
          path: 'orders',
          element: React.createElement(withSuspense(Orders)),
          roles: ['admin', 'manager'],
          fallback: React.createElement(withSuspense(Unauthorized))
        },
        {
          path: 'results',
          element: React.createElement(withSuspense(Results)),
          roles: ['admin', 'manager'],
          fallback: React.createElement(withSuspense(Unauthorized))
        },
        {
          path: 'inventory',
          element: React.createElement(withSuspense(Inventory)),
          roles: ['admin', 'manager'],
          fallback: React.createElement(withSuspense(Unauthorized))
        },
        {
          path: 'location',
          element: React.createElement(withSuspense(Location)),
          roles: ['admin', 'manager'],
          fallback: React.createElement(withSuspense(Unauthorized))
        },
        {
          path: 'events',
          element: React.createElement(withSuspense(Events)),
          roles: ['admin', 'manager'],
          fallback: React.createElement(withSuspense(Unauthorized))
        },
        {
          path: 'media',
          children: [
            {
              path: '',
              element: <DynamicTableWithData dataType="media" mediaType="all" />
            },
            {
              path: 'images',
              element: <DynamicTableWithData dataType="media" mediaType="images" />
            },
            {
              path: 'videos',
              element: <DynamicTableWithData dataType="media" mediaType="videos" />
            },
            {
              path: 'audio',
              element: <DynamicTableWithData dataType="media" mediaType="audio" />
            },
            {
              path: 'documents',
              element: <DynamicTableWithData dataType="media" mediaType="documents" />
            }
          ]
        },
        {
          path: 'settings',
          element: React.createElement(withSuspense(Settings)),
          permissions: ['manage:settings'],
          fallback: React.createElement(withSuspense(Unauthorized))
        },
        {
          path: 'surveys',
          element: React.createElement(withSuspense(Surveys)),
          fallback: React.createElement(withSuspense(Unauthorized))
        },
        {
          path: 'community',
          element: React.createElement(withSuspense(Community)),
          fallback: React.createElement(withSuspense(Unauthorized))
        },
        {
          path: 'goals',
          element: React.createElement(withSuspense(Goals)),
          fallback: React.createElement(withSuspense(Unauthorized))
        },
        {
          path: 'unauthorized',
          element: React.createElement(withSuspense(Unauthorized))
        },
        {
          path: '*',
          redirect: '/dashboard'
        }
      ]
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);
};

export default getRoutes;
