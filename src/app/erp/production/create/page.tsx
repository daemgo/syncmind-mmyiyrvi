"use client";

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
import { ArrowLeft, Save } from "lucide-react";

export default function ProductionCreatePage() {
  const router = useRouter();

  return (
    <div>
      <Header
        title="新建生产工单"
        actions={
          <Link href="/erp/production">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-1" />
              返回列表
            </Button>
          </Link>
        }
      />

      <div className="p-6 space-y-6 max-w-4xl">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base">工单信息</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>工单号</Label>
                <Input value="MO202603009" readOnly className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label>产品名称 *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择产品" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="p1">精密轴承 6205-2RS</SelectItem>
                    <SelectItem value="p2">精密轴承 6208-ZZ</SelectItem>
                    <SelectItem value="p3">汽车轮毂轴承单元</SelectItem>
                    <SelectItem value="p4">直线导轨 HGH20CA</SelectItem>
                    <SelectItem value="p5">大型减速机 ZDY560</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>计划数量 *</Label>
                <Input type="number" placeholder="输入数量" />
              </div>
              <div className="space-y-2">
                <Label>单位</Label>
                <Select defaultValue="个">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="个">个</SelectItem>
                    <SelectItem value="套">套</SelectItem>
                    <SelectItem value="台">台</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>车间 *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择车间" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="w1">一车间</SelectItem>
                    <SelectItem value="w2">二车间</SelectItem>
                    <SelectItem value="w3">三车间</SelectItem>
                    <SelectItem value="w4">四车间</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>优先级</Label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">高</SelectItem>
                    <SelectItem value="medium">中</SelectItem>
                    <SelectItem value="low">低</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>计划开始日期 *</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>计划结束日期 *</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>BOM 版本</Label>
                <Input placeholder="例如 V2.1" />
              </div>
              <div className="space-y-2">
                <Label>状态</Label>
                <Input value="已计划" readOnly className="bg-muted" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base">备注</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea placeholder="输入备注..." rows={3} />
          </CardContent>
        </Card>

        <div className="flex items-center gap-3">
          <Button onClick={() => router.push("/erp/production")}>
            <Save className="h-4 w-4 mr-1" />
            保存
          </Button>
          <Button variant="outline" onClick={() => router.push("/erp/production")}>
            取消
          </Button>
        </div>
      </div>
    </div>
  );
}
