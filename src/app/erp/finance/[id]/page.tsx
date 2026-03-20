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
import { ArrowLeft, Pencil, Printer } from "lucide-react";
import { financeVouchers } from "@/mock";
import {
  VOUCHER_TYPE,
  VOUCHER_STATUS,
  getDictLabel,
  getDictColor,
} from "@/lib/dict";

export default function FinanceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const voucher = financeVouchers.find((v) => v.id === id);

  if (!voucher) {
    return (
      <div>
        <Header title="凭证详情" />
        <div className="p-6">
          <Card className="p-12 text-center text-muted-foreground">凭证不存在</Card>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header
        title="凭证详情"
        actions={
          <div className="flex gap-2">
            <Link href="/erp/finance">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1" />
                返回列表
              </Button>
            </Link>
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-1" />
              打印
            </Button>
            {(voucher.status === "draft" || voucher.status === "rejected") && (
              <Button size="sm">
                <Pencil className="h-4 w-4 mr-1" />
                编辑
              </Button>
            )}
          </div>
        }
      />

      <div className="p-6 space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold">{voucher.voucherNo}</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {voucher.summary}
                </p>
              </div>
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getDictColor(VOUCHER_STATUS, voucher.status)}`}
              >
                {getDictLabel(VOUCHER_STATUS, voucher.status)}
              </span>
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">凭证类型</p>
                <p className="text-sm font-medium">
                  {getDictLabel(VOUCHER_TYPE, voucher.voucherType)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">凭证日期</p>
                <p className="text-sm font-medium">{voucher.voucherDate}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">制单人</p>
                <p className="text-sm font-medium">{voucher.preparedBy}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">审核人</p>
                <p className="text-sm font-medium">
                  {voucher.approvedBy || "待审核"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Voucher entries */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-24">科目编码</TableHead>
                  <TableHead className="w-32">科目名称</TableHead>
                  <TableHead>摘要</TableHead>
                  <TableHead className="w-28 text-right">借方金额</TableHead>
                  <TableHead className="w-28 text-right">贷方金额</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {voucher.entries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="text-sm font-mono">
                      {entry.accountCode}
                    </TableCell>
                    <TableCell className="text-sm font-medium">
                      {entry.accountName}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {entry.summary}
                    </TableCell>
                    <TableCell className="text-sm text-right">
                      {entry.debitAmount > 0
                        ? `¥${entry.debitAmount.toLocaleString()}`
                        : ""}
                    </TableCell>
                    <TableCell className="text-sm text-right">
                      {entry.creditAmount > 0
                        ? `¥${entry.creditAmount.toLocaleString()}`
                        : ""}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-muted/50 font-medium">
                  <TableCell colSpan={3} className="text-right">
                    合计
                  </TableCell>
                  <TableCell className="text-right">
                    ¥{voucher.debitAmount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    ¥{voucher.creditAmount.toLocaleString()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
