import React, { Suspense } from 'react';
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
import { DynamicTableWithData } from '../components/tables/DynamicTableWithData';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const withSuspense = (Component) => (props) => (
  <Suspense fallback={<LoadingSpinner/>}>
    <Component {...props} />
  </Suspense>
);

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    element: React.createElement(withSuspense(Dashboard)),
    // Open to all users
  },
  {
    path: '/patients',
    element: React.createElement(withSuspense(Patients)),
    // Example of role-based access control
    roles: ['admin', 'manager'],
    fallback: React.createElement(withSuspense(Unauthorized))
  },
  {
    path: '/orders',
    element: React.createElement(withSuspense(Orders)),
    roles: ['admin', 'manager'],
    fallback: React.createElement(withSuspense(Unauthorized))
  },
  {
    path: '/results',
    element: React.createElement(withSuspense(Results)),
    roles: ['admin', 'manager'],
    fallback: React.createElement(withSuspense(Unauthorized))
  },
  {
    path: '/inventory',
    element: React.createElement(withSuspense(Inventory)),
    roles: ['admin', 'manager'],
    fallback: React.createElement(withSuspense(Unauthorized))
  },
  {
    path: '/location',
    element: React.createElement(withSuspense(Location)),
    roles: ['admin', 'manager'],
    fallback: React.createElement(withSuspense(Unauthorized))
  },
  {
    path: '/events',
    element: React.createElement(withSuspense(Events)),
    roles: ['admin', 'manager'],
    fallback: React.createElement(withSuspense(Unauthorized))
  },
  {
    path: '/media',
    // Media section with sub-routes
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
    path: '/settings',
    element: React.createElement(withSuspense(Settings)),
    // Example of permission-based access control
    permissions: ['manage:settings'],
    fallback: React.createElement(withSuspense(Unauthorized))
  },
  {
    path: '/surveys',
    element: React.createElement(withSuspense(Surveys)),
    fallback: React.createElement(withSuspense(Unauthorized))
  },
  {
    path: '/community',
    element: React.createElement(withSuspense(Community)),
    fallback: React.createElement(withSuspense(Unauthorized))
  },
  {
    path: '/goals',
    element: React.createElement(withSuspense(Goals)),
    fallback: React.createElement(withSuspense(Unauthorized))
  },
  {
    path: '/unauthorized',
    element: React.createElement(withSuspense(Unauthorized))
  },
  {
    // Catch-all route for 404
    path: '*',
    redirect: '/dashboard'
  }
];

export default routes;
