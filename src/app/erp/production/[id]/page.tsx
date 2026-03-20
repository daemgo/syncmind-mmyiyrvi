"use client";

import { use } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Pencil } from "lucide-react";
import { productionOrders } from "@/mock";
import {
  PRODUCTION_ORDER_STATUS,
  PRIORITY,
  getDictLabel,
  getDictColor,
} from "@/lib/dict";

export default function ProductionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const order = productionOrders.find((o) => o.id === id);

  if (!order) {
    return (
      <div>
        <Header title="生产工单详情" />
        <div className="p-6">
          <Card className="p-12 text-center text-muted-foreground">工单不存在</Card>
        </div>
      </div>
    );
  }

  const progressPct =
    order.plannedQty > 0
      ? Math.round((order.completedQty / order.plannedQty) * 100)
      : 0;

  return (
    <div>
      <Header
        title="生产工单详情"
        actions={
          <div className="flex gap-2">
            <Link href="/erp/production">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1" />
                返回列表
              </Button>
            </Link>
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
                  {order.productName} · {order.spec}
                </p>
              </div>
              <div className="flex gap-2">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getDictColor(PRIORITY, order.priority)}`}
                >
                  {getDictLabel(PRIORITY, order.priority)}
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getDictColor(PRODUCTION_ORDER_STATUS, order.status)}`}
                >
                  {getDictLabel(PRODUCTION_ORDER_STATUS, order.status)}
                </span>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">生产进度</span>
                <span className="text-sm font-medium">
                  {order.completedQty.toLocaleString()} / {order.plannedQty.toLocaleString()} {order.unit} ({progressPct}%)
                </span>
              </div>
              <Progress value={progressPct} className="h-3" />
            </div>

            <Separator className="my-4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">车间</p>
                <p className="text-sm font-medium">{order.workshop}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">BOM 版本</p>
                <p className="text-sm font-medium">{order.bomVersion}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">开始日期</p>
                <p className="text-sm font-medium">{order.startDate}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">结束日期</p>
                <p className="text-sm font-medium">{order.endDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="bom">
          <TabsList>
            <TabsTrigger value="bom">物料清单 (BOM)</TabsTrigger>
            <TabsTrigger value="process">工序</TabsTrigger>
            <TabsTrigger value="logs">操作记录</TabsTrigger>
          </TabsList>

          <TabsContent value="bom" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {[
                    { material: "轴承钢棒材 GCr15", spec: "Φ50mm", qty: "2.5 吨", status: "已领料" },
                    { material: "保持架 PA66", spec: "6205规格", qty: "5000 个", status: "已领料" },
                    { material: "滚珠 G10级", spec: "Φ8mm", qty: "10 万粒", status: "已领料" },
                    { material: "润滑脂", spec: "2号锂基脂", qty: "5 桶", status: "待领料" },
                    { material: "防锈包装纸", spec: "1200mm宽", qty: "8 卷", status: "待领料" },
                  ].map((m, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div>
                        <p className="text-sm font-medium">{m.material}</p>
                        <p className="text-xs text-muted-foreground">{m.spec}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm">{m.qty}</span>
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded ${
                            m.status === "已领料"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {m.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="process" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    { step: 1, name: "车削加工", duration: "2天", status: "completed" },
                    { step: 2, name: "热处理", duration: "1天", status: "completed" },
                    { step: 3, name: "磨削加工", duration: "2天", status: "in_progress" },
                    { step: 4, name: "装配", duration: "1天", status: "pending" },
                    { step: 5, name: "检验包装", duration: "0.5天", status: "pending" },
                  ].map((p) => (
                    <div key={p.step} className="flex items-center gap-4">
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium ${
                          p.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : p.status === "in_progress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {p.step}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{p.name}</p>
                        <p className="text-xs text-muted-foreground">预计 {p.duration}</p>
                      </div>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded ${
                          p.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : p.status === "in_progress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {p.status === "completed" ? "已完成" : p.status === "in_progress" ? "进行中" : "待开始"}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    { time: `${order.startDate} 08:00`, action: "工单下达", user: "生产计划员" },
                    { time: `${order.startDate} 09:00`, action: "物料领料", user: "车间主任" },
                    { time: `${order.startDate} 10:00`, action: "开始生产", user: "操作工" },
                  ].map((log, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="relative flex flex-col items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                        {i < 2 && <div className="w-px flex-1 bg-border" />}
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
