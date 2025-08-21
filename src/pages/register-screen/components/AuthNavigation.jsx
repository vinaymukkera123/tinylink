import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const AuthNavigation = () => {
  return (
    <div className="text-center mt-6">
      <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
        <span>Already have an account?</span>
        <Link 
          to="/login-screen" 
          className="text-primary hover:text-primary/80 font-medium transition-smooth flex items-center space-x-1"
        >
          <span>Sign In</span>
          <Icon name="ArrowRight" size={14} />
        </Link>
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          By signing up, you're joining over 50,000+ users who trust TinyLink for their URL shortening needs
        </p>
      </div>
    </div>
  );
};

export default AuthNavigation;