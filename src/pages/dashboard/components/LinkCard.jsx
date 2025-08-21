import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const LinkCard = ({ link, onCopyLink, onGenerateQR }) => {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleCopy = async () => {
    await onCopyLink(link?.shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleViewAnalytics = () => {
    navigate('/link-analytics-detail', { state: { linkData: link } });
  };

  const formatDate = (date) => {
    if (!date) return 'Never';
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateUrl = (url, maxLength = 40) => {
    return url?.length > maxLength ? `${url?.substring(0, maxLength)}...` : url;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-1 hover:shadow-elevation-2 transition-smooth">
      {/* Header with title and actions */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-foreground truncate">
            {link?.title || 'Untitled Link'}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Created {formatDate(link?.createdAt)}
          </p>
        </div>
        <div className="flex items-center space-x-2 ml-2">
          <button
            onClick={() => onGenerateQR(link)}
            className="p-1.5 text-muted-foreground hover:text-primary transition-smooth"
            title="Generate QR Code"
          >
            <Icon name="QrCode" size={16} />
          </button>
          <button
            onClick={handleViewAnalytics}
            className="p-1.5 text-muted-foreground hover:text-primary transition-smooth"
            title="View Analytics"
          >
            <Icon name="BarChart3" size={16} />
          </button>
        </div>
      </div>
      {/* URLs */}
      <div className="space-y-2 mb-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Original URL</p>
          <p className="text-sm text-foreground break-all">
            {truncateUrl(link?.originalUrl, 50)}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Short URL</p>
          <div className="flex items-center space-x-2">
            <p className="text-sm text-primary font-medium flex-1">
              {link?.shortUrl}
            </p>
            <button
              onClick={handleCopy}
              className="p-1.5 text-muted-foreground hover:text-primary transition-smooth"
              title="Copy to clipboard"
            >
              <Icon name={copied ? "Check" : "Copy"} size={16} />
            </button>
          </div>
        </div>
      </div>
      {/* Stats */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">{link?.clickCount}</p>
            <p className="text-xs text-muted-foreground">Clicks</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-foreground">{formatDate(link?.lastClicked)}</p>
            <p className="text-xs text-muted-foreground">Last Clicked</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          link?.isActive 
            ? 'bg-success/10 text-success' :'bg-muted text-muted-foreground'
        }`}>
          {link?.isActive ? 'Active' : 'Inactive'}
        </div>
      </div>
    </div>
  );
};

export default LinkCard;