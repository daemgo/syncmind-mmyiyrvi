import type { DashboardStats, MonthlySalesData, TopProduct, OrderStatusCount } from "@/types/erp";

export const dashboardStats: DashboardStats = {
  salesAmount: 2739600,
  salesGrowth: 12.5,
  purchaseAmount: 1195700,
  purchaseGrowth: -3.2,
  inventoryValue: 1863700,
  inventoryGrowth: 5.8,
  productionOrders: 8,
  productionGrowth: 15.0,
};

export const monthlySalesData: MonthlySalesData[] = [
  { month: "2025-10", sales: 1850000, purchase: 980000 },
  { month: "2025-11", sales: 2120000, purchase: 1150000 },
  { month: "2025-12", sales: 2480000, purchase: 1320000 },
  { month: "2026-01", sales: 1960000, purchase: 1080000 },
  { month: "2026-02", sales: 2350000, purchase: 1200000 },
  { month: "2026-03", sales: 2739600, purchase: 1195700 },
];

export const topProducts: TopProduct[] = [
  { name: "精密轴承 6205-2RS", sales: 450000, quantity: 10000 },
  { name: "汽车轮毂轴承单元", sales: 370000, quantity: 2000 },
  { name: "电机轴承 6310-2RS", sales: 336000, quantity: 6000 },
  { name: "直线导轨 HGH20CA", sales: 284000, quantity: 1000 },
  { name: "大型减速机 ZDY560", sales: 340000, quantity: 5 },
];

export const orderStatusCounts: OrderStatusCount[] = [
  { status: "草稿", count: 2, color: "hsl(var(--chart-1))" },
  { status: "已确认", count: 3, color: "hsl(var(--chart-2))" },
  { status: "发货中", count: 2, color: "hsl(var(--chart-3))" },
  { status: "已完成", count: 1, color: "hsl(var(--chart-4))" },
];

export interface RecentActivity {
  id: string;
  type: "sales" | "purchase" | "production" | "inventory" | "finance";
  title: string;
  description: string;
  time: string;
}

export const recentActivities: RecentActivity[] = [
  { id: "1", type: "sales", title: "新建销售订单", description: "SO202603008 武汉钢铁集团设备部 ¥267,500", time: "10 分钟前" },
  { id: "2", type: "production", title: "生产完工入库", description: "MO202603001 精密轴承6205-2RS 5000个", time: "30 分钟前" },
  { id: "3", type: "purchase", title: "采购到货入库", description: "PO202603002 铸铁轴承座毛坯 500个", time: "1 小时前" },
  { id: "4", type: "inventory", title: "库存预警", description: "42CrMo合金钢棒材 库存低于安全库存", time: "2 小时前" },
  { id: "5", type: "finance", title: "凭证审核通过", description: "记-202603006 预付进口材料款 ¥358,000", time: "3 小时前" },
  { id: "6", type: "sales", title: "发货完成", description: "SO202603001 上海精密机械 全部发货完成", time: "4 小时前" },
  { id: "7", type: "production", title: "生产进度更新", description: "MO202603008 微型精密轴承 完成60%", time: "5 小时前" },
  { id: "8", type: "inventory", title: "库存预警", description: "保持架PA66 6205规格 严重缺货", time: "6 小时前" },
];
