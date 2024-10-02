"use client"

import { useState, useMemo, useEffect } from "react"
import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  BellIcon,
  ChefHatIcon,
  ClipboardListIcon,
  TruckIcon,
  UsersIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  SearchIcon,
  LayoutDashboardIcon,
  SettingsIcon,
} from "lucide-react"
import { useQuery, gql } from "@apollo/client"
import { formatDistanceToNow, parseISO } from "date-fns"

// Define types
type OrderStatus =
  | "PROCESSING"
  | "SHIPPED"
  | "COMPLETED"
  | "PENDING"
  | "CANCELLED"

interface OrderItem {
  id: string
  name: string
}

interface Order {
  id: string
  status: OrderStatus
  customer_id: string
  createdAt: string
  updatedAt: string
  eta: string
  order_items: OrderItem[]
}

interface OrdersData {
  orders: Order[]
}

const ORDERS_QUERY = gql`
  query GetOrders {
    orders {
      id
      customer_id
      createdAt
      updatedAt
      eta
      status
      order_items {
        id
        name
      }
    }
  }
`

// Add this helper function before the LiveKitchen component
function formatETA(eta: string): string {
  try {
    const etaDate = parseISO(eta)
    const now = new Date()
    if (etaDate < now) {
      return "Overdue"
    }
    return formatDistanceToNow(etaDate, { addSuffix: true })
  } catch (error) {
    console.error("Error parsing ETA:", error)
    return "Invalid ETA"
  }
}

export function LiveKitchen() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [orderSearch, setOrderSearch] = useState("")
  const [orderStatusFilter, setOrderStatusFilter] = useState("all")
  const [deliverySearch, setDeliverySearch] = useState("")
  const [deliveryStatusFilter, setDeliveryStatusFilter] = useState("all")
  const [orders, setOrders] = useState<Order[]>([])

  const { data, loading, error } = useQuery<OrdersData>(ORDERS_QUERY, {
    pollInterval: 30000, // Poll every 30 seconds
  })

  useEffect(() => {
    if (data && data.orders) {
      setOrders(data.orders)
    }
  }, [data])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.remove("dark")
    } else {
      document.documentElement.classList.add("dark")
    }
  }

  const orderData = [
    { time: "12:00", pending: 20, preparing: 15, ready: 10 },
    { time: "13:00", pending: 25, preparing: 18, ready: 12 },
    { time: "14:00", pending: 30, preparing: 20, ready: 15 },
    { time: "15:00", pending: 22, preparing: 16, ready: 18 },
    { time: "16:00", pending: 28, preparing: 22, ready: 20 },
    { time: "17:00", pending: 35, preparing: 25, ready: 22 },
  ]

  const kitchenLoad = [
    { name: "Grill", value: 80 },
    { name: "Fry", value: 70 },
    { name: "Salad", value: 50 },
    { name: "Dessert", value: 30 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  const deliveryQueue = useMemo(() => {
    return [
      {
        id: "DEL001",
        address: "123 Main St",
        status: "In Transit",
        eta: "10 min",
        items: "Burger, Fries",
        driver: "John D.",
      },
      {
        id: "DEL002",
        address: "456 Elm St",
        status: "Delayed",
        eta: "25 min",
        items: "Pizza, Salad",
        driver: "Sarah M.",
      },
      {
        id: "DEL003",
        address: "789 Oak St",
        status: "Delivered",
        eta: "0 min",
        items: "Sushi Platter",
        driver: "Mike L.",
      },
      {
        id: "DEL004",
        address: "321 Pine St",
        status: "Cancelled",
        eta: "N/A",
        items: "Steak, Mashed Potatoes",
        driver: "Emily R.",
      },
      {
        id: "DEL005",
        address: "654 Maple St",
        status: "Preparing",
        eta: "15 min",
        items: "Pasta, Garlic Bread",
        driver: "David S.",
      },
    ]
  }, [])

  const uniqueStatuses = useMemo(() => {
    return Array.from(new Set(orders.map((order) => order.status)))
  }, [orders])

  const filteredOrderQueue = useMemo(() => {
    return orders.filter(
      (order) =>
        (order.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
          order?.customer_id
            ?.toLowerCase()
            .includes(orderSearch.toLowerCase()) ||
          order?.order_items?.some((item) =>
            item.name.toLowerCase().includes(orderSearch.toLowerCase())
          )) &&
        (orderStatusFilter === "all" || order.status === orderStatusFilter)
    )
  }, [orders, orderSearch, orderStatusFilter])

  const filteredDeliveryQueue = useMemo(() => {
    return deliveryQueue.filter(
      (delivery) =>
        (delivery.id.toLowerCase().includes(deliverySearch.toLowerCase()) ||
          delivery.address
            .toLowerCase()
            .includes(deliverySearch.toLowerCase()) ||
          delivery.items.toLowerCase().includes(deliverySearch.toLowerCase()) ||
          delivery.driver
            .toLowerCase()
            .includes(deliverySearch.toLowerCase())) &&
        (deliveryStatusFilter === "all" ||
          delivery.status === deliveryStatusFilter)
    )
  }, [deliveryQueue, deliverySearch, deliveryStatusFilter])

  const totalOrders = orders.length;
  const previousTotalOrders = useMemo(() => {
    // This is a placeholder. In a real scenario, you'd compare with historical data
    return totalOrders - Math.floor(Math.random() * 10); // Simulating a difference
  }, [totalOrders]);

  const orderPercentageChange = previousTotalOrders 
    ? ((totalOrders - previousTotalOrders) / previousTotalOrders) * 100 
    : 0;

  return (
    <div
      className={`flex h-screen bg-gray-100 text-gray-900 ${
        isDarkMode ? "dark" : ""
      }`}
    >
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-blue-600 mb-8">
            Live Kitchen
          </h1>
          <nav className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600 hover:text-blue-600 hover:bg-blue-50"
            >
              <LayoutDashboardIcon className="mr-2 h-5 w-5" />
              Dashboard
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600 hover:text-blue-600 hover:bg-blue-50"
            >
              <ChefHatIcon className="mr-2 h-5 w-5" />
              Kitchen Status
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600 hover:text-blue-600 hover:bg-blue-50"
            >
              <ClipboardListIcon className="mr-2 h-5 w-5" />
              Order Queue
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600 hover:text-blue-600 hover:bg-blue-50"
            >
              <TruckIcon className="mr-2 h-5 w-5" />
              Delivery Queue
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600 hover:text-blue-600 hover:bg-blue-50"
            >
              <UsersIcon className="mr-2 h-5 w-5" />
              Staff Queue
            </Button>
          </nav>
        </div>
        <div className="absolute bottom-0 w-64 p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-600 hover:text-blue-600 hover:bg-blue-50"
          >
            <SettingsIcon className="mr-2 h-5 w-5" />
            Settings
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-900">
              Dashboard Overview
            </h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="dark-mode" className="text-sm text-gray-600">
                  Dark Mode
                </Label>
                <Switch
                  id="dark-mode"
                  checked={isDarkMode}
                  onCheckedChange={toggleDarkMode}
                />
              </div>
              <Button
                variant="outline"
                className="text-gray-600 border-gray-300 hover:bg-gray-100"
              >
                <BellIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Orders
                </CardTitle>
                <ClipboardListIcon className="h-5 w-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{totalOrders}</div>
                <p className="text-xs text-gray-500">
                  {orderPercentageChange > 0 ? '+' : ''}
                  {orderPercentageChange.toFixed(1)}% from last hour
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Avg. Preparation Time
                </CardTitle>
                <ChefHatIcon className="h-5 w-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">18 min</div>
                <p className="text-xs text-gray-500">-2 min from last hour</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Active Deliveries
                </CardTitle>
                <TruckIcon className="h-5 w-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">32</div>
                <p className="text-xs text-gray-500">+5 from last hour</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Staff on Duty
                </CardTitle>
                <UsersIcon className="h-5 w-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">18</div>
                <p className="text-xs text-gray-500">Full capacity</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Order Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={orderData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="pending" stackId="a" fill="#3B82F6" />
                    <Bar dataKey="preparing" stackId="a" fill="#10B981" />
                    <Bar dataKey="ready" stackId="a" fill="#F59E0B" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Kitchen Load
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={kitchenLoad}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {kitchenLoad.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Order Queue */}
          <Card className="bg-white shadow-sm mb-8">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Order Queue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="relative">
                  <SearchIcon className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search orders..."
                    className="pl-9 pr-4 py-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                  />
                </div>
                <Select
                  value={orderStatusFilter}
                  onValueChange={setOrderStatusFilter}
                >
                  <SelectTrigger className="w-[180px] border-gray-300">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    {uniqueStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="overflow-x-auto">
                {loading ? (
                  <p>Loading orders...</p>
                ) : error ? (
                  <p>Error loading orders: {error.message}</p>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 text-sm font-semibold text-gray-600">
                          Order ID
                        </th>
                        <th className="text-left p-2 text-sm font-semibold text-gray-600">
                          Customer ID
                        </th>
                        <th className="text-left p-2 text-sm font-semibold text-gray-600">
                          Items
                        </th>
                        <th className="text-left p-2 text-sm font-semibold text-gray-600">
                          Status
                        </th>
                        <th className="text-left p-2 text-sm font-semibold text-gray-600">
                          ETA
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrderQueue.map((order) => (
                        <tr key={order.id} className="border-b">
                          <td className="p-2 text-sm text-gray-900">
                            {order.id}
                          </td>
                          <td className="p-2 text-sm text-gray-900">
                            {order.customer_id}
                          </td>
                          <td className="p-2 text-sm text-gray-900">
                            {order.order_items
                              .map((item) => item.name)
                              .join(", ")}
                          </td>
                          <td className="p-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                order.status === "PROCESSING"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : order.status === "PENDING"
                                  ? "bg-blue-100 text-blue-800"
                                  : order.status === "SHIPPED"
                                  ? "bg-orange-100 text-orange-800"
                                  : order.status === "COMPLETED"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "CANCELLED"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="p-2 text-sm text-gray-900">
                            {formatETA(order.eta)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Delivery Queue */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Delivery Queue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="list" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="map" className="text-sm">
                    Map View
                  </TabsTrigger>
                  <TabsTrigger value="list" className="text-sm">
                    List View
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="map">
                  <div className="aspect-video bg-gray-200 rounded-md flex items-center justify-center">
                    <MapPinIcon className="h-12 w-12 text-gray-400" />
                    <span className="ml-2 text-gray-500">
                      Map View (Integration required)
                    </span>
                  </div>
                </TabsContent>
                <TabsContent value="list">
                  <div className="flex justify-between items-center mb-4">
                    <div className="relative">
                      <SearchIcon className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
                      <Input
                        placeholder="Search deliveries..."
                        className="pl-9 pr-4 py-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        value={deliverySearch}
                        onChange={(e) => setDeliverySearch(e.target.value)}
                      />
                    </div>
                    <Select
                      value={deliveryStatusFilter}
                      onValueChange={setDeliveryStatusFilter}
                    >
                      <SelectTrigger className="w-[180px] border-gray-300">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="In Transit">In Transit</SelectItem>
                        <SelectItem value="Delayed">Delayed</SelectItem>
                        <SelectItem value="Delivered">Delivered</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                        <SelectItem value="Preparing">Preparing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2 text-sm font-semibold text-gray-600">
                            Order ID
                          </th>
                          <th className="text-left p-2 text-sm font-semibold text-gray-600">
                            Address
                          </th>
                          <th className="text-left p-2 text-sm font-semibold text-gray-600">
                            Status
                          </th>
                          <th className="text-left p-2 text-sm font-semibold text-gray-600">
                            ETA
                          </th>
                          <th className="text-left p-2 text-sm font-semibold text-gray-600">
                            Items
                          </th>
                          <th className="text-left p-2 text-sm font-semibold text-gray-600">
                            Driver
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredDeliveryQueue.map((delivery, index) => (
                          <tr key={index} className="border-b">
                            <td className="p-2 text-sm text-gray-900">
                              {delivery.id}
                            </td>
                            <td className="p-2 text-sm text-gray-900">
                              {delivery.address}
                            </td>
                            <td className="p-2">
                              <span
                                className={`flex items-center ${
                                  delivery.status === "In Transit"
                                    ? "text-blue-600"
                                    : delivery.status === "Delayed"
                                    ? "text-yellow-600"
                                    : delivery.status === "Delivered"
                                    ? "text-green-600"
                                    : delivery.status === "Cancelled"
                                    ? "text-red-600"
                                    : "text-gray-600"
                                }`}
                              >
                                {delivery.status === "In Transit" && (
                                  <TruckIcon className="h-4 w-4 mr-1" />
                                )}
                                {delivery.status === "Delayed" && (
                                  <ClockIcon className="h-4 w-4 mr-1" />
                                )}
                                {delivery.status === "Delivered" && (
                                  <CheckCircleIcon className="h-4 w-4 mr-1" />
                                )}
                                {delivery.status === "Cancelled" && (
                                  <XCircleIcon className="h-4 w-4 mr-1" />
                                )}
                                {delivery.status === "Preparing" && (
                                  <ChefHatIcon className="h-4 w-4 mr-1" />
                                )}
                                {delivery.status}
                              </span>
                            </td>
                            <td className="p-2 text-sm text-gray-900">
                              {delivery.eta}
                            </td>
                            <td className="p-2 text-sm text-gray-900">
                              {delivery.items}
                            </td>
                            <td className="p-2 text-sm text-gray-900">
                              {delivery.driver}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}