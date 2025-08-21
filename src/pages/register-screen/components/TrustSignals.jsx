import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const features = [
    {
      icon: 'Shield',
      title: 'Secure & Private',
      description: 'Your data is encrypted and protected with industry-standard security'
    },
    {
      icon: 'BarChart3',
      title: 'Advanced Analytics',
      description: 'Track clicks, locations, and performance with detailed insights'
    },
    {
      icon: 'Zap',
      title: 'Lightning Fast',
      description: 'Create and share shortened links in seconds with instant redirects'
    },
    {
      icon: 'Globe',
      title: 'Global CDN',
      description: 'Fast link redirects worldwide with 99.9% uptime guarantee'
    }
  ];

  const securityBadges = [
    {
      icon: 'Lock',
      text: 'SSL Secured'
    },
    {
      icon: 'Shield',
      text: 'GDPR Compliant'
    },
    {
      icon: 'CheckCircle',
      text: 'SOC 2 Certified'
    }
  ];

  return (
    <div className="hidden lg:block lg:w-1/2 bg-muted/30 p-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4 mx-auto">
            <Icon name="Link" size={32} color="white" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Join Thousands of Users
          </h2>
          <p className="text-muted-foreground">
            Trusted by marketers, creators, and businesses worldwide
          </p>
        </div>

        <div className="space-y-6 mb-8">
          {features?.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg flex-shrink-0">
                <Icon name={feature?.icon} size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">{feature?.title}</h3>
                <p className="text-sm text-muted-foreground">{feature?.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-6">
          <p className="text-sm text-muted-foreground mb-4 text-center">
            Trusted & Secure Platform
          </p>
          <div className="flex items-center justify-center space-x-6">
            {securityBadges?.map((badge, index) => (
              <div key={index} className="flex items-center space-x-1">
                <Icon name={badge?.icon} size={16} className="text-success" />
                <span className="text-xs text-muted-foreground">{badge?.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 p-4 bg-card rounded-lg border border-border">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-foreground">Sarah Johnson</p>
              <p className="text-xs text-muted-foreground">Marketing Director</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground italic">
            "TinyLink has transformed how we track our marketing campaigns. The analytics are incredibly detailed and the platform is so easy to use."
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;