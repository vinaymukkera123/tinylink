import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../../components/ui/AppHeader';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import DashboardStats from './components/DashboardStats';
import SearchAndFilters from './components/SearchAndFilters';
import LinksTable from './components/LinksTable';
import LinkCard from './components/LinkCard';
import QRCodeModal from './components/QRCodeModal';
import AnalyticsChart from './components/AnalyticsChart';

const Dashboard = () => {
  const navigate = useNavigate();
  const [links, setLinks] = useState([]);
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [qrModal, setQrModal] = useState({ isOpen: false, link: null });
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  // Mock data for links
  const mockLinks = [
    {
      id: 1,
      title: "Product Launch Campaign",
      originalUrl: "https://www.example.com/products/new-smartphone-launch-2025-features-specs-pricing",
      shortUrl: "https://tinylink.co/abc123",
      clickCount: 1247,
      lastClicked: new Date(Date.now() - 3600000),
      createdAt: new Date(Date.now() - 86400000 * 5),
      isActive: true
    },
    {
      id: 2,
      title: "Social Media Marketing Guide",
      originalUrl: "https://www.marketingblog.com/ultimate-guide-to-social-media-marketing-strategies-2025",
      shortUrl: "https://tinylink.co/def456",
      clickCount: 892,
      lastClicked: new Date(Date.now() - 7200000),
      createdAt: new Date(Date.now() - 86400000 * 3),
      isActive: true
    },
    {
      id: 3,
      title: "Company Newsletter",
      originalUrl: "https://newsletter.company.com/monthly-updates-december-2024-achievements-goals",
      shortUrl: "https://tinylink.co/ghi789",
      clickCount: 456,
      lastClicked: new Date(Date.now() - 14400000),
      createdAt: new Date(Date.now() - 86400000 * 7),
      isActive: true
    },
    {
      id: 4,
      title: "Event Registration",
      originalUrl: "https://events.techconf.com/register/annual-technology-conference-2025-speakers-agenda",
      shortUrl: "https://tinylink.co/jkl012",
      clickCount: 234,
      lastClicked: new Date(Date.now() - 28800000),
      createdAt: new Date(Date.now() - 86400000 * 10),
      isActive: false
    },
    {
      id: 5,
      title: "Blog Post - AI Trends",
      originalUrl: "https://techblog.ai/artificial-intelligence-trends-2025-machine-learning-predictions",
      shortUrl: "https://tinylink.co/mno345",
      clickCount: 678,
      lastClicked: new Date(Date.now() - 1800000),
      createdAt: new Date(Date.now() - 86400000 * 2),
      isActive: true
    },
    {
      id: 6,
      title: "Customer Survey",
      originalUrl: "https://survey.customervoice.com/feedback/product-satisfaction-survey-2025-q1",
      shortUrl: "https://tinylink.co/pqr678",
      clickCount: 123,
      lastClicked: null,
      createdAt: new Date(Date.now() - 86400000 * 1),
      isActive: true
    }
  ];

  // Mock stats data
  const mockStats = {
    totalLinks: mockLinks?.length,
    totalClicks: mockLinks?.reduce((sum, link) => sum + link?.clickCount, 0),
    activeLinks: mockLinks?.filter(link => link?.isActive)?.length,
    averageCTR: 12.5
  };

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login-screen');
      return;
    }

    // Simulate loading
    setTimeout(() => {
      setLinks(mockLinks);
      setFilteredLinks(mockLinks);
      setIsLoading(false);
    }, 1000);

    // Check mobile view
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [navigate]);

  useEffect(() => {
    // Apply filters and search
    let filtered = [...links];

    // Search filter
    if (searchTerm) {
      filtered = filtered?.filter(link =>
        link?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        link?.originalUrl?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        link?.shortUrl?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    // Status filter
    if (filters?.status !== 'all') {
      filtered = filtered?.filter(link =>
        filters?.status === 'active' ? link?.isActive : !link?.isActive
      );
    }

    // Sort
    filtered?.sort((a, b) => {
      let aValue = a?.[filters?.sortBy];
      let bValue = b?.[filters?.sortBy];

      if (filters?.sortBy === 'createdAt' || filters?.sortBy === 'lastClicked') {
        aValue = new Date(aValue || 0);
        bValue = new Date(bValue || 0);
      }

      if (filters?.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredLinks(filtered);
  }, [links, searchTerm, filters]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const handleCopyLink = async (shortUrl) => {
    try {
      await navigator.clipboard?.writeText(shortUrl);
      // You could add a toast notification here
      return true;
    } catch (err) {
      console.error('Failed to copy link:', err);
      return false;
    }
  };

  const handleGenerateQR = (link) => {
    setQrModal({ isOpen: true, link });
  };

  const handleCloseQRModal = () => {
    setQrModal({ isOpen: false, link: null });
  };

  const handleCreateNewLink = () => {
    navigate('/add-new-link');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader />
        <div className="pt-16">
          <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading your dashboard...</p>
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
        <div className="container mx-auto px-4 py-6 lg:px-6">
          <BreadcrumbNavigation />
          
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage your shortened links and track their performance
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Button
                variant="default"
                onClick={handleCreateNewLink}
                iconName="Plus"
                iconPosition="left"
                size="lg"
              >
                Create New Link
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <DashboardStats stats={mockStats} />

          {/* Analytics Chart */}
          <div className="mb-8">
            <AnalyticsChart type="line" />
          </div>

          {/* Search and Filters */}
          <SearchAndFilters
            onSearch={handleSearch}
            onFilter={handleFilter}
            totalLinks={filteredLinks?.length}
          />

          {/* Links Display */}
          {filteredLinks?.length === 0 ? (
            <div className="bg-card border border-border rounded-lg p-12 text-center shadow-elevation-1">
              <div className="max-w-md mx-auto">
                <div className="p-4 bg-muted/30 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Icon name="Link" size={32} className="text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {searchTerm || filters?.status !== 'all' ? 'No links found' : 'No links yet'}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {searchTerm || filters?.status !== 'all' ? 'Try adjusting your search or filters to find what you\'re looking for.'
                    : 'Create your first shortened link to get started with tracking and analytics.'
                  }
                </p>
                <Button
                  variant="default"
                  onClick={handleCreateNewLink}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Create Your First Link
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Mobile: Card Layout */}
              {isMobile ? (
                <div className="space-y-4">
                  {filteredLinks?.map((link) => (
                    <LinkCard
                      key={link?.id}
                      link={link}
                      onCopyLink={handleCopyLink}
                      onGenerateQR={handleGenerateQR}
                    />
                  ))}
                </div>
              ) : (
                <LinksTable
                  links={filteredLinks}
                  onCopyLink={handleCopyLink}
                  onGenerateQR={handleGenerateQR}
                />
              )}
            </>
          )}

          {/* Pagination would go here for large datasets */}
          {filteredLinks?.length > 10 && (
            <div className="flex items-center justify-center mt-8">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  <Icon name="ChevronLeft" size={16} />
                </Button>
                <span className="text-sm text-muted-foreground px-4">
                  Page 1 of 1
                </span>
                <Button variant="outline" size="sm" disabled>
                  <Icon name="ChevronRight" size={16} />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* QR Code Modal */}
      <QRCodeModal
        isOpen={qrModal?.isOpen}
        onClose={handleCloseQRModal}
        link={qrModal?.link}
      />
    </div>
  );
};

export default Dashboard;