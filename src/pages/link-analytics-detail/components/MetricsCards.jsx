import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCards = ({ metrics }) => {
  const cards = [
    {
      title: 'Total Clicks',
      value: metrics?.totalClicks?.toLocaleString(),
      icon: 'MousePointer',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Today\'s Clicks',
      value: metrics?.todayClicks?.toLocaleString(),
      icon: 'TrendingUp',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'This Week',
      value: metrics?.weekClicks?.toLocaleString(),
      icon: 'Calendar',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'Last Click',
      value: metrics?.lastClick,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards?.map((card, index) => (
        <div key={index} className="bg-card rounded-lg border border-border p-4 shadow-elevation-1">
          <div className="flex items-center gap-3">
            <div className={`flex items-center justify-center w-10 h-10 ${card?.bgColor} rounded-lg`}>
              <Icon name={card?.icon} size={20} className={card?.color} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground">{card?.title}</p>
              <p className="text-lg font-semibold text-foreground truncate">
                {card?.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsCards;