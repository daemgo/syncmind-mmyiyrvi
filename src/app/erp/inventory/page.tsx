"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, RotateCcw, Eye, AlertTriangle } from "lucide-react";
import { inventoryItems } from "@/mock";
import {
  INVENTORY_STATUS,
  MATERIAL_CATEGORY,
  WAREHOUSES,
  getDictLabel,
  getDictColor,
} from "@/lib/dict";

export default function InventoryListPage() {
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filtered = inventoryItems.filter((item) => {
    const matchKeyword =
      !keyword ||
      item.materialCode.toLowerCase().includes(keyword.toLowerCase()) ||
      item.materialName.includes(keyword);
    const matchStatus = statusFilter === "all" || item.status === statusFilter;
    const matchCategory = categoryFilter === "all" || item.category === categoryFilter;
    return matchKeyword && matchStatus && matchCategory;
  });

  const lowStockCount = inventoryItems.filter(
    (i) => i.status === "low" || i.status === "shortage"
  ).length;

  return (
    <div>
      <Header title="库存管理" />

      <div className="p-6 space-y-4">
        {/* Stock alerts */}
        {lowStockCount > 0 && (
          <Card className="border-yellow-200 bg-yellow-50/50">
            <CardContent className="p-4 flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 shrink-0" />
              <div>
                <p className="text-sm font-medium text-yellow-800">
                  库存预警：{lowStockCount} 种物料低于安全库存
                </p>
                <p className="text-xs text-yellow-600 mt-0.5">
                  请及时安排采购补货
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="ml-auto"
                onClick={() => setStatusFilter("shortage")}
              >
                查看缺货物料
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-3 items-center">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索物料编码或名称..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="pl-8 w-64 h-9"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-28 h-9">
                  <SelectValue placeholder="物料分类" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部分类</SelectItem>
                  {MATERIAL_CATEGORY.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-28 h-9">
                  <SelectValue placeholder="库存状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  {INVENTORY_STATUS.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setKeyword("");
                  setStatusFilter("all");
                  setCategoryFilter("all");
                }}
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                重置
              </Button>
              <span className="text-xs text-muted-foreground ml-auto">
                共 {filtered.length} 种物料
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-24">物料编码</TableHead>
                  <TableHead>物料名称</TableHead>
                  <TableHead>规格</TableHead>
                  <TableHead className="w-20">分类</TableHead>
                  <TableHead className="w-20">仓库</TableHead>
                  <TableHead className="w-20 text-right">库存量</TableHead>
                  <TableHead className="w-20 text-right">安全库存</TableHead>
                  <TableHead className="w-28 text-right">库存价值</TableHead>
                  <TableHead className="w-16">状态</TableHead>
                  <TableHead className="w-16 text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Link
                        href={`/erp/inventory/${item.id}`}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        {item.materialCode}
                      </Link>
                    </TableCell>
                    <TableCell className="text-sm font-medium">
                      {item.materialName}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {item.spec}
                    </TableCell>
                    <TableCell className="text-sm">
                      {getDictLabel(MATERIAL_CATEGORY, item.category)}
                    </TableCell>
                    <TableCell className="text-sm">
                      {getDictLabel(WAREHOUSES, item.warehouse)}
                    </TableCell>
                    <TableCell className="text-sm text-right">
                      {item.quantity.toLocaleString()} {item.unit}
                    </TableCell>
                    <TableCell className="text-sm text-right text-muted-foreground">
                      {item.safetyStock.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-sm text-right font-medium">
                      ¥{item.totalValue.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${getDictColor(INVENTORY_STATUS, item.status)}`}
                      >
                        {getDictLabel(INVENTORY_STATUS, item.status)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Link href={`/erp/inventory/${item.id}`}>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
