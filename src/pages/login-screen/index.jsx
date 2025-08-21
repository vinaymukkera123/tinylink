import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import AppHeader from '../../components/ui/AppHeader';
import LoginForm from './components/LoginForm';
import SocialLogin from './components/SocialLogin';
import LoginFooter from './components/LoginFooter';

const LoginScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Sign In - TinyLink</title>
        <meta name="description" content="Sign in to your TinyLink account to manage your shortened URLs and view analytics." />
        <meta name="keywords" content="login, sign in, TinyLink, URL shortener, authentication" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <AppHeader />
        
        <main className="pt-16">
          <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md mx-auto">
              <LoginForm />
              <SocialLogin />
              <LoginFooter />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default LoginScreen;