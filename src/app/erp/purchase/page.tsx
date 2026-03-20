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
import { Plus, Search, RotateCcw, Eye, Pencil, Trash2 } from "lucide-react";
import { purchaseOrders } from "@/mock";
import { PURCHASE_ORDER_STATUS, getDictLabel, getDictColor } from "@/lib/dict";

export default function PurchaseListPage() {
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = purchaseOrders.filter((o) => {
    const matchKeyword =
      !keyword ||
      o.orderNo.toLowerCase().includes(keyword.toLowerCase()) ||
      o.supplierName.includes(keyword);
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchKeyword && matchStatus;
  });

  return (
    <div>
      <Header
        title="采购管理"
        actions={
          <Link href="/erp/purchase/create">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              新建采购单
            </Button>
          </Link>
        }
      />

      <div className="p-6 space-y-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-3 items-center">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索采购单号或供应商..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="pl-8 w-64 h-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32 h-9">
                  <SelectValue placeholder="状态筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  {PURCHASE_ORDER_STATUS.map((s) => (
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
                }}
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                重置
              </Button>
              <span className="text-xs text-muted-foreground ml-auto">
                共 {filtered.length} 条
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-32">采购单号</TableHead>
                  <TableHead>供应商</TableHead>
                  <TableHead className="w-28">下单日期</TableHead>
                  <TableHead className="w-28">预计到货</TableHead>
                  <TableHead className="w-24 text-right">金额</TableHead>
                  <TableHead className="w-20">状态</TableHead>
                  <TableHead className="w-28 text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <Link
                        href={`/erp/purchase/${order.id}`}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        {order.orderNo}
                      </Link>
                    </TableCell>
                    <TableCell className="text-sm">
                      {order.supplierName}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {order.orderDate}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {order.expectedDate}
                    </TableCell>
                    <TableCell className="text-sm text-right font-medium">
                      ¥{order.totalAmount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${getDictColor(PURCHASE_ORDER_STATUS, order.status)}`}
                      >
                        {getDictLabel(PURCHASE_ORDER_STATUS, order.status)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-1">
                        <Link href={`/erp/purchase/${order.id}`}>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
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
