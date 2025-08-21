import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const LinksTable = ({ links, onCopyLink, onGenerateQR }) => {
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [copied, setCopied] = useState(null);
  const navigate = useNavigate();

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleCopy = async (shortUrl, linkId) => {
    await onCopyLink(shortUrl);
    setCopied(linkId);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleViewAnalytics = (link) => {
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

  const truncateUrl = (url, maxLength = 60) => {
    return url?.length > maxLength ? `${url?.substring(0, maxLength)}...` : url;
  };

  const sortedLinks = [...links]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];

    if (sortField === 'createdAt' || sortField === 'lastClicked') {
      aValue = new Date(aValue || 0);
      bValue = new Date(bValue || 0);
    }

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const SortIcon = ({ field }) => {
    if (sortField !== field) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return (
      <Icon 
        name={sortDirection === 'asc' ? "ArrowUp" : "ArrowDown"} 
        size={14} 
        className="text-primary" 
      />
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('title')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Title</span>
                  <SortIcon field="title" />
                </button>
              </th>
              <th className="text-left p-4">
                <span className="text-sm font-medium text-foreground">Original URL</span>
              </th>
              <th className="text-left p-4">
                <span className="text-sm font-medium text-foreground">Short URL</span>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('clickCount')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Clicks</span>
                  <SortIcon field="clickCount" />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('lastClicked')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Last Clicked</span>
                  <SortIcon field="lastClicked" />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('createdAt')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Created</span>
                  <SortIcon field="createdAt" />
                </button>
              </th>
              <th className="text-center p-4">
                <span className="text-sm font-medium text-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedLinks?.map((link, index) => (
              <tr 
                key={link?.id} 
                className={`border-b border-border hover:bg-muted/30 transition-smooth ${
                  index % 2 === 0 ? 'bg-background' : 'bg-muted/10'
                }`}
              >
                <td className="p-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {link?.title || 'Untitled Link'}
                    </p>
                    <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                      link?.isActive 
                        ? 'bg-success/10 text-success' :'bg-muted text-muted-foreground'
                    }`}>
                      {link?.isActive ? 'Active' : 'Inactive'}
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <p className="text-sm text-foreground" title={link?.originalUrl}>
                    {truncateUrl(link?.originalUrl)}
                  </p>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-primary font-medium">
                      {link?.shortUrl}
                    </p>
                    <button
                      onClick={() => handleCopy(link?.shortUrl, link?.id)}
                      className="p-1 text-muted-foreground hover:text-primary transition-smooth"
                      title="Copy to clipboard"
                    >
                      <Icon name={copied === link?.id ? "Check" : "Copy"} size={14} />
                    </button>
                  </div>
                </td>
                <td className="p-4">
                  <p className="text-sm font-semibold text-foreground">{link?.clickCount}</p>
                </td>
                <td className="p-4">
                  <p className="text-sm text-foreground">{formatDate(link?.lastClicked)}</p>
                </td>
                <td className="p-4">
                  <p className="text-sm text-muted-foreground">{formatDate(link?.createdAt)}</p>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => onGenerateQR(link)}
                      className="p-2 text-muted-foreground hover:text-primary transition-smooth"
                      title="Generate QR Code"
                    >
                      <Icon name="QrCode" size={16} />
                    </button>
                    <button
                      onClick={() => handleViewAnalytics(link)}
                      className="p-2 text-muted-foreground hover:text-primary transition-smooth"
                      title="View Analytics"
                    >
                      <Icon name="BarChart3" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LinksTable;