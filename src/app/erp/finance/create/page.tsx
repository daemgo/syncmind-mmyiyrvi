"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { VOUCHER_TYPE } from "@/lib/dict";

interface VoucherEntry {
  accountCode: string;
  accountName: string;
  summary: string;
  debitAmount: number;
  creditAmount: number;
}

export default function FinanceCreatePage() {
  const router = useRouter();
  const [entries, setEntries] = useState<VoucherEntry[]>([
    { accountCode: "", accountName: "", summary: "", debitAmount: 0, creditAmount: 0 },
    { accountCode: "", accountName: "", summary: "", debitAmount: 0, creditAmount: 0 },
  ]);

  const addEntry = () => {
    setEntries([
      ...entries,
      { accountCode: "", accountName: "", summary: "", debitAmount: 0, creditAmount: 0 },
    ]);
  };

  const removeEntry = (index: number) => {
    if (entries.length > 2) setEntries(entries.filter((_, i) => i !== index));
  };

  const updateEntry = (index: number, field: keyof VoucherEntry, value: string | number) => {
    const newEntries = [...entries];
    const entry = newEntries[index];
    setEntries(newEntries.map((e, i) => i === index ? { ...e, [field]: value } : e));
  };

  const totalDebit = entries.reduce((sum, e) => sum + e.debitAmount, 0);
  const totalCredit = entries.reduce((sum, e) => sum + e.creditAmount, 0);
  const isBalanced = totalDebit === totalCredit && totalDebit > 0;

  return (
    <div>
      <Header
        title="新建凭证"
        actions={
          <Link href="/erp/finance">
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
            <CardTitle className="text-base">凭证信息</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>凭证号</Label>
                <Input value="记-202603009" readOnly className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label>凭证日期</Label>
                <Input type="date" defaultValue="2026-03-20" />
              </div>
              <div className="space-y-2">
                <Label>凭证类型</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择类型" />
                  </SelectTrigger>
                  <SelectContent>
                    {VOUCHER_TYPE.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">凭证分录</CardTitle>
              <Button variant="outline" size="sm" onClick={addEntry}>
                <Plus className="h-3 w-3 mr-1" />
                添加行
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-24">科目编码 *</TableHead>
                  <TableHead className="w-32">科目名称</TableHead>
                  <TableHead>摘要</TableHead>
                  <TableHead className="w-32">借方金额</TableHead>
                  <TableHead className="w-32">贷方金额</TableHead>
                  <TableHead className="w-12" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((entry, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Input
                        value={entry.accountCode}
                        onChange={(e) => updateEntry(i, "accountCode", e.target.value)}
                        placeholder="1002"
                        className="h-8 font-mono"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={entry.accountName}
                        onChange={(e) => updateEntry(i, "accountName", e.target.value)}
                        placeholder="科目名称"
                        className="h-8"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={entry.summary}
                        onChange={(e) => updateEntry(i, "summary", e.target.value)}
                        placeholder="摘要"
                        className="h-8"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={entry.debitAmount || ""}
                        onChange={(e) => updateEntry(i, "debitAmount", Number(e.target.value))}
                        className="h-8"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={entry.creditAmount || ""}
                        onChange={(e) => updateEntry(i, "creditAmount", Number(e.target.value))}
                        className="h-8"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive"
                        onClick={() => removeEntry(i)}
                        disabled={entries.length <= 2}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-muted/50">
                  <TableCell colSpan={3} className="text-right font-medium">
                    合计
                  </TableCell>
                  <TableCell className="font-bold">
                    ¥{totalDebit.toLocaleString()}
                  </TableCell>
                  <TableCell className="font-bold">
                    ¥{totalCredit.toLocaleString()}
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {!isBalanced && totalDebit + totalCredit > 0 && (
          <p className="text-sm text-destructive">
            借贷不平衡，差额 ¥{Math.abs(totalDebit - totalCredit).toLocaleString()}
          </p>
        )}

        <div className="flex items-center gap-3">
          <Button onClick={() => router.push("/erp/finance")}>
            <Save className="h-4 w-4 mr-1" />
            保存
          </Button>
          <Button variant="outline" onClick={() => router.push("/erp/finance")}>
            取消
          </Button>
        </div>
      </div>
    </div>
  );
}
