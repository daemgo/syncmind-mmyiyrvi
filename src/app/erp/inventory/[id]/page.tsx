"use client";

import { use } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { inventoryItems } from "@/mock";
import {
  INVENTORY_STATUS,
  MATERIAL_CATEGORY,
  WAREHOUSES,
  getDictLabel,
  getDictColor,
} from "@/lib/dict";

export default function InventoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const item = inventoryItems.find((i) => i.id === id);

  if (!item) {
    return (
      <div>
        <Header title="库存详情" />
        <div className="p-6">
          <Card className="p-12 text-center text-muted-foreground">物料不存在</Card>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header
        title="库存详情"
        actions={
          <Link href="/erp/inventory">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-1" />
              返回列表
            </Button>
          </Link>
        }
      />

      <div className="p-6 space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold">{item.materialName}</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {item.materialCode} · {item.spec}
                </p>
              </div>
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getDictColor(INVENTORY_STATUS, item.status)}`}
              >
                {getDictLabel(INVENTORY_STATUS, item.status)}
              </span>
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">分类</p>
                <p className="text-sm font-medium">{getDictLabel(MATERIAL_CATEGORY, item.category)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">仓库</p>
                <p className="text-sm font-medium">{getDictLabel(WAREHOUSES, item.warehouse)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">当前库存</p>
                <p className="text-sm font-bold">{item.quantity.toLocaleString()} {item.unit}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">安全库存</p>
                <p className="text-sm font-medium">{item.safetyStock.toLocaleString()} {item.unit}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="info">
          <TabsList>
            <TabsTrigger value="info">库存信息</TabsTrigger>
            <TabsTrigger value="records">出入库记录</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  <div>
                    <p className="text-xs text-muted-foreground">单位成本</p>
                    <p className="text-sm font-medium">¥{item.costPrice.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">库存总值</p>
                    <p className="text-sm font-bold text-primary">¥{item.totalValue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">最近入库</p>
                    <p className="text-sm font-medium">{item.lastInDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">最近出库</p>
                    <p className="text-sm font-medium">{item.lastOutDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="records" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    { time: item.lastInDate, type: "入库", qty: `+${Math.floor(item.quantity * 0.3)}`, source: "采购入库" },
                    { time: item.lastOutDate, type: "出库", qty: `-${Math.floor(item.quantity * 0.1)}`, source: "生产领料" },
                  ].map((r, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded ${r.type === "入库" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {r.type}
                        </span>
                        <span className="text-sm">{r.source}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`text-sm font-medium ${r.type === "入库" ? "text-green-600" : "text-red-600"}`}>
                          {r.qty} {item.unit}
                        </span>
                        <span className="text-xs text-muted-foreground">{r.time}</span>
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
