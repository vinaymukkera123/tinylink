import React from 'react';

const LoginFooter = () => {
  const currentYear = new Date()?.getFullYear();

  const handleLinkClick = (linkType) => {
    alert(`${linkType} page would be implemented here`);
  };

  return (
    <footer className="mt-12 text-center">
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-muted-foreground">
        <button
          onClick={() => handleLinkClick('Privacy Policy')}
          className="hover:text-primary transition-smooth"
        >
          Privacy Policy
        </button>
        <button
          onClick={() => handleLinkClick('Terms of Service')}
          className="hover:text-primary transition-smooth"
        >
          Terms of Service
        </button>
        <button
          onClick={() => handleLinkClick('Help Center')}
          className="hover:text-primary transition-smooth"
        >
          Help Center
        </button>
      </div>
      
      <div className="mt-4 text-xs text-muted-foreground">
        <p>&copy; {currentYear} TinyLink. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default LoginFooter;