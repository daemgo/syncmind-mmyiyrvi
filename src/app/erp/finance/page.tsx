"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { financeVouchers } from "@/mock";
import {
  VOUCHER_TYPE,
  VOUCHER_STATUS,
  getDictLabel,
  getDictColor,
} from "@/lib/dict";

export default function FinanceListPage() {
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filtered = financeVouchers.filter((v) => {
    const matchKeyword =
      !keyword ||
      v.voucherNo.includes(keyword) ||
      v.summary.includes(keyword);
    const matchStatus = statusFilter === "all" || v.status === statusFilter;
    const matchType = typeFilter === "all" || v.voucherType === typeFilter;
    return matchKeyword && matchStatus && matchType;
  });

  return (
    <div>
      <Header
        title="财务管理"
        actions={
          <Link href="/erp/finance/create">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              新建凭证
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
                  placeholder="搜索凭证号或摘要..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="pl-8 w-64 h-9"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-28 h-9">
                  <SelectValue placeholder="凭证类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部类型</SelectItem>
                  {VOUCHER_TYPE.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-28 h-9">
                  <SelectValue placeholder="状态筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  {VOUCHER_STATUS.map((s) => (
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
                  setTypeFilter("all");
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
                  <TableHead className="w-36">凭证号</TableHead>
                  <TableHead className="w-24">日期</TableHead>
                  <TableHead className="w-24">类型</TableHead>
                  <TableHead>摘要</TableHead>
                  <TableHead className="w-28 text-right">借方金额</TableHead>
                  <TableHead className="w-28 text-right">贷方金额</TableHead>
                  <TableHead className="w-20">状态</TableHead>
                  <TableHead className="w-20 text-center">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((voucher) => (
                  <TableRow key={voucher.id}>
                    <TableCell>
                      <Link
                        href={`/erp/finance/${voucher.id}`}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        {voucher.voucherNo}
                      </Link>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {voucher.voucherDate}
                    </TableCell>
                    <TableCell className="text-sm">
                      {getDictLabel(VOUCHER_TYPE, voucher.voucherType)}
                    </TableCell>
                    <TableCell className="text-sm truncate max-w-[200px]">
                      {voucher.summary}
                    </TableCell>
                    <TableCell className="text-sm text-right font-medium">
                      ¥{voucher.debitAmount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-sm text-right font-medium">
                      ¥{voucher.creditAmount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${getDictColor(VOUCHER_STATUS, voucher.status)}`}
                      >
                        {getDictLabel(VOUCHER_STATUS, voucher.status)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-1">
                        <Link href={`/erp/finance/${voucher.id}`}>
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
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
