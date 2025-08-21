import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbNavigation = () => {
  const location = useLocation();
  
  const getBreadcrumbs = () => {
    const path = location?.pathname;
    
    switch (path) {
      case '/dashboard':
        return [{ label: 'Dashboard', path: '/dashboard', current: true }];
      
      case '/add-new-link':
        return [
          { label: 'Dashboard', path: '/dashboard', current: false },
          { label: 'Create Link', path: '/add-new-link', current: true }
        ];
      
      case '/link-analytics-detail':
        return [
          { label: 'Dashboard', path: '/dashboard', current: false },
          { label: 'Link Analytics', path: '/link-analytics-detail', current: true }
        ];
      
      default:
        return [];
    }
  };

  const breadcrumbs = getBreadcrumbs();

  if (breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      {breadcrumbs?.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb?.path}>
          {index > 0 && (
            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
          )}
          
          {breadcrumb?.current ? (
            <span className="text-foreground font-medium">{breadcrumb?.label}</span>
          ) : (
            <Link
              to={breadcrumb?.path}
              className="hover:text-primary transition-smooth"
            >
              {breadcrumb?.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default BreadcrumbNavigation;