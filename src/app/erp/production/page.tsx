"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
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
import { Plus, Search, RotateCcw, Eye, Pencil } from "lucide-react";
import { productionOrders } from "@/mock";
import {
  PRODUCTION_ORDER_STATUS,
  PRIORITY,
  getDictLabel,
  getDictColor,
} from "@/lib/dict";

export default function ProductionListPage() {
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = productionOrders.filter((o) => {
    const matchKeyword =
      !keyword ||
      o.orderNo.toLowerCase().includes(keyword.toLowerCase()) ||
      o.productName.includes(keyword);
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchKeyword && matchStatus;
  });

  return (
    <div>
      <Header
        title="生产管理"
        actions={
          <Link href="/erp/production/create">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              新建工单
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
                  placeholder="搜索工单号或产品..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="pl-8 w-64 h-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-28 h-9">
                  <SelectValue placeholder="状态筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  {PRODUCTION_ORDER_STATUS.map((s) => (
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
                  <TableHead className="w-32">工单号</TableHead>
                  <TableHead>产品名称</TableHead>
                  <TableHead className="w-16">车间</TableHead>
                  <TableHead className="w-16">优先级</TableHead>
                  <TableHead className="w-32">进度</TableHead>
                  <TableHead className="w-24">开始日期</TableHead>
                  <TableHead className="w-24">结束日期</TableHead>
                  <TableHead className="w-20">状态</TableHead>
                  <TableHead className="w-20 text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((order) => {
                  const progressPct =
                    order.plannedQty > 0
                      ? Math.round((order.completedQty / order.plannedQty) * 100)
                      : 0;

                  return (
                    <TableRow key={order.id}>
                      <TableCell>
                        <Link
                          href={`/erp/production/${order.id}`}
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          {order.orderNo}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm font-medium">{order.productName}</div>
                          <div className="text-xs text-muted-foreground">{order.spec}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{order.workshop}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${getDictColor(PRIORITY, order.priority)}`}
                        >
                          {getDictLabel(PRIORITY, order.priority)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Progress value={progressPct} className="h-2" />
                          <p className="text-xs text-muted-foreground">
                            {order.completedQty.toLocaleString()}/{order.plannedQty.toLocaleString()} ({progressPct}%)
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {order.startDate}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {order.endDate}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${getDictColor(PRODUCTION_ORDER_STATUS, order.status)}`}
                        >
                          {getDictLabel(PRODUCTION_ORDER_STATUS, order.status)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-1">
                          <Link href={`/erp/production/${order.id}`}>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <Eye className="h-3.5 w-3.5" />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
