import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Map routes to menu keys
const routeToKeyMap = {
  '/dashboard': 'dashboard',
  '/patients': 'patients',
  '/orders': 'orders',
  '/results': 'results',
  '/inventory': 'inventory',
  '/location': 'location',
  '/events': 'events',
  '/logs/goals': 'goals-log',
  '/logs/weight': 'weight',
  '/logs/activity': 'activity',
  '/logs/kicks': 'kicks',
  '/logs/contractions': 'contractions',
  '/media': 'media',
  '/media/images': 'media-images',
  '/media/videos': 'media-videos',
  '/media/audio': 'media-audio',
  '/media/documents': 'media-documents',
  '/library': 'library',
  '/goals': 'goals-main',
  '/recipes': 'recipes',
  '/app-users': 'app-users',
  '/surveys': 'surveys',
  '/community': 'community',
  '/settings': 'settings-main'
};

// Map keys to titles
const keyToTitleMap = {
  'dashboard': 'Dashboard',
  'patients': 'Patients',
  'orders': 'Orders',
  'results': 'Results',
  'inventory': 'Inventory',
  'location': 'Location',
  'events': 'Events',
  'goals-log': 'Goals',
  'weight': 'Weight',
  'activity': 'Activity',
  'kicks': 'Kicks',
  'contractions': 'Contractions',
  'media': 'Media',
  'media-all': 'Media',
  'media-images': 'Images',
  'media-videos': 'Videos',
  'media-audio': 'Audio',
  'media-documents': 'Documents',
  'library': 'Library',
  'goals-main': 'Goals',
  'recipes': 'Recipes',
  'app-users': 'App Users',
  'surveys': 'Surveys',
  'community': 'Community',
  'settings-main': 'Settings'
};

const useMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState(['dashboard']);
  const [currentContentTitle, setCurrentContentTitle] = useState('Dashboard');
  
  // Initialize selected key based on current route
  useEffect(() => {
    const pathname = location.pathname;
    const key = routeToKeyMap[pathname] || 'dashboard';
    const title = keyToTitleMap[key] || 'Dashboard';
    
    setSelectedKeys([key]);
    setCurrentContentTitle(title);
  }, [location.pathname]);

  const handleMenuSelect = useCallback(({ key }) => {
    console.log("key", key);
    
    
    setSelectedKeys([key]);
    
    // Get title from the map
    const title = keyToTitleMap[key] || 'Dashboard';
    
    setCurrentContentTitle(title);
    
    // Map menu keys to routes
    const routeMap = {
      dashboard: '/dashboard',
      patients: '/patients',
      orders: '/orders',
      results: '/results',
      inventory: '/inventory',
      location: '/location',
      events: '/events',
      'goals-log': '/logs/goals',
      weight: '/logs/weight',
      activity: '/logs/activity',
      kicks: '/logs/kicks',
      contractions: '/logs/contractions',
      media: '/media',
      'media-all': '/media',
      'media-images': '/media/images',
      'media-videos': '/media/videos',
      'media-audio': '/media/audio',
      'media-documents': '/media/documents',
      library: '/library',
      'goals-main': '/goals',
      recipes: '/recipes',
      'app-users': '/app-users',
      surveys: '/surveys',
      community: '/community',
      'settings-main': '/settings'
    };
    
    // Navigate to the corresponding route
    const route = routeMap[key];
    if (route) {
      navigate(route);
    }
  }, [navigate]);

  return {
    selectedKeys,
    currentContentTitle,
    handleMenuSelect
  };
};

export default useMenu;
