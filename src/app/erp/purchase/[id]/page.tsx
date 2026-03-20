"use client";

import { use } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { ArrowLeft, Pencil, Printer } from "lucide-react";
import { purchaseOrders } from "@/mock";
import { PURCHASE_ORDER_STATUS, getDictLabel, getDictColor } from "@/lib/dict";

export default function PurchaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const order = purchaseOrders.find((o) => o.id === id);

  if (!order) {
    return (
      <div>
        <Header title="采购单详情" />
        <div className="p-6">
          <Card className="p-12 text-center text-muted-foreground">
            采购单不存在
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header
        title="采购单详情"
        actions={
          <div className="flex gap-2">
            <Link href="/erp/purchase">
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
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold">{order.orderNo}</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {order.supplierName}
                </p>
              </div>
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getDictColor(PURCHASE_ORDER_STATUS, order.status)}`}
              >
                {getDictLabel(PURCHASE_ORDER_STATUS, order.status)}
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
                <p className="text-xs text-muted-foreground">预计到货</p>
                <p className="text-sm font-medium">{order.expectedDate}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">采购总额</p>
                <p className="text-sm font-bold text-primary">
                  ¥{order.totalAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="items">
          <TabsList>
            <TabsTrigger value="items">采购明细</TabsTrigger>
            <TabsTrigger value="logs">操作记录</TabsTrigger>
          </TabsList>

          <TabsContent value="items" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-8">#</TableHead>
                      <TableHead>物料名称</TableHead>
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
                        <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                        <TableCell className="font-medium">{item.materialName}</TableCell>
                        <TableCell className="text-muted-foreground">{item.spec}</TableCell>
                        <TableCell>{item.unit}</TableCell>
                        <TableCell className="text-right">{item.quantity.toLocaleString()}</TableCell>
                        <TableCell className="text-right">¥{item.unitPrice.toLocaleString()}</TableCell>
                        <TableCell className="text-right font-medium">¥{item.amount.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-muted/50">
                      <TableCell colSpan={6} className="text-right font-medium">合计</TableCell>
                      <TableCell className="text-right font-bold">¥{order.totalAmount.toLocaleString()}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    { time: `${order.orderDate} 09:00`, action: "创建采购单", user: "采购员" },
                    { time: `${order.orderDate} 14:00`, action: "审批通过", user: "采购经理" },
                  ].map((log, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="relative flex flex-col items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                        {i < 1 && <div className="w-px flex-1 bg-border" />}
                      </div>
                      <div className="pb-4">
                        <p className="text-sm font-medium">{log.action}</p>
                        <p className="text-xs text-muted-foreground">{log.time} · {log.user}</p>
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
