import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RecentLinks = ({ recentLinks, onCopyLink, onViewAnalytics }) => {
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(new Date(date));
  };

  const truncateUrl = (url, maxLength = 40) => {
    if (url?.length <= maxLength) return url;
    return url?.substring(0, maxLength) + '...';
  };

  if (!recentLinks || recentLinks?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Links</h3>
        <div className="text-center py-8">
          <Icon name="Link" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No links created yet</p>
          <p className="text-sm text-muted-foreground mt-1">Your recent short links will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Links</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.location.href = '/dashboard'}
          iconName="ExternalLink"
          iconSize={16}
        >
          View All
        </Button>
      </div>
      <div className="space-y-3">
        {recentLinks?.map((link) => (
          <div
            key={link?.id}
            className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-smooth"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Icon name="Link" size={16} className="text-primary flex-shrink-0" />
                <span className="font-medium text-foreground text-sm truncate">
                  {link?.linkName || 'Untitled Link'}
                </span>
              </div>
              
              <div className="text-xs text-muted-foreground mb-1">
                <span className="font-mono">{truncateUrl(link?.shortUrl)}</span>
              </div>
              
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Icon name="MousePointer" size={12} />
                  {link?.clickCount} clicks
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="Calendar" size={12} />
                  {formatDate(link?.createdAt)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 ml-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onCopyLink(link?.shortUrl)}
                iconName="Copy"
                iconSize={14}
                className="h-8 w-8 p-0"
              />
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewAnalytics(link?.id)}
                iconName="BarChart3"
                iconSize={14}
                className="h-8 w-8 p-0"
              />
            </div>
          </div>
        ))}
      </div>
      {recentLinks?.length >= 5 && (
        <div className="mt-4 pt-4 border-t border-border text-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.href = '/dashboard'}
            iconName="ArrowRight"
            iconPosition="right"
          >
            View All Links
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentLinks;