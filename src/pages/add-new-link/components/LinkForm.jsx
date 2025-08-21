import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LinkForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    originalUrl: '',
    customSlug: '',
    linkName: '',
    expirationDate: '',
    clickLimit: ''
  });
  const [errors, setErrors] = useState({});
  const [showAdvanced, setShowAdvanced] = useState(false);

  const validateUrl = (url) => {
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return urlPattern?.test(url);
  };

  const validateCustomSlug = (slug) => {
    if (!slug) return true;
    const slugPattern = /^[a-zA-Z0-9-_]+$/;
    return slugPattern?.test(slug) && slug?.length >= 3 && slug?.length <= 50;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard?.readText();
      if (validateUrl(text)) {
        setFormData(prev => ({
          ...prev,
          originalUrl: text
        }));
        setErrors(prev => ({
          ...prev,
          originalUrl: ''
        }));
      }
    } catch (err) {
      console.log('Failed to read clipboard');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.originalUrl?.trim()) {
      newErrors.originalUrl = 'URL is required';
    } else if (!validateUrl(formData?.originalUrl)) {
      newErrors.originalUrl = 'Please enter a valid URL';
    }

    if (formData?.customSlug && !validateCustomSlug(formData?.customSlug)) {
      newErrors.customSlug = 'Custom slug must be 3-50 characters and contain only letters, numbers, hyphens, and underscores';
    }

    if (formData?.clickLimit && (isNaN(formData?.clickLimit) || parseInt(formData?.clickLimit) < 1)) {
      newErrors.clickLimit = 'Click limit must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Create Short Link</h2>
        <Icon name="Link" size={24} className="text-primary" />
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Original URL Input */}
        <div className="relative">
          <Input
            label="Long URL"
            type="url"
            name="originalUrl"
            placeholder="https://example.com/very-long-url"
            value={formData?.originalUrl}
            onChange={handleInputChange}
            error={errors?.originalUrl}
            required
            description="Enter the URL you want to shorten"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handlePaste}
            className="absolute right-2 top-8"
            iconName="Clipboard"
            iconSize={16}
          >
            Paste
          </Button>
        </div>

        {/* Custom Slug */}
        <Input
          label="Custom Slug (Optional)"
          type="text"
          name="customSlug"
          placeholder="my-custom-link"
          value={formData?.customSlug}
          onChange={handleInputChange}
          error={errors?.customSlug}
          description="Create a custom short URL ending (3-50 characters)"
        />

        {/* Link Name */}
        <Input
          label="Link Name (Optional)"
          type="text"
          name="linkName"
          placeholder="My Campaign Link"
          value={formData?.linkName}
          onChange={handleInputChange}
          description="Give your link a memorable name for easy identification"
        />

        {/* Advanced Options Toggle */}
        <div className="border-t border-border pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setShowAdvanced(!showAdvanced)}
            iconName={showAdvanced ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            className="mb-4"
          >
            Advanced Options
          </Button>

          {showAdvanced && (
            <div className="space-y-4 pl-4 border-l-2 border-muted">
              <Input
                label="Expiration Date (Optional)"
                type="date"
                name="expirationDate"
                value={formData?.expirationDate}
                onChange={handleInputChange}
                description="Set when this link should expire"
              />

              <Input
                label="Click Limit (Optional)"
                type="number"
                name="clickLimit"
                placeholder="1000"
                value={formData?.clickLimit}
                onChange={handleInputChange}
                error={errors?.clickLimit}
                description="Maximum number of clicks allowed"
                min="1"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            type="submit"
            variant="default"
            loading={isLoading}
            iconName="Link"
            iconPosition="left"
            className="flex-1"
          >
            Create Short Link
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setFormData({
                originalUrl: '',
                customSlug: '',
                linkName: '',
                expirationDate: '',
                clickLimit: ''
              });
              setErrors({});
            }}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LinkForm;