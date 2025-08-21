import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';

const AnalyticsChart = ({ data, type = 'line' }) => {
  const chartData = [
    { date: '2025-08-14', clicks: 45, day: 'Mon' },
    { date: '2025-08-15', clicks: 52, day: 'Tue' },
    { date: '2025-08-16', clicks: 38, day: 'Wed' },
    { date: '2025-08-17', clicks: 67, day: 'Thu' },
    { date: '2025-08-18', clicks: 84, day: 'Fri' },
    { date: '2025-08-19', clicks: 91, day: 'Sat' },
    { date: '2025-08-20', clicks: 73, day: 'Sun' }
  ];

  const totalClicks = chartData?.reduce((sum, item) => sum + item?.clicks, 0);
  const averageClicks = Math.round(totalClicks / chartData?.length);
  const highestDay = chartData?.reduce((max, item) => item?.clicks > max?.clicks ? item : max, chartData?.[0]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm font-medium text-foreground">{`${label}`}</p>
          <p className="text-sm text-primary">
            {`Clicks: ${payload?.[0]?.value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">7-Day Analytics</h3>
          <p className="text-sm text-muted-foreground">Click performance over the last week</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            className={`p-2 rounded-md transition-smooth ${
              type === 'line' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
            title="Line Chart"
          >
            <Icon name="TrendingUp" size={16} />
          </button>
          <button
            className={`p-2 rounded-md transition-smooth ${
              type === 'bar' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
            title="Bar Chart"
          >
            <Icon name="BarChart3" size={16} />
          </button>
        </div>
      </div>
      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-muted/30 rounded-lg">
          <p className="text-2xl font-bold text-foreground">{totalClicks}</p>
          <p className="text-xs text-muted-foreground">Total Clicks</p>
        </div>
        <div className="text-center p-3 bg-muted/30 rounded-lg">
          <p className="text-2xl font-bold text-foreground">{averageClicks}</p>
          <p className="text-xs text-muted-foreground">Avg per Day</p>
        </div>
        <div className="text-center p-3 bg-muted/30 rounded-lg">
          <p className="text-2xl font-bold text-foreground">{highestDay?.clicks}</p>
          <p className="text-xs text-muted-foreground">Peak Day</p>
        </div>
      </div>
      {/* Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'line' ? (
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="day" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="clicks" 
                stroke="var(--color-primary)" 
                strokeWidth={2}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: 'var(--color-primary)' }}
              />
            </LineChart>
          ) : (
            <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="day" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="clicks" 
                fill="var(--color-primary)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
      {/* Insights */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-success/10 rounded-full">
            <Icon name="TrendingUp" size={16} className="text-success" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Performance Insight</p>
            <p className="text-sm text-muted-foreground">
              Your links performed best on {highestDay?.day} with {highestDay?.clicks} clicks. 
              Weekend traffic shows strong engagement patterns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChart;