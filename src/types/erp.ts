// Sales types
export interface SalesOrder {
  id: string;
  orderNo: string;
  customerName: string;
  contactPerson: string;
  orderDate: string;
  deliveryDate: string;
  status: SalesOrderStatus;
  totalAmount: number;
  items: SalesOrderItem[];
  remark: string;
}

export type SalesOrderStatus = "draft" | "confirmed" | "delivering" | "completed" | "cancelled";

export interface SalesOrderItem {
  id: string;
  productName: string;
  spec: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

// Purchase types
export interface PurchaseOrder {
  id: string;
  orderNo: string;
  supplierName: string;
  contactPerson: string;
  orderDate: string;
  expectedDate: string;
  status: PurchaseOrderStatus;
  totalAmount: number;
  items: PurchaseOrderItem[];
  remark: string;
}

export type PurchaseOrderStatus = "draft" | "approved" | "ordered" | "received" | "completed" | "cancelled";

export interface PurchaseOrderItem {
  id: string;
  materialName: string;
  spec: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

// Inventory types
export interface InventoryItem {
  id: string;
  materialCode: string;
  materialName: string;
  spec: string;
  unit: string;
  category: string;
  warehouse: string;
  quantity: number;
  safetyStock: number;
  costPrice: number;
  totalValue: number;
  lastInDate: string;
  lastOutDate: string;
  status: InventoryStatus;
}

export type InventoryStatus = "normal" | "low" | "overstock" | "shortage";

// Production types
export interface ProductionOrder {
  id: string;
  orderNo: string;
  productName: string;
  spec: string;
  plannedQty: number;
  completedQty: number;
  unit: string;
  startDate: string;
  endDate: string;
  status: ProductionOrderStatus;
  workshop: string;
  priority: "high" | "medium" | "low";
  bomVersion: string;
}

export type ProductionOrderStatus = "planned" | "released" | "in_progress" | "completed" | "closed";

// Finance types
export interface FinanceVoucher {
  id: string;
  voucherNo: string;
  voucherDate: string;
  voucherType: VoucherType;
  debitAmount: number;
  creditAmount: number;
  summary: string;
  status: VoucherStatus;
  preparedBy: string;
  approvedBy: string;
  entries: VoucherEntry[];
}

export type VoucherType = "receipt" | "payment" | "transfer" | "general";
export type VoucherStatus = "draft" | "submitted" | "approved" | "posted" | "rejected";

export interface VoucherEntry {
  id: string;
  accountCode: string;
  accountName: string;
  summary: string;
  debitAmount: number;
  creditAmount: number;
}

// Dashboard types
export interface DashboardStats {
  salesAmount: number;
  salesGrowth: number;
  purchaseAmount: number;
  purchaseGrowth: number;
  inventoryValue: number;
  inventoryGrowth: number;
  productionOrders: number;
  productionGrowth: number;
}

export interface MonthlySalesData {
  month: string;
  sales: number;
  purchase: number;
}

export interface TopProduct {
  name: string;
  sales: number;
  quantity: number;
}

export interface OrderStatusCount {
  status: string;
  count: number;
  color: string;
}
