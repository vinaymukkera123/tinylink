import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LinkPreview = ({ linkData, onCopyLink, onCreateAnother, onViewDashboard }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    await onCopyLink(linkData?.shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateQRCode = (url) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-2">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-success/10 rounded-full mb-4">
          <Icon name="CheckCircle" size={32} className="text-success" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Link Created Successfully!</h2>
        <p className="text-muted-foreground">Your short link is ready to use</p>
      </div>
      {/* Link Details */}
      <div className="space-y-4 mb-6">
        <div className="bg-muted rounded-lg p-4">
          <label className="text-sm font-medium text-muted-foreground block mb-2">Short URL</label>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-background rounded border border-border px-3 py-2">
              <span className="text-foreground font-mono text-sm break-all">{linkData?.shortUrl}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyLink}
              iconName={copied ? "Check" : "Copy"}
              iconSize={16}
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <label className="text-sm font-medium text-muted-foreground block mb-2">Original URL</label>
          <div className="bg-background rounded border border-border px-3 py-2">
            <span className="text-foreground text-sm break-all">{linkData?.originalUrl}</span>
          </div>
        </div>

        {linkData?.linkName && (
          <div className="bg-muted rounded-lg p-4">
            <label className="text-sm font-medium text-muted-foreground block mb-2">Link Name</label>
            <div className="bg-background rounded border border-border px-3 py-2">
              <span className="text-foreground text-sm">{linkData?.linkName}</span>
            </div>
          </div>
        )}
      </div>
      {/* QR Code */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium text-foreground mb-4">QR Code</h3>
        <div className="inline-block bg-white p-4 rounded-lg border border-border">
          <img
            src={generateQRCode(linkData?.shortUrl)}
            alt="QR Code for short link"
            className="w-48 h-48 mx-auto"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="w-48 h-48 bg-muted rounded flex items-center justify-center" style={{ display: 'none' }}>
            <Icon name="QrCode" size={48} className="text-muted-foreground" />
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2">Scan to open the link</p>
      </div>
      {/* Link Statistics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-muted rounded-lg">
          <div className="text-2xl font-bold text-foreground">0</div>
          <div className="text-sm text-muted-foreground">Clicks</div>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <div className="text-2xl font-bold text-foreground">Just now</div>
          <div className="text-sm text-muted-foreground">Created</div>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <div className="text-2xl font-bold text-foreground">Active</div>
          <div className="text-sm text-muted-foreground">Status</div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="default"
          onClick={onViewDashboard}
          iconName="BarChart3"
          iconPosition="left"
          className="flex-1"
        >
          View Dashboard
        </Button>
        
        <Button
          variant="outline"
          onClick={onCreateAnother}
          iconName="Plus"
          iconPosition="left"
          className="flex-1"
        >
          Create Another
        </Button>
      </div>
      {/* Share Options */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Share your link</h4>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(linkData?.shortUrl)}`, '_blank')}
            iconName="Twitter"
            iconSize={16}
          >
            Twitter
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(linkData?.shortUrl)}`, '_blank')}
            iconName="Facebook"
            iconSize={16}
          >
            Facebook
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(linkData?.shortUrl)}`, '_blank')}
            iconName="Linkedin"
            iconSize={16}
          >
            LinkedIn
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LinkPreview;