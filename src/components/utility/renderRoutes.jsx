import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

const RenderRoutes = ({ routes, user }) => {
  const location = useLocation();
  const isAuthRoute = location.pathname.startsWith('/auth');

  // Check if user has required roles to access a route
  const hasRequiredRoles = (routeRoles) => {
    // If no roles specified, allow access
    if (!routeRoles || routeRoles.length === 0) return true;
    
    // If user has no roles, deny access
    if (!user || !user.roles || user.roles.length === 0) return false;
    
    // Check if user has at least one of the required roles
    return routeRoles.some(role => user.roles.includes(role));
  };
  
  // Check if user has required permissions to access a route
  const hasRequiredPermissions = (routePermissions) => {
    // If no permissions specified, allow access
    if (!routePermissions || routePermissions.length === 0) return true;
    
    // If user has no permissions, deny access
    if (!user || !user.permissions || user.permissions.length === 0) return false;
    
    // Check if user has all required permissions
    return routePermissions.every(permission => user.permissions.includes(permission));
  };
  
  // Recursively render routes
  const renderRoutesRecursively = (routesArray) => {
    return routesArray.map((route) => {
      // Handle redirect routes
      if (route.redirect) {
        return (
          <Route
            key={route.path}
            path={route.path}
            element={<Navigate to={route.redirect} replace />}
          />
        );
      }
      
      // Check if user has access to this route
      const hasRoleAccess = hasRequiredRoles(route.roles);
      const hasPermissionAccess = hasRequiredPermissions(route.permissions);
      const hasAccess = hasRoleAccess && hasPermissionAccess;
      
      // Determine what to render
      let element;
      
      // If route is protected and user is not authenticated, redirect to login
      if (!isAuthRoute && route.path !== '*' && !user?.email && route.path !== '/unauthorized') {
        element = <Navigate to="/auth/login" replace />;
      } else if (hasAccess) {
        // User has access, render the route element
        element = route.element;
      } else if (route.fallback) {
        // User doesn't have access, but a fallback is provided
        element = route.fallback;
      } else {
        // User doesn't have access and no fallback, redirect to unauthorized
        element = <Navigate to="/unauthorized" replace />;
      }
      
      return (
        <Route key={route.path} path={route.path} element={element}>
          {/* Render nested routes if they exist */}
          {route.children && renderRoutesRecursively(route.children)}
        </Route>
      );
    });
  };
  
  return <Routes>{renderRoutesRecursively(routes)}</Routes>;
};


export default RenderRoutes;
