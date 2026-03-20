// Sales order status
export const SALES_ORDER_STATUS = [
  { label: "草稿", value: "draft", color: "bg-gray-100 text-gray-700" },
  { label: "已确认", value: "confirmed", color: "bg-blue-100 text-blue-700" },
  { label: "发货中", value: "delivering", color: "bg-yellow-100 text-yellow-700" },
  { label: "已完成", value: "completed", color: "bg-green-100 text-green-700" },
  { label: "已取消", value: "cancelled", color: "bg-red-100 text-red-700" },
] as const;

// Purchase order status
export const PURCHASE_ORDER_STATUS = [
  { label: "草稿", value: "draft", color: "bg-gray-100 text-gray-700" },
  { label: "已审批", value: "approved", color: "bg-blue-100 text-blue-700" },
  { label: "已下单", value: "ordered", color: "bg-indigo-100 text-indigo-700" },
  { label: "已收货", value: "received", color: "bg-yellow-100 text-yellow-700" },
  { label: "已完成", value: "completed", color: "bg-green-100 text-green-700" },
  { label: "已取消", value: "cancelled", color: "bg-red-100 text-red-700" },
] as const;

// Inventory status
export const INVENTORY_STATUS = [
  { label: "正常", value: "normal", color: "bg-green-100 text-green-700" },
  { label: "偏低", value: "low", color: "bg-yellow-100 text-yellow-700" },
  { label: "积压", value: "overstock", color: "bg-orange-100 text-orange-700" },
  { label: "缺货", value: "shortage", color: "bg-red-100 text-red-700" },
] as const;

// Production order status
export const PRODUCTION_ORDER_STATUS = [
  { label: "已计划", value: "planned", color: "bg-gray-100 text-gray-700" },
  { label: "已下达", value: "released", color: "bg-blue-100 text-blue-700" },
  { label: "生产中", value: "in_progress", color: "bg-yellow-100 text-yellow-700" },
  { label: "已完工", value: "completed", color: "bg-green-100 text-green-700" },
  { label: "已关闭", value: "closed", color: "bg-gray-100 text-gray-500" },
] as const;

// Voucher type
export const VOUCHER_TYPE = [
  { label: "收款凭证", value: "receipt" },
  { label: "付款凭证", value: "payment" },
  { label: "转账凭证", value: "transfer" },
  { label: "通用凭证", value: "general" },
] as const;

// Voucher status
export const VOUCHER_STATUS = [
  { label: "草稿", value: "draft", color: "bg-gray-100 text-gray-700" },
  { label: "已提交", value: "submitted", color: "bg-blue-100 text-blue-700" },
  { label: "已审核", value: "approved", color: "bg-green-100 text-green-700" },
  { label: "已过账", value: "posted", color: "bg-indigo-100 text-indigo-700" },
  { label: "已驳回", value: "rejected", color: "bg-red-100 text-red-700" },
] as const;

// Priority
export const PRIORITY = [
  { label: "高", value: "high", color: "bg-red-100 text-red-700" },
  { label: "中", value: "medium", color: "bg-yellow-100 text-yellow-700" },
  { label: "低", value: "low", color: "bg-green-100 text-green-700" },
] as const;

// Material categories
export const MATERIAL_CATEGORY = [
  { label: "原材料", value: "raw" },
  { label: "半成品", value: "semi" },
  { label: "成品", value: "finished" },
  { label: "辅料", value: "auxiliary" },
  { label: "包装材料", value: "packaging" },
] as const;

// Warehouses
export const WAREHOUSES = [
  { label: "原材料仓", value: "raw-warehouse" },
  { label: "半成品仓", value: "semi-warehouse" },
  { label: "成品仓", value: "finished-warehouse" },
  { label: "退货仓", value: "return-warehouse" },
] as const;

// Helper to get label from dictionary
export function getDictLabel(dict: readonly { label: string; value: string }[], value: string): string {
  return dict.find((d) => d.value === value)?.label ?? value;
}

// Helper to get color from dictionary
export function getDictColor(
  dict: readonly { label: string; value: string; color?: string }[],
  value: string,
): string {
  const item = dict.find((d) => d.value === value);
  return (item && "color" in item ? item.color : "bg-gray-100 text-gray-700") as string;
}
