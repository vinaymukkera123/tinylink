import React, { useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QRCodeModal = ({ isOpen, onClose, link }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e?.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef?.current && !modalRef?.current?.contains(e?.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const downloadQR = () => {
    // Mock QR code download functionality
    const canvas = document.createElement('canvas');
    const ctx = canvas?.getContext('2d');
    canvas.width = 256;
    canvas.height = 256;
    
    // Create a simple QR-like pattern
    ctx.fillStyle = '#000000';
    for (let i = 0; i < 16; i++) {
      for (let j = 0; j < 16; j++) {
        if (Math.random() > 0.5) {
          ctx?.fillRect(i * 16, j * 16, 16, 16);
        }
      }
    }
    
    const dataURL = canvas?.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = dataURL;
    downloadLink.download = `qr-code-${link?.title || 'link'}.png`;
    downloadLink?.click();
  };

  const copyQRLink = async () => {
    if (link?.shortUrl) {
      try {
        await navigator.clipboard?.writeText(link?.shortUrl);
        // You could add a toast notification here
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
    }
  };

  if (!isOpen || !link) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-card border border-border rounded-lg shadow-elevation-4 w-full max-w-md"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">QR Code</h2>
          <button
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground transition-smooth rounded-md hover:bg-muted"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            {/* Mock QR Code */}
            <div className="inline-block p-4 bg-white border-2 border-border rounded-lg shadow-elevation-1">
              <div className="w-48 h-48 bg-gradient-to-br from-foreground to-muted-foreground opacity-90 rounded-md flex items-center justify-center">
                <div className="grid grid-cols-8 gap-1 w-40 h-40">
                  {Array.from({ length: 64 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 ${
                        Math.random() > 0.5 ? 'bg-black' : 'bg-white'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Link Info */}
          <div className="mb-6">
            <p className="text-sm font-medium text-foreground mb-2">
              {link?.title || 'Untitled Link'}
            </p>
            <div className="flex items-center space-x-2 p-3 bg-muted rounded-md">
              <p className="text-sm text-primary font-medium flex-1 truncate">
                {link?.shortUrl}
              </p>
              <button
                onClick={copyQRLink}
                className="p-1 text-muted-foreground hover:text-primary transition-smooth"
                title="Copy link"
              >
                <Icon name="Copy" size={16} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={downloadQR}
              iconName="Download"
              iconPosition="left"
              className="flex-1"
            >
              Download
            </Button>
            <Button
              variant="default"
              onClick={copyQRLink}
              iconName="Copy"
              iconPosition="left"
              className="flex-1"
            >
              Copy Link
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;