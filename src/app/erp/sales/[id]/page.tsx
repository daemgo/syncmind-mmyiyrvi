"use client";

import { use } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Pencil, Trash2, Printer } from "lucide-react";
import { salesOrders } from "@/mock";
import { SALES_ORDER_STATUS, getDictLabel, getDictColor } from "@/lib/dict";

export default function SalesDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const order = salesOrders.find((o) => o.id === id);

  if (!order) {
    return (
      <div>
        <Header title="销售订单详情" />
        <div className="p-6">
          <Card className="p-12 text-center text-muted-foreground">
            订单不存在
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header
        title="销售订单详情"
        actions={
          <div className="flex gap-2">
            <Link href="/erp/sales">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1" />
                返回列表
              </Button>
            </Link>
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-1" />
              打印
            </Button>
            <Button size="sm">
              <Pencil className="h-4 w-4 mr-1" />
              编辑
            </Button>
          </div>
        }
      />

      <div className="p-6 space-y-6">
        {/* Summary card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold">{order.orderNo}</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {order.customerName}
                </p>
              </div>
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getDictColor(SALES_ORDER_STATUS, order.status)}`}
              >
                {getDictLabel(SALES_ORDER_STATUS, order.status)}
              </span>
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">联系人</p>
                <p className="text-sm font-medium">{order.contactPerson}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">下单日期</p>
                <p className="text-sm font-medium">{order.orderDate}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">交货日期</p>
                <p className="text-sm font-medium">{order.deliveryDate}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">订单总额</p>
                <p className="text-sm font-bold text-primary">
                  ¥{order.totalAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="items">
          <TabsList>
            <TabsTrigger value="items">订单明细</TabsTrigger>
            <TabsTrigger value="info">基本信息</TabsTrigger>
            <TabsTrigger value="logs">操作记录</TabsTrigger>
          </TabsList>

          <TabsContent value="items" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-8">#</TableHead>
                      <TableHead>产品名称</TableHead>
                      <TableHead>规格</TableHead>
                      <TableHead className="w-16">单位</TableHead>
                      <TableHead className="w-20 text-right">数量</TableHead>
                      <TableHead className="w-24 text-right">单价</TableHead>
                      <TableHead className="w-28 text-right">金额</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.items.map((item, i) => (
                      <TableRow key={item.id}>
                        <TableCell className="text-muted-foreground">
                          {i + 1}
                        </TableCell>
                        <TableCell className="font-medium">
                          {item.productName}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {item.spec}
                        </TableCell>
                        <TableCell>{item.unit}</TableCell>
                        <TableCell className="text-right">
                          {item.quantity.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          ¥{item.unitPrice.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          ¥{item.amount.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-muted/50">
                      <TableCell colSpan={6} className="text-right font-medium">
                        合计
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        ¥{order.totalAmount.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="info" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  <div>
                    <p className="text-xs text-muted-foreground">订单编号</p>
                    <p className="text-sm font-medium">{order.orderNo}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">客户名称</p>
                    <p className="text-sm font-medium">{order.customerName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">联系人</p>
                    <p className="text-sm font-medium">{order.contactPerson}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">订单状态</p>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${getDictColor(SALES_ORDER_STATUS, order.status)}`}
                    >
                      {getDictLabel(SALES_ORDER_STATUS, order.status)}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">下单日期</p>
                    <p className="text-sm font-medium">{order.orderDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">交货日期</p>
                    <p className="text-sm font-medium">{order.deliveryDate}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-muted-foreground">备注</p>
                    <p className="text-sm font-medium">
                      {order.remark || "无"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    { time: `${order.orderDate} 09:00`, action: "创建订单", user: "系统管理员" },
                    { time: `${order.orderDate} 10:30`, action: "订单审核通过", user: "销售经理" },
                    ...(order.status === "delivering" || order.status === "completed"
                      ? [{ time: `${order.deliveryDate} 08:00`, action: "开始发货", user: "仓库管理员" }]
                      : []),
                    ...(order.status === "completed"
                      ? [{ time: `${order.deliveryDate} 16:00`, action: "发货完成，订单关闭", user: "系统" }]
                      : []),
                  ].map((log, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="relative flex flex-col items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                        {i < 3 && (
                          <div className="w-px flex-1 bg-border" />
                        )}
                      </div>
                      <div className="pb-4">
                        <p className="text-sm font-medium">{log.action}</p>
                        <p className="text-xs text-muted-foreground">
                          {log.time} · {log.user}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
