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

interface PurchaseItem {
  materialName: string;
  spec: string;
  unit: string;
  quantity: number;
  unitPrice: number;
}

export default function PurchaseCreatePage() {
  const router = useRouter();
  const [items, setItems] = useState<PurchaseItem[]>([
    { materialName: "", spec: "", unit: "吨", quantity: 0, unitPrice: 0 },
  ]);

  const addItem = () => {
    setItems([...items, { materialName: "", spec: "", unit: "吨", quantity: 0, unitPrice: 0 }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof PurchaseItem, value: string | number) => {
    setItems(items.map((item, i) => i === index ? { ...item, [field]: value } : item));
  };

  const totalAmount = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

  return (
    <div>
      <Header
        title="新建采购单"
        actions={
          <Link href="/erp/purchase">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-1" />
              返回列表
            </Button>
          </Link>
        }
      />

      <div className="p-6 space-y-6 max-w-5xl">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base">基本信息</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>采购单号</Label>
                <Input value="PO202603008" readOnly className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label>供应商 *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择供应商" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="s1">宝钢特钢有限公司</SelectItem>
                    <SelectItem value="s2">无锡精密铸造有限公司</SelectItem>
                    <SelectItem value="s3">日本NSK精工（中国）贸易</SelectItem>
                    <SelectItem value="s4">洛阳轴研科技</SelectItem>
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
                <Label>预计到货日期 *</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>状态</Label>
                <Input value="草稿" readOnly className="bg-muted" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">采购明细</CardTitle>
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
                  <TableHead>物料名称 *</TableHead>
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
                    <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                    <TableCell>
                      <Input value={item.materialName} onChange={(e) => updateItem(i, "materialName", e.target.value)} placeholder="物料名称" className="h-8" />
                    </TableCell>
                    <TableCell>
                      <Input value={item.spec} onChange={(e) => updateItem(i, "spec", e.target.value)} placeholder="规格" className="h-8" />
                    </TableCell>
                    <TableCell>
                      <Select value={item.unit} onValueChange={(v) => updateItem(i, "unit", v)}>
                        <SelectTrigger className="h-8"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="吨">吨</SelectItem>
                          <SelectItem value="个">个</SelectItem>
                          <SelectItem value="套">套</SelectItem>
                          <SelectItem value="桶">桶</SelectItem>
                          <SelectItem value="片">片</SelectItem>
                          <SelectItem value="万粒">万粒</SelectItem>
                          <SelectItem value="批">批</SelectItem>
                          <SelectItem value="卷">卷</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input type="number" value={item.quantity || ""} onChange={(e) => updateItem(i, "quantity", Number(e.target.value))} className="h-8" />
                    </TableCell>
                    <TableCell>
                      <Input type="number" value={item.unitPrice || ""} onChange={(e) => updateItem(i, "unitPrice", Number(e.target.value))} className="h-8" />
                    </TableCell>
                    <TableCell className="text-right font-medium text-sm">
                      ¥{(item.quantity * item.unitPrice).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeItem(i)} disabled={items.length === 1}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-muted/50">
                  <TableCell colSpan={6} className="text-right font-medium">合计</TableCell>
                  <TableCell className="text-right font-bold">¥{totalAmount.toLocaleString()}</TableCell>
                  <TableCell />
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base">备注</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea placeholder="输入备注信息..." rows={3} />
          </CardContent>
        </Card>

        <div className="flex items-center gap-3">
          <Button onClick={() => router.push("/erp/purchase")}>
            <Save className="h-4 w-4 mr-1" />
            保存
          </Button>
          <Button variant="outline" onClick={() => router.push("/erp/purchase")}>
            取消
          </Button>
        </div>
      </div>
    </div>
  );
}
