import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const DetailedMetrics = ({ detailedData }) => {
  const [activeTab, setActiveTab] = useState('referrers');

  const tabs = [
    { id: 'referrers', label: 'Referrers', icon: 'Globe' },
    { id: 'locations', label: 'Locations', icon: 'MapPin' },
    { id: 'devices', label: 'Devices', icon: 'Smartphone' },
    { id: 'browsers', label: 'Browsers', icon: 'Monitor' }
  ];

  const renderTabContent = () => {
    const data = detailedData?.[activeTab] || [];
    
    if (data?.length === 0) {
      return (
        <div className="text-center py-8">
          <Icon name="BarChart3" size={48} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No data available for this metric</p>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {data?.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
                <Icon 
                  name={getIconForTab(activeTab)} 
                  size={16} 
                  className="text-primary" 
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {item?.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {((item?.clicks / detailedData?.totalClicks) * 100)?.toFixed(1)}% of total
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground">
                {item?.clicks?.toLocaleString()}
              </p>
              <div className="w-16 h-1.5 bg-muted rounded-full mt-1">
                <div 
                  className="h-full bg-primary rounded-full"
                  style={{ 
                    width: `${(item?.clicks / Math.max(...data?.map(d => d?.clicks))) * 100}%` 
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const getIconForTab = (tabId) => {
    const iconMap = {
      referrers: 'Globe',
      locations: 'MapPin',
      devices: 'Smartphone',
      browsers: 'Monitor'
    };
    return iconMap?.[tabId] || 'BarChart3';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Detailed Analytics</h2>
          <p className="text-sm text-muted-foreground">
            Breakdown by source, location, and device
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-1 mb-6 bg-muted rounded-lg p-1">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-smooth ${
              activeTab === tab?.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span className="hidden sm:inline">{tab?.label}</span>
          </button>
        ))}
      </div>
      <div className="min-h-[200px]">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default DetailedMetrics;