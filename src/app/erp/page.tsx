"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/header";
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  PackageSearch,
  Warehouse,
  Factory,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import {
  dashboardStats,
  monthlySalesData,
  topProducts,
  orderStatusCounts,
  recentActivities,
} from "@/mock";
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
} from "recharts";

function formatAmount(n: number): string {
  if (n >= 10000) return `${(n / 10000).toFixed(1)}万`;
  return n.toLocaleString("zh-CN");
}

const statCards = [
  {
    title: "本月销售额",
    value: dashboardStats.salesAmount,
    growth: dashboardStats.salesGrowth,
    icon: ShoppingCart,
    href: "/erp/sales",
    format: true,
  },
  {
    title: "本月采购额",
    value: dashboardStats.purchaseAmount,
    growth: dashboardStats.purchaseGrowth,
    icon: PackageSearch,
    href: "/erp/purchase",
    format: true,
  },
  {
    title: "库存总值",
    value: dashboardStats.inventoryValue,
    growth: dashboardStats.inventoryGrowth,
    icon: Warehouse,
    href: "/erp/inventory",
    format: true,
  },
  {
    title: "生产工单",
    value: dashboardStats.productionOrders,
    growth: dashboardStats.productionGrowth,
    icon: Factory,
    href: "/erp/production",
    format: false,
  },
];

const typeColors: Record<string, string> = {
  sales: "bg-blue-100 text-blue-700",
  purchase: "bg-green-100 text-green-700",
  production: "bg-yellow-100 text-yellow-700",
  inventory: "bg-orange-100 text-orange-700",
  finance: "bg-indigo-100 text-indigo-700",
};

const typeLabels: Record<string, string> = {
  sales: "销售",
  purchase: "采购",
  production: "生产",
  inventory: "库存",
  finance: "财务",
};

export default function DashboardPage() {
  return (
    <div>
      <Header title="工作台" description="制造业 ERP 管理系统" />

      <div className="p-6 space-y-6">
        {/* Stat cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            const isPositive = stat.growth >= 0;
            return (
              <Link key={stat.title} href={stat.href}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-muted-foreground">
                        {stat.title}
                      </span>
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold">
                      {stat.format
                        ? `¥${formatAmount(stat.value)}`
                        : `${stat.value} 个`}
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-xs">
                      {isPositive ? (
                        <TrendingUp className="h-3 w-3 text-green-600" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-600" />
                      )}
                      <span
                        className={
                          isPositive ? "text-green-600" : "text-red-600"
                        }
                      >
                        {isPositive ? "+" : ""}
                        {stat.growth}%
                      </span>
                      <span className="text-muted-foreground">较上月</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Charts row */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Sales trend chart */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">销售与采购趋势</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={monthlySalesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="month"
                    tickFormatter={(v: string) => v.slice(5)}
                    fontSize={12}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis
                    tickFormatter={(v: number) => `${(v / 10000).toFixed(0)}万`}
                    fontSize={12}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <Tooltip
                    formatter={(value: number) => `¥${value.toLocaleString()}`}
                    labelFormatter={(label: string) => `${label.replace("-", "年")}月`}
                  />
                  <Bar dataKey="sales" name="销售额" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="purchase" name="采购额" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Order status pie */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">销售订单分布</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={orderStatusCounts}
                    dataKey="count"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={50}
                    paddingAngle={3}
                  >
                    {orderStatusCounts.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {orderStatusCounts.map((s) => (
                  <div key={s.status} className="flex items-center gap-2 text-xs">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: s.color }}
                    />
                    <span className="text-muted-foreground">{s.status}</span>
                    <span className="font-medium ml-auto">{s.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom row */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Top products */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">销售额 Top 5 产品</CardTitle>
                <Link
                  href="/erp/sales"
                  className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                >
                  查看全部 <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topProducts.map((p, i) => (
                  <div key={p.name} className="flex items-center gap-3">
                    <span className="text-xs font-bold text-muted-foreground w-4">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">
                        {p.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {p.quantity.toLocaleString()} 件
                      </div>
                    </div>
                    <div className="text-sm font-medium">
                      ¥{formatAmount(p.sales)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent activities */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">动态</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.slice(0, 6).map((a) => (
                  <div key={a.id} className="flex items-start gap-3">
                    <Badge
                      variant="secondary"
                      className={`text-[10px] px-1.5 py-0 shrink-0 mt-0.5 ${typeColors[a.type]}`}
                    >
                      {typeLabels[a.type]}
                    </Badge>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm">{a.title}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {a.description}
                      </div>
                    </div>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap shrink-0">
                      {a.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
