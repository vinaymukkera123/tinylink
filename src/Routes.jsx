import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LoginScreen from './pages/login-screen';
import AddNewLink from './pages/add-new-link';
import Dashboard from './pages/dashboard';
import LinkAnalyticsDetail from './pages/link-analytics-detail';
import RegisterScreen from './pages/register-screen';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AddNewLink />} />
        <Route path="/login-screen" element={<LoginScreen />} />
        <Route path="/add-new-link" element={<AddNewLink />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/link-analytics-detail" element={<LinkAnalyticsDetail />} />
        <Route path="/register-screen" element={<RegisterScreen />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
