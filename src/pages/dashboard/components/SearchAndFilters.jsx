import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SearchAndFilters = ({ onSearch, onFilter, totalLinks }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  const statusOptions = [
    { value: 'all', label: 'All Links' },
    { value: 'active', label: 'Active Links' },
    { value: 'inactive', label: 'Inactive Links' }
  ];

  const sortOptions = [
    { value: 'createdAt', label: 'Date Created' },
    { value: 'clickCount', label: 'Click Count' },
    { value: 'lastClicked', label: 'Last Clicked' },
    { value: 'title', label: 'Title' }
  ];

  const sortOrderOptions = [
    { value: 'desc', label: 'Descending' },
    { value: 'asc', label: 'Ascending' }
  ];

  const handleSearch = (e) => {
    const value = e?.target?.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleStatusFilter = (value) => {
    setStatusFilter(value);
    onFilter({ status: value, sortBy, sortOrder });
  };

  const handleSortBy = (value) => {
    setSortBy(value);
    onFilter({ status: statusFilter, sortBy: value, sortOrder });
  };

  const handleSortOrder = (value) => {
    setSortOrder(value);
    onFilter({ status: statusFilter, sortBy, sortOrder: value });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setSortBy('createdAt');
    setSortOrder('desc');
    onSearch('');
    onFilter({ status: 'all', sortBy: 'createdAt', sortOrder: 'desc' });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6 shadow-elevation-1">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <Input
              type="text"
              placeholder="Search links by title or URL..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={handleStatusFilter}
            placeholder="Filter by status"
            className="min-w-[140px]"
          />
          
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={handleSortBy}
            placeholder="Sort by"
            className="min-w-[140px]"
          />
          
          <Select
            options={sortOrderOptions}
            value={sortOrder}
            onChange={handleSortOrder}
            placeholder="Order"
            className="min-w-[120px]"
          />

          <Button
            variant="outline"
            onClick={clearFilters}
            iconName="X"
            iconPosition="left"
            className="whitespace-nowrap"
          >
            Clear
          </Button>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Showing {totalLinks} {totalLinks === 1 ? 'link' : 'links'}
          {searchTerm && (
            <span> matching "{searchTerm}"</span>
          )}
        </p>
        
        {(searchTerm || statusFilter !== 'all') && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Reset filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilters;