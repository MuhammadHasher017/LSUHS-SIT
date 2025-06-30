import React from 'react';
import DynamicTable from '../components/tables/DynamicTable';
import Dashboard from '../components/dashboard/Dashboard';
import useTableData from '../hooks/useTableData';
// Remove imports for individual table components as we're using DynamicTable

// Component to wrap DynamicTable with data from useTableData hook
const DynamicTableWithData = ({ dataType, mediaType = 'all', searchText = '' }) => {
  const { data, loading, handleSearch } = useTableData(dataType, mediaType);
  
  // Apply search when searchText changes
  React.useEffect(() => {
    if (handleSearch) {
      handleSearch(searchText);
    }
  }, [searchText, handleSearch]);
  
  return (
    <DynamicTable 
      dataType={dataType} 
      data={data} 
      loading={loading}
      onSearch={handleSearch}
      mediaType={mediaType}
    />
  );
};

// Import placeholder components for other routes
// In a real app, you would import actual components
const WeightLog = () => <div>Weight Log Content</div>;
const ActivityLog = () => <div>Activity Log Content</div>;
const KicksLog = () => <div>Kicks Log Content</div>;
const ContractionsLog = () => <div>Contractions Log Content</div>;
const Goals = () => <div>Goals Content</div>;
const Recipes = () => <div>Recipes Content</div>;
const AppUsers = () => <div>App Users Content</div>;
const Patients = () => <div>Patients Content</div>;
const Orders = () => <div>Orders Content</div>;
const Results = () => <div>Results Content</div>;
const Inventory = () => <div>Inventory Content</div>;
const Location = () => <div>Location Content</div>;
const Events = () => <div>Events Content</div>;

const Surveys = () => <div>Surveys Content</div>;
const Community = () => <div>Community Content</div>;
const Settings = () => <div>Settings Content</div>;
const Unauthorized = () => <div>You don't have permission to access this page</div>;


const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    // Open to all users
  },
  {
    path: '/patients',
    element: <Patients />,
    // Example of role-based access control
    roles: ['admin', 'manager'],
    fallback: <Unauthorized />
  },
  {
    path: '/orders',
    element: <Orders />,
    roles: ['admin', 'manager'],
    fallback: <Unauthorized />
  },
  {
    path: '/results',
    element: <Results />,
    roles: ['admin', 'manager'],
    fallback: <Unauthorized />
  },
  {
    path: '/inventory',
    element: <Inventory />,
    roles: ['admin', 'manager'],
    fallback: <Unauthorized />
  },
  {
    path: '/location',
    element: <Location />,
    roles: ['admin', 'manager'],
    fallback: <Unauthorized />
  },
  {
    path: '/events',
    element: <Events />,
    roles: ['admin', 'manager'],
    fallback: <Unauthorized />
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
    path: '/library',
    element: <DynamicTableWithData dataType="library" />
  },
  {
    path: '/goals',
    element: <Goals />
  },
  {
    path: '/recipes',
    element: <Recipes />
  },

  {
    path: '/surveys',
    element: <Surveys />
  },
  {
    path: '/community',
    element: <Community />
  },
  {
    path: '/settings',
    element: <Settings />,
    // Example of permission-based access control
    permissions: ['manage:settings'],
    fallback: <Unauthorized />
  },
  {
    path: '/unauthorized',
    element: <Unauthorized />
  },
  {
    // Catch-all route for 404
    path: '*',
    redirect: '/dashboard'
  }
];

export default routes;
