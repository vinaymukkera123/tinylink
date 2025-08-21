import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';

const UserMenu = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const userEmail = localStorage.getItem('userEmail') || 'user@example.com';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef?.current &&
        !menuRef?.current?.contains(event?.target) &&
        buttonRef?.current &&
        !buttonRef?.current?.contains(event?.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setIsOpen(false);
    onLogout();
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted transition-smooth focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <Icon name="User" size={16} color="white" />
        </div>
        <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-md shadow-elevation-4 z-50"
        >
          <div className="p-3 border-b border-border">
            <p className="text-sm font-medium text-foreground truncate">{userEmail}</p>
            <p className="text-xs text-muted-foreground">Account</p>
          </div>
          
          <div className="py-2">
            <button
              onClick={() => setIsOpen(false)}
              className="flex items-center w-full px-3 py-2 text-sm text-foreground hover:bg-muted transition-smooth"
            >
              <Icon name="Settings" size={16} className="mr-3" />
              Settings
            </button>
            
            <button
              onClick={() => setIsOpen(false)}
              className="flex items-center w-full px-3 py-2 text-sm text-foreground hover:bg-muted transition-smooth"
            >
              <Icon name="HelpCircle" size={16} className="mr-3" />
              Help & Support
            </button>
          </div>
          
          <div className="border-t border-border py-2">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 text-sm text-destructive hover:bg-muted transition-smooth"
            >
              <Icon name="LogOut" size={16} className="mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;