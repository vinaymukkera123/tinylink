import React from 'react';
import Icon from '../../../components/AppIcon';

const DashboardStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Links',
      value: stats?.totalLinks,
      icon: 'Link',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Total Clicks',
      value: stats?.totalClicks,
      icon: 'MousePointer',
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Active Links',
      value: stats?.activeLinks,
      icon: 'Activity',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      change: '+5%',
      changeType: 'positive'
    },
    {
      title: 'Avg. CTR',
      value: `${stats?.averageCTR}%`,
      icon: 'TrendingUp',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      change: '+2.3%',
      changeType: 'positive'
    }
  ];

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000)?.toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000)?.toFixed(1) + 'K';
    }
    return num?.toString();
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards?.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-smooth"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {stat?.title}
              </p>
              <p className="text-2xl font-bold text-foreground">
                {typeof stat?.value === 'number' ? formatNumber(stat?.value) : stat?.value}
              </p>
              <div className="flex items-center mt-2">
                <Icon 
                  name={stat?.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                  size={14} 
                  className={stat?.changeType === 'positive' ? 'text-success' : 'text-destructive'} 
                />
                <span className={`text-xs font-medium ml-1 ${
                  stat?.changeType === 'positive' ? 'text-success' : 'text-destructive'
                }`}>
                  {stat?.change}
                </span>
                <span className="text-xs text-muted-foreground ml-1">vs last month</span>
              </div>
            </div>
            <div className={`p-3 rounded-full ${stat?.bgColor}`}>
              <Icon name={stat?.icon} size={24} className={stat?.color} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;