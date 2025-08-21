import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppHeader from '../../components/ui/AppHeader';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import LinkHeader from './components/LinkHeader';
import MetricsCards from './components/MetricsCards';
import ClicksChart from './components/ClicksChart';
import DetailedMetrics from './components/DetailedMetrics';
import QRCodeSection from './components/QRCodeSection';
import RecentClicks from './components/RecentClicks';
import Button from '../../components/ui/Button';


const LinkAnalyticsDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for the analytics
  const linkData = {
    id: 'abc123',
    shortUrl: 'https://tinylink.co/abc123',
    originalUrl: 'https://www.example.com/very-long-url-that-needs-shortening-for-better-sharing',
    customName: 'Marketing Campaign Q4',
    createdAt: 'Dec 15, 2024',
    isActive: true
  };

  const metrics = {
    totalClicks: 2847,
    todayClicks: 156,
    weekClicks: 892,
    lastClick: '2 hours ago'
  };

  const chartData = [
    { date: 'Dec 14', clicks: 245 },
    { date: 'Dec 15', clicks: 312 },
    { date: 'Dec 16', clicks: 189 },
    { date: 'Dec 17', clicks: 421 },
    { date: 'Dec 18', clicks: 356 },
    { date: 'Dec 19', clicks: 298 },
    { date: 'Dec 20', clicks: 156 }
  ];

  const detailedData = {
    totalClicks: 2847,
    referrers: [
      { name: 'Google Search', clicks: 1142 },
      { name: 'Facebook', clicks: 687 },
      { name: 'Direct', clicks: 523 },
      { name: 'Twitter', clicks: 312 },
      { name: 'LinkedIn', clicks: 183 }
    ],
    locations: [
      { name: 'United States', clicks: 1423 },
      { name: 'United Kingdom', clicks: 456 },
      { name: 'Canada', clicks: 312 },
      { name: 'Germany', clicks: 289 },
      { name: 'Australia', clicks: 367 }
    ],
    devices: [
      { name: 'Desktop', clicks: 1698 },
      { name: 'Mobile', clicks: 892 },
      { name: 'Tablet', clicks: 257 }
    ],
    browsers: [
      { name: 'Chrome', clicks: 1567 },
      { name: 'Safari', clicks: 623 },
      { name: 'Firefox', clicks: 398 },
      { name: 'Edge', clicks: 259 }
    ]
  };

  const recentClicks = [
    {
      timestamp: new Date(Date.now() - 300000),
      referrer: 'Google Search',
      location: 'United States',
      device: 'Desktop',
      browser: 'Chrome'
    },
    {
      timestamp: new Date(Date.now() - 900000),
      referrer: 'Facebook',
      location: 'United Kingdom',
      device: 'Mobile',
      browser: 'Safari'
    },
    {
      timestamp: new Date(Date.now() - 1800000),
      referrer: 'Direct',
      location: 'Canada',
      device: 'Desktop',
      browser: 'Firefox'
    },
    {
      timestamp: new Date(Date.now() - 2700000),
      referrer: 'Twitter',
      location: 'Germany',
      device: 'Mobile',
      browser: 'Chrome'
    },
    {
      timestamp: new Date(Date.now() - 3600000),
      referrer: 'LinkedIn',
      location: 'Australia',
      device: 'Tablet',
      browser: 'Safari'
    },
    {
      timestamp: new Date(Date.now() - 5400000),
      referrer: 'Google Search',
      location: 'France',
      device: 'Desktop',
      browser: 'Edge'
    },
    {
      timestamp: new Date(Date.now() - 7200000),
      referrer: 'Direct',
      location: 'India',
      device: 'Mobile',
      browser: 'Chrome'
    },
    {
      timestamp: new Date(Date.now() - 9000000),
      referrer: 'Facebook',
      location: 'Japan',
      device: 'Desktop',
      browser: 'Safari'
    },
    {
      timestamp: new Date(Date.now() - 10800000),
      referrer: 'Twitter',
      location: 'United States',
      device: 'Mobile',
      browser: 'Firefox'
    },
    {
      timestamp: new Date(Date.now() - 12600000),
      referrer: 'LinkedIn',
      location: 'United Kingdom',
      device: 'Desktop',
      browser: 'Chrome'
    },
    {
      timestamp: new Date(Date.now() - 14400000),
      referrer: 'Google Search',
      location: 'Canada',
      device: 'Tablet',
      browser: 'Safari'
    },
    {
      timestamp: new Date(Date.now() - 16200000),
      referrer: 'Direct',
      location: 'Germany',
      device: 'Mobile',
      browser: 'Edge'
    }
  ];

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login-screen');
      return;
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader />
        <div className="pt-16">
          <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading analytics...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <BreadcrumbNavigation />
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Link Analytics</h1>
                <p className="text-muted-foreground">
                  Detailed performance insights for your shortened link
                </p>
              </div>
              
              <Button
                variant="outline"
                iconName="ArrowLeft"
                iconPosition="left"
                onClick={handleBackToDashboard}
              >
                Back to Dashboard
              </Button>
            </div>
          </div>

          <div className="space-y-8">
            {/* Link Header */}
            <LinkHeader linkData={linkData} />

            {/* Metrics Cards */}
            <MetricsCards metrics={metrics} />

            {/* Charts and Detailed Analytics */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2">
                <ClicksChart chartData={chartData} />
              </div>
              <div className="xl:col-span-1">
                <DetailedMetrics detailedData={detailedData} />
              </div>
            </div>

            {/* QR Code and Recent Clicks */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <QRCodeSection shortUrl={linkData?.shortUrl} />
              <RecentClicks recentClicks={recentClicks} />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-border">
              <Button
                variant="default"
                iconName="Edit"
                iconPosition="left"
                className="flex-1 sm:flex-none"
              >
                Edit Link Settings
              </Button>
              <Button
                variant="outline"
                iconName="Share"
                iconPosition="left"
                className="flex-1 sm:flex-none"
              >
                Share Link
              </Button>
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
                className="flex-1 sm:flex-none"
              >
                Export Analytics
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkAnalyticsDetail;