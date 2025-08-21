import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../../components/ui/AppHeader';
import RegistrationForm from './components/RegistrationForm';
import TrustSignals from './components/TrustSignals';
import AuthNavigation from './components/AuthNavigation';

const RegisterScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard if already authenticated
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <main className="pt-16 min-h-screen">
        <div className="flex min-h-screen">
          {/* Registration Form Section */}
          <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
            <div className="w-full max-w-md">
              <RegistrationForm />
              <AuthNavigation />
            </div>
          </div>

          {/* Trust Signals Section - Desktop Only */}
          <TrustSignals />
        </div>
      </main>
    </div>
  );
};

export default RegisterScreen;