import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../../components/ui/AppHeader';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import LinkForm from './components/LinkForm';
import LinkPreview from './components/LinkPreview';
import RecentLinks from './components/RecentLinks';
import Icon from '../../components/AppIcon';

const AddNewLink = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [createdLink, setCreatedLink] = useState(null);
  const [recentLinks, setRecentLinks] = useState([]);

  // Mock recent links data
  const mockRecentLinks = [
    {
      id: 1,
      shortUrl: "https://tinylink.co/abc123",
      originalUrl: "https://www.example.com/very-long-url-that-needs-shortening",
      linkName: "Marketing Campaign",
      clickCount: 45,
      createdAt: new Date(Date.now() - 86400000), // 1 day ago
      lastClicked: new Date(Date.now() - 3600000) // 1 hour ago
    },
    {
      id: 2,
      shortUrl: "https://tinylink.co/def456",
      originalUrl: "https://www.another-example.com/product-page",
      linkName: "Product Launch",
      clickCount: 23,
      createdAt: new Date(Date.now() - 172800000), // 2 days ago
      lastClicked: new Date(Date.now() - 7200000) // 2 hours ago
    },
    {
      id: 3,
      shortUrl: "https://tinylink.co/ghi789",
      originalUrl: "https://www.social-media-post.com/content",
      linkName: "Social Media Post",
      clickCount: 67,
      createdAt: new Date(Date.now() - 259200000), // 3 days ago
      lastClicked: new Date(Date.now() - 1800000) // 30 minutes ago
    },
    {
      id: 4,
      shortUrl: "https://tinylink.co/jkl012",
      originalUrl: "https://www.newsletter-link.com/article",
      linkName: "Newsletter Article",
      clickCount: 12,
      createdAt: new Date(Date.now() - 345600000), // 4 days ago
      lastClicked: new Date(Date.now() - 10800000) // 3 hours ago
    },
    {
      id: 5,
      shortUrl: "https://tinylink.co/mno345",
      originalUrl: "https://www.event-registration.com/signup",
      linkName: "Event Registration",
      clickCount: 89,
      createdAt: new Date(Date.now() - 432000000), // 5 days ago
      lastClicked: new Date(Date.now() - 900000) // 15 minutes ago
    }
  ];

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login-screen');
      return;
    }

    // Load recent links
    setRecentLinks(mockRecentLinks);
  }, [navigate]);

  const generateShortUrl = (customSlug) => {
    const baseUrl = "https://tinylink.co/";
    if (customSlug) {
      return baseUrl + customSlug;
    }
    // Generate random slug
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars?.charAt(Math.floor(Math.random() * chars?.length));
    }
    return baseUrl + result;
  };

  const handleCreateLink = async (formData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newLink = {
        id: Date.now(),
        shortUrl: generateShortUrl(formData?.customSlug),
        originalUrl: formData?.originalUrl,
        linkName: formData?.linkName || 'Untitled Link',
        customSlug: formData?.customSlug,
        expirationDate: formData?.expirationDate,
        clickLimit: formData?.clickLimit,
        clickCount: 0,
        createdAt: new Date(),
        lastClicked: null,
        isActive: true
      };

      setCreatedLink(newLink);
      
      // Add to recent links
      setRecentLinks(prev => [newLink, ...prev?.slice(0, 4)]);
      
    } catch (error) {
      console.error('Error creating link:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = async (url) => {
    try {
      await navigator.clipboard?.writeText(url);
      return true;
    } catch (err) {
      console.error('Failed to copy link:', err);
      return false;
    }
  };

  const handleCreateAnother = () => {
    setCreatedLink(null);
  };

  const handleViewDashboard = () => {
    navigate('/dashboard');
  };

  const handleViewAnalytics = (linkId) => {
    navigate(`/link-analytics-detail?id=${linkId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BreadcrumbNavigation />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                <Icon name="Plus" size={24} className="text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Create New Link</h1>
            </div>
            <p className="text-muted-foreground">
              Transform your long URLs into short, trackable links with detailed analytics
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {!createdLink ? (
                <LinkForm 
                  onSubmit={handleCreateLink}
                  isLoading={isLoading}
                />
              ) : (
                <LinkPreview
                  linkData={createdLink}
                  onCopyLink={handleCopyLink}
                  onCreateAnother={handleCreateAnother}
                  onViewDashboard={handleViewDashboard}
                />
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Recent Links */}
                <RecentLinks
                  recentLinks={recentLinks}
                  onCopyLink={handleCopyLink}
                  onViewAnalytics={handleViewAnalytics}
                />

                {/* Tips Card */}
                <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon name="Lightbulb" size={20} className="text-warning" />
                    <h3 className="text-lg font-semibold text-foreground">Pro Tips</h3>
                  </div>
                  
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                      <span>Use custom slugs for branded links that are easy to remember</span>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                      <span>Add descriptive names to organize your links better</span>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                      <span>Set expiration dates for time-sensitive campaigns</span>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                      <span>Use QR codes for offline marketing materials</span>
                    </div>
                  </div>
                </div>

                {/* Stats Card */}
                <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Your Stats</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Total Links</span>
                      <span className="text-2xl font-bold text-foreground">24</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Total Clicks</span>
                      <span className="text-2xl font-bold text-foreground">1,247</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">This Month</span>
                      <span className="text-2xl font-bold text-success">+18%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddNewLink;