import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const QRCodeSection = ({ shortUrl }) => {
  const [qrSize, setQrSize] = useState('medium');
  
  const qrSizes = [
    { value: 'small', label: 'Small', size: '150x150' },
    { value: 'medium', label: 'Medium', size: '250x250' },
    { value: 'large', label: 'Large', size: '350x350' }
  ];

  const getQRSize = () => {
    const sizeMap = {
      small: 150,
      medium: 250,
      large: 350
    };
    return sizeMap?.[qrSize];
  };

  const handleDownloadQR = () => {
    // Mock download functionality
    const link = document.createElement('a');
    link.download = `qr-code-${Date.now()}.png`;
    link.href = `https://api.qrserver.com/v1/create-qr-code/?size=${getQRSize()}x${getQRSize()}&data=${encodeURIComponent(shortUrl)}`;
    link?.click();
  };

  const handleShareQR = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'QR Code for Link',
          text: 'Scan this QR code to access the link',
          url: shortUrl
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        <div className="flex-1">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-foreground mb-2">QR Code</h2>
            <p className="text-sm text-muted-foreground">
              Generate and download QR code for offline sharing
            </p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                QR Code Size
              </label>
              <div className="flex flex-wrap gap-2">
                {qrSizes?.map((size) => (
                  <button
                    key={size?.value}
                    onClick={() => setQrSize(size?.value)}
                    className={`px-3 py-2 text-xs font-medium rounded-md border transition-smooth ${
                      qrSize === size?.value
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background text-foreground border-border hover:bg-muted'
                    }`}
                  >
                    {size?.label}
                    <span className="block text-xs opacity-70">{size?.size}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="default"
                iconName="Download"
                iconPosition="left"
                onClick={handleDownloadQR}
                className="flex-1"
              >
                Download QR
              </Button>
              <Button
                variant="outline"
                iconName="Share"
                iconPosition="left"
                onClick={handleShareQR}
                className="flex-1"
              >
                Share QR
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center lg:justify-end">
          <div className="bg-white p-4 rounded-lg border border-border shadow-elevation-1">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=${getQRSize()}x${getQRSize()}&data=${encodeURIComponent(shortUrl)}`}
              alt="QR Code for shortened link"
              className="block"
              style={{ width: getQRSize(), height: getQRSize() }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeSection;