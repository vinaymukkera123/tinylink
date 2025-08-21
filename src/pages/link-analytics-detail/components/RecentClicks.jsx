import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentClicks = ({ recentClicks }) => {
  const [showAll, setShowAll] = useState(false);
  const displayClicks = showAll ? recentClicks : recentClicks?.slice(0, 10);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const clickTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - clickTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getReferrerIcon = (referrer) => {
    if (referrer?.includes('google')) return 'Search';
    if (referrer?.includes('facebook') || referrer?.includes('twitter') || referrer?.includes('linkedin')) return 'Share2';
    if (referrer?.includes('direct')) return 'MousePointer';
    return 'Globe';
  };

  const getLocationFlag = (country) => {
    const flagMap = {
      'United States': '🇺🇸',
      'United Kingdom': '🇬🇧',
      'Canada': '🇨🇦',
      'Germany': '🇩🇪',
      'France': '🇫🇷',
      'India': '🇮🇳',
      'Australia': '🇦🇺',
      'Japan': '🇯🇵'
    };
    return flagMap?.[country] || '🌍';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Recent Clicks</h2>
          <p className="text-sm text-muted-foreground">
            Latest {recentClicks?.length} clicks on your link
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="RefreshCw"
          iconPosition="left"
        >
          Refresh
        </Button>
      </div>
      {recentClicks?.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="MousePointer" size={48} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No clicks recorded yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Share your link to start seeing analytics
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {displayClicks?.map((click, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth">
                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                  <Icon 
                    name={getReferrerIcon(click?.referrer)} 
                    size={16} 
                    className="text-primary" 
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-foreground truncate">
                      {click?.referrer === 'Direct' ? 'Direct access' : click?.referrer}
                    </p>
                    <span className="text-lg">{getLocationFlag(click?.location)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="MapPin" size={12} />
                      {click?.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Smartphone" size={12} />
                      {click?.device}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Monitor" size={12} />
                      {click?.browser}
                    </span>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">
                    {formatTimeAgo(click?.timestamp)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(click.timestamp)?.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {recentClicks?.length > 10 && (
            <div className="text-center mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAll(!showAll)}
                iconName={showAll ? "ChevronUp" : "ChevronDown"}
                iconPosition="right"
              >
                {showAll ? 'Show Less' : `Show All ${recentClicks?.length} Clicks`}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RecentClicks;