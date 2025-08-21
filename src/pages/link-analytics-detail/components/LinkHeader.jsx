import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LinkHeader = ({ linkData }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard?.writeText(linkData?.shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <Icon name="Link" size={20} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-semibold text-foreground truncate">
                {linkData?.customName || 'Shortened Link'}
              </h1>
              <p className="text-sm text-muted-foreground">
                Created on {linkData?.createdAt}
              </p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <Icon name="Link2" size={16} className="text-muted-foreground flex-shrink-0" />
              <span className="text-sm font-mono text-primary truncate">
                {linkData?.shortUrl}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyLink}
                iconName={copied ? "Check" : "Copy"}
                iconSize={16}
                className="ml-auto flex-shrink-0"
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            
            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
              <Icon name="ExternalLink" size={16} className="text-muted-foreground flex-shrink-0" />
              <span className="text-sm text-foreground truncate">
                {linkData?.originalUrl}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 lg:flex-col lg:items-end">
          <Button
            variant="outline"
            iconName="Edit"
            iconPosition="left"
            size="sm"
          >
            Edit Link
          </Button>
          <Button
            variant="outline"
            iconName="Share"
            iconPosition="left"
            size="sm"
          >
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LinkHeader;