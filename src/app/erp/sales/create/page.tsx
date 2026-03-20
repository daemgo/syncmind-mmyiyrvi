"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Plus, Trash2, Save } from "lucide-react";

interface OrderItem {
  productName: string;
  spec: string;
  unit: string;
  quantity: number;
  unitPrice: number;
}

export default function SalesCreatePage() {
  const router = useRouter();
  const [items, setItems] = useState<OrderItem[]>([
    { productName: "", spec: "", unit: "个", quantity: 0, unitPrice: 0 },
  ]);

  const addItem = () => {
    setItems([...items, { productName: "", spec: "", unit: "个", quantity: 0, unitPrice: 0 }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index: number, field: keyof OrderItem, value: string | number) => {
    setItems(items.map((item, i) => i === index ? { ...item, [field]: value } : item));
  };

  const totalAmount = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  return (
    <div>
      <Header
        title="新建销售订单"
        actions={
          <Link href="/erp/sales">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-1" />
              返回列表
            </Button>
          </Link>
        }
      />

      <div className="p-6 space-y-6 max-w-5xl">
        {/* Basic info */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base">基本信息</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>订单编号</Label>
                <Input value="SO202603009" readOnly className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label>客户名称 *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择客户" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="c1">上海精密机械有限公司</SelectItem>
                    <SelectItem value="c2">苏州汽车零部件股份有限公司</SelectItem>
                    <SelectItem value="c3">杭州电气设备有限公司</SelectItem>
                    <SelectItem value="c4">宁波液压科技有限公司</SelectItem>
                    <SelectItem value="c5">广州重工机械集团</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>联系人</Label>
                <Input placeholder="输入联系人" />
              </div>
              <div className="space-y-2">
                <Label>下单日期</Label>
                <Input type="date" defaultValue="2026-03-20" />
              </div>
              <div className="space-y-2">
                <Label>交货日期 *</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>订单状态</Label>
                <Input value="草稿" readOnly className="bg-muted" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order items */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">订单明细</CardTitle>
              <Button variant="outline" size="sm" onClick={addItem}>
                <Plus className="h-3 w-3 mr-1" />
                添加行
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-8">#</TableHead>
                  <TableHead>产品名称 *</TableHead>
                  <TableHead>规格</TableHead>
                  <TableHead className="w-20">单位</TableHead>
                  <TableHead className="w-24">数量 *</TableHead>
                  <TableHead className="w-28">单价 *</TableHead>
                  <TableHead className="w-28 text-right">金额</TableHead>
                  <TableHead className="w-12" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-muted-foreground">
                      {i + 1}
                    </TableCell>
                    <TableCell>
                      <Input
                        value={item.productName}
                        onChange={(e) => updateItem(i, "productName", e.target.value)}
                        placeholder="产品名称"
                        className="h-8"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={item.spec}
                        onChange={(e) => updateItem(i, "spec", e.target.value)}
                        placeholder="规格"
                        className="h-8"
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={item.unit}
                        onValueChange={(v) => updateItem(i, "unit", v)}
                      >
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="个">个</SelectItem>
                          <SelectItem value="套">套</SelectItem>
                          <SelectItem value="台">台</SelectItem>
                          <SelectItem value="吨">吨</SelectItem>
                          <SelectItem value="根">根</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={item.quantity || ""}
                        onChange={(e) => updateItem(i, "quantity", Number(e.target.value))}
                        className="h-8"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={item.unitPrice || ""}
                        onChange={(e) => updateItem(i, "unitPrice", Number(e.target.value))}
                        className="h-8"
                      />
                    </TableCell>
                    <TableCell className="text-right font-medium text-sm">
                      ¥{(item.quantity * item.unitPrice).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive"
                        onClick={() => removeItem(i)}
                        disabled={items.length === 1}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-muted/50">
                  <TableCell colSpan={6} className="text-right font-medium">
                    合计
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    ¥{totalAmount.toLocaleString()}
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Remark */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base">备注</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea placeholder="输入备注信息..." rows={3} />
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button onClick={() => router.push("/erp/sales")}>
            <Save className="h-4 w-4 mr-1" />
            保存
          </Button>
          <Button variant="outline" onClick={() => router.push("/erp/sales")}>
            取消
          </Button>
        </div>
      </div>
    </div>
  );
}
