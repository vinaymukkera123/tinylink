import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import UserMenu from './UserMenu';

const AppHeader = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, [location]);

  const handleAuthToggle = () => {
    if (location?.pathname === '/login-screen') {
      navigate('/register-screen');
    } else {
      navigate('/login-screen');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/login-screen');
  };

  const isAuthPage = location?.pathname === '/login-screen' || location?.pathname === '/register-screen';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-elevation-1">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center space-x-2 transition-smooth hover:opacity-80">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-md">
            <Icon name="Link" size={20} color="white" />
          </div>
          <span className="text-xl font-semibold text-foreground font-sans">TinyLink</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <nav className="flex items-center space-x-6">
                <Link
                  to="/dashboard"
                  className={`text-sm font-medium transition-smooth hover:text-primary ${
                    location?.pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/add-new-link"
                  className={`text-sm font-medium transition-smooth hover:text-primary ${
                    location?.pathname === '/add-new-link' ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  Create Link
                </Link>
              </nav>
              <UserMenu onLogout={handleLogout} />
            </>
          ) : (
            <div className="flex items-center space-x-4">
              {isAuthPage && (
                <button
                  onClick={handleAuthToggle}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-smooth"
                >
                  {location?.pathname === '/login-screen' ? 'Sign Up' : 'Sign In'}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          {isAuthenticated ? (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-muted-foreground hover:text-primary transition-smooth"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          ) : (
            isAuthPage && (
              <button
                onClick={handleAuthToggle}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-smooth"
              >
                {location?.pathname === '/login-screen' ? 'Sign Up' : 'Sign In'}
              </button>
            )
          )}
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && isAuthenticated && (
        <div className="md:hidden bg-card border-t border-border shadow-elevation-2">
          <div className="px-4 py-4 space-y-4">
            <Link
              to="/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block text-sm font-medium transition-smooth hover:text-primary ${
                location?.pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/add-new-link"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block text-sm font-medium transition-smooth hover:text-primary ${
                location?.pathname === '/add-new-link' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Create Link
            </Link>
            <div className="pt-4 border-t border-border">
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-sm font-medium text-destructive hover:text-destructive/80 transition-smooth"
              >
                <Icon name="LogOut" size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default AppHeader;