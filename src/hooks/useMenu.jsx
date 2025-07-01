import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Unified menu configuration
const menuConfig = {
  '/dashboard': { key: 'dashboard', title: 'Dashboard' },
  '/patients': { key: 'patients', title: 'Patients' },
  '/orders': { key: 'orders', title: 'Orders' },
  '/results': { key: 'results', title: 'Results' },
  '/inventory': { key: 'inventory', title: 'Inventory' },
  '/location': { key: 'location', title: 'Location' },
  '/events': { key: 'events', title: 'Events' },
  '/logs/goals': { key: 'goals-log', title: 'Goals' },
  '/logs/weight': { key: 'weight', title: 'Weight' },
  '/logs/activity': { key: 'activity', title: 'Activity' },
  '/logs/kicks': { key: 'kicks', title: 'Kicks' },
  '/logs/contractions': { key: 'contractions', title: 'Contractions' },
  '/media': { key: 'media', title: 'Media' },
  '/media/images': { key: 'media-images', title: 'Images' },
  '/media/videos': { key: 'media-videos', title: 'Videos' },
  '/media/audio': { key: 'media-audio', title: 'Audio' },
  '/media/documents': { key: 'media-documents', title: 'Documents' },
  '/library': { key: 'library', title: 'Library' },
  '/goals': { key: 'goals-main', title: 'Goals' },
  '/recipes': { key: 'recipes', title: 'Recipes' },
  '/app-users': { key: 'app-users', title: 'App Users' },
  '/surveys': { key: 'surveys', title: 'Surveys' },
  '/community': { key: 'community', title: 'Community' },
  '/settings': { key: 'settings-main', title: 'Settings' }
};

// Create reverse mapping from keys to routes
const keyToRouteMap = Object.entries(menuConfig).reduce((acc, [route, config]) => {
  acc[config.key] = route;
  return acc;
}, {});

const useMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState(['dashboard']);
  const [currentContentTitle, setCurrentContentTitle] = useState('Dashboard');
  
  // Initialize selected key based on current route
  useEffect(() => {
    const pathname = location.pathname;
    const config = menuConfig[pathname] || menuConfig['/dashboard'];
    
    setSelectedKeys([config.key]);
    setCurrentContentTitle(config.title);
  }, [location.pathname]);

  const handleMenuSelect = useCallback(({ key }) => {
    setSelectedKeys([key]);
    
    // Find the route for this key
    const route = keyToRouteMap[key];
    if (route) {
      // Get title from the config
      const config = menuConfig[route];
      setCurrentContentTitle(config.title);
      
      // Navigate to the corresponding route
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
