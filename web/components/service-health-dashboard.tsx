'use client';

import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { CheckCircle, XCircle, AlertTriangle, RefreshCw } from 'lucide-react';

const HEALTH_CHECK_QUERY = gql`
  query HealthCheck {
    healthCheck {
      customer
      delivery
    }
  }
`;

type ServiceStatus = 'healthy' | 'degraded' | 'unhealthy';

interface HealthCheckData {
  healthCheck: {
    customer: ServiceStatus;
    delivery: ServiceStatus;
  };
}

export function ServiceHealthDashboardComponent() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { loading, error, data, refetch } = useQuery<HealthCheckData>(
    HEALTH_CHECK_QUERY,
    {
      pollInterval: 30000, // Poll every 30 seconds
    },
  );

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  const uptimeData = [
    { name: 'Mon', value: 100 },
    { name: 'Tue', value: 98 },
    { name: 'Wed', value: 100 },
    { name: 'Thu', value: 99 },
    { name: 'Fri', value: 100 },
    { name: 'Sat', value: 100 },
    { name: 'Sun', value: 100 },
  ];

  const getServiceStatus = (status: ServiceStatus) => {
    switch (status) {
      case 'healthy':
        return {
          status: 'Operational',
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
        };
      case 'degraded':
        return {
          status: 'Degraded',
          icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
        };
      case 'unhealthy':
        return {
          status: 'Down',
          icon: <XCircle className="h-5 w-5 text-red-500" />,
        };
    }
  };

  const services = [
    {
      name: 'Customer Service',
      ...getServiceStatus(data?.healthCheck.customer || 'unhealthy'),
      uptime: '99.95%',
      responseTime: '120ms',
      healthResponse: data?.healthCheck.customer || 'unhealthy',
    },
    {
      name: 'Delivery Service',
      ...getServiceStatus(data?.healthCheck.delivery || 'unhealthy'),
      uptime: '99.5%',
      responseTime: '350ms',
      healthResponse: data?.healthCheck.delivery || 'unhealthy',
    },
    // {
    //   name: 'Gitspark',
    //   status: 'Operational',
    //   uptime: '99.99%',
    //   responseTime: '45ms',
    // },
    // {
    //   name: 'Authentication',
    //   status: 'Operational',
    //   uptime: '99.95%',
    //   responseTime: '120ms',
    // },
    // {
    //   name: 'Database',
    //   status: 'Operational',
    //   uptime: '99.99%',
    //   responseTime: '15ms',
    // },
    // {
    //   name: 'Storage',
    //   status: 'Operational',
    //   uptime: '99.99%',
    //   responseTime: '25ms',
    // },
  ];

  const incidents = [
    {
      date: '2023-05-15',
      service: 'API Gateway',
      description: 'Intermittent high latency',
      status: 'Resolved',
    },
    {
      date: '2023-05-10',
      service: 'Authentication',
      description: 'Brief outage during deployment',
      status: 'Resolved',
    },
    {
      date: '2023-05-05',
      service: 'Gitspark',
      description: 'Scheduled maintenance',
      status: 'Completed',
    },
  ];

  const overallStatus = services.every(
    (service) => service.status === 'Operational',
  )
    ? 'All Systems Operational'
    : 'Service Disruption';

  if (loading)
    return (
      <p className="text-center py-4 font-mono">Loading health status</p>
    );

  return (
    <div
      className={`min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white`}
    >
      <div className="container mx-auto p-4">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Service Health Dashboard </h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <Switch
                id="dark-mode"
                checked={isDarkMode}
                onCheckedChange={toggleDarkMode}
              />
            </div>
            <Button variant="outline" onClick={() => refetch()}>
              <RefreshCw className="w-6 h-6" />
            </Button>
          </div>
        </header>

        {error ? (
          <Card className="mb-8 dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-red-500">
                Error
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">
                Failed to fetch health status: {error.message}
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="mb-8 dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Current Status:{' '}
                  <span
                    className={
                      overallStatus === 'All Systems Operational'
                        ? 'text-green-500'
                        : 'text-yellow-500'
                    }
                  >
                    {overallStatus}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">
                  {overallStatus === 'All Systems Operational'
                    ? 'All services are running normally. There are no known issues at this time.'
                    : 'We are currently experiencing issues with one or more services. Our team is working on resolving them.'}
                </p>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2 mb-8">
              <Card className="dark:bg-gray-800">
                <CardHeader>
                  <CardTitle>7-Day Uptime</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={uptimeData}>
                      <XAxis
                        dataKey="name"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}%`}
                        domain={[95, 100]}
                      />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#22c55e"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card className="dark:bg-gray-800">
                <CardHeader>
                  <CardTitle>Service Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {services.map((service, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <h3 className="font-medium">{service.name}</h3>
                          <p
                            className={`text-sm ${
                              service.status === 'Operational'
                                ? 'text-green-500'
                                : service.status === 'Degraded'
                                  ? 'text-yellow-500'
                                  : 'text-red-500'
                            }`}
                          >
                            {service.status}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{service.uptime}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {service.healthResponse}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle>Recent Incidents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {incidents.map((incident, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{incident.service}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {incident.date}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            incident.status === 'Resolved'
                              ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                          }`}
                        >
                          {incident.status}
                        </span>
                      </div>
                      <p className="mt-2 text-sm">{incident.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-8 dark:bg-gray-800">
              <CardHeader>
                <CardTitle>Gitspark Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">Operational</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Last checked: 2 minutes ago
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-medium">99.99% uptime</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      45ms average response time
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Current Performance</h4>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      className="bg-green-600 h-2.5 rounded-full"
                      style={{ width: '99.99%' }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
