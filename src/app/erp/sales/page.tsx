"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { salesOrders } from "@/mock";
import { SALES_ORDER_STATUS, getDictLabel, getDictColor } from "@/lib/dict";
import type { SalesOrderStatus } from "@/types/erp";

export default function SalesListPage() {
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = salesOrders.filter((o) => {
    const matchKeyword =
      !keyword ||
      o.orderNo.toLowerCase().includes(keyword.toLowerCase()) ||
      o.customerName.includes(keyword);
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchKeyword && matchStatus;
  });

  return (
    <div>
      <Header
        title="销售管理"
        actions={
          <Link href="/erp/sales/create">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              新建订单
            </Button>
          </Link>
        }
      />

      <div className="p-6 space-y-4">
        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-3 items-center">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索订单号或客户名..."
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
                  {SALES_ORDER_STATUS.map((s) => (
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

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-32">订单号</TableHead>
                  <TableHead>客户名称</TableHead>
                  <TableHead className="w-28">下单日期</TableHead>
                  <TableHead className="w-28">交货日期</TableHead>
                  <TableHead className="w-24 text-right">金额</TableHead>
                  <TableHead className="w-20">状态</TableHead>
                  <TableHead className="w-28 text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-32 text-center">
                      <div className="text-muted-foreground">
                        <ShoppingCartEmpty />
                        <p className="mt-2 text-sm">暂无销售订单</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((order) => (
                    <TableRow key={order.id} className="group">
                      <TableCell>
                        <Link
                          href={`/erp/sales/${order.id}`}
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          {order.orderNo}
                        </Link>
                      </TableCell>
                      <TableCell className="text-sm">
                        {order.customerName}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {order.orderDate}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {order.deliveryDate}
                      </TableCell>
                      <TableCell className="text-sm text-right font-medium">
                        ¥{order.totalAmount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${getDictColor(SALES_ORDER_STATUS, order.status)}`}
                        >
                          {getDictLabel(SALES_ORDER_STATUS, order.status)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-1">
                          <Link href={`/erp/sales/${order.id}`}>
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
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ShoppingCartEmpty() {
  return (
    <svg
      className="mx-auto h-10 w-10 text-muted-foreground/40"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
      />
    </svg>
  );
}
