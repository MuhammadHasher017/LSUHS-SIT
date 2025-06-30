import React from 'react';
import { 
  DashboardIcon, 
  LogsIcon, 
  MediaIcon, 
  LibraryIcon, 
  GoalsIcon, 
  RecipesIcon, 
  AppUserIcon, 
  SurveysIcon, 
  CommunityIcon, 
  SettingsIcon,
  OrdersIcon,
  ResultsIcon,
  InventoryIcon,
  LocationIcon,
  EventsIcon
} from '../utils/icons';

// Function to create menu items with active state based on selectedKeys
const createMenuItems = (selectedKeys = []) => [
  { 
    key: 'dashboard', 
    icon: <DashboardIcon width={24} height={24} active={selectedKeys.includes('dashboard')} />, 
    label: 'Dashboard' 
  },
  { 
    key: 'patients', 
    icon: <AppUserIcon active={selectedKeys.includes('patients')} />, 
    label: 'Patients' 
  },
  {
    key: 'orders',
    icon: <OrdersIcon active={selectedKeys.includes('orders')} />,
    label: 'Orders'
  },
  {
    key: 'results',
    icon: <ResultsIcon active={selectedKeys.includes('results')} />,
    label: 'Results'
  },
  {
    key: 'inventory',
    icon: <InventoryIcon active={selectedKeys.includes('inventory')} />,
    label: 'Inventory'
  },
  {
    key: 'location',
    icon: <LocationIcon active={selectedKeys.includes('location')} />,
    label: 'Location'
  },
  {
    key: 'events',
    icon: <EventsIcon active={selectedKeys.includes('events')} />,
    label: 'Events'
  },
  
  {
    key: 'settings-main',
    icon: <SettingsIcon active={selectedKeys.includes('settings-main')} />,
    label: 'Settings',
    children: [
      { key: 'accounts-setting', label: 'Accounts' },
      { key: 'roles', label: 'Roles' },
      { key: 'divisions', label: 'Divisions' },
      { key: 'types', label: 'Types' },
      { key: 'categories', label: 'Categories' },
      { key: 'tags', label: 'Tags' },
    ],
  },
];

export default createMenuItems;
