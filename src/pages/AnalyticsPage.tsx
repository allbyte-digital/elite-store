import React from 'react';
import { DollarSign, ShoppingCart, Users, TrendingUp } from 'lucide-react';
import { MetricCard } from '../components/analytics/MetricCard';
import { Chart } from '../components/analytics/Chart';
import { mockAnalytics } from '../data/mockData';

export function AnalyticsPage() {
  const analytics = mockAnalytics;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Monitor your business performance and key metrics</p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Revenue"
            value={`$${analytics.revenue.total.toLocaleString()}`}
            change={analytics.revenue.change}
            icon={<DollarSign className="h-6 w-6" />}
            color="green"
          />
          <MetricCard
            title="Total Orders"
            value={analytics.orders.total.toLocaleString()}
            change={analytics.orders.change}
            icon={<ShoppingCart className="h-6 w-6" />}
            color="blue"
          />
          <MetricCard
            title="Total Customers"
            value={analytics.customers.total.toLocaleString()}
            change={analytics.customers.change}
            icon={<Users className="h-6 w-6" />}
            color="purple"
          />
          <MetricCard
            title="Avg. Order Value"
            value={`$${(analytics.revenue.total / analytics.orders.total).toFixed(2)}`}
            change={4.2}
            icon={<TrendingUp className="h-6 w-6" />}
            color="orange"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Chart
            data={analytics.revenue.data}
            title="Revenue Trend"
            color="#059669"
          />
          <Chart
            data={analytics.orders.data}
            title="Orders Trend"
            type="bar"
            color="#2563EB"
          />
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performing Products</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Product</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">Sales</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">Revenue</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">Growth</th>
                </tr>
              </thead>
              <tbody>
                {analytics.topProducts.map((product, index) => (
                  <tr key={product.id} className="border-b border-gray-100">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="font-medium text-gray-900">{product.name}</span>
                      </div>
                    </td>
                    <td className="text-right py-4 px-4 text-gray-900">
                      {product.sales}
                    </td>
                    <td className="text-right py-4 px-4 text-gray-900">
                      ${product.revenue.toLocaleString()}
                    </td>
                    <td className="text-right py-4 px-4">
                      <span className="text-green-600 font-medium">
                        +{(Math.random() * 20 + 5).toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}