"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShoppingCart,
  PackageSearch,
  Warehouse,
  Factory,
  Receipt,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  {
    id: "dashboard",
    name: "工作台",
    icon: LayoutDashboard,
    route: "/erp",
  },
  {
    id: "sales",
    name: "销售管理",
    icon: ShoppingCart,
    route: "/erp/sales",
  },
  {
    id: "purchase",
    name: "采购管理",
    icon: PackageSearch,
    route: "/erp/purchase",
  },
  {
    id: "inventory",
    name: "库存管理",
    icon: Warehouse,
    route: "/erp/inventory",
  },
  {
    id: "production",
    name: "生产管理",
    icon: Factory,
    route: "/erp/production",
  },
  {
    id: "finance",
    name: "财务管理",
    icon: Receipt,
    route: "/erp/finance",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "h-screen sticky top-0 border-r bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-200",
        collapsed ? "w-16" : "w-56"
      )}
    >
      {/* Logo */}
      <div className="h-14 flex items-center px-4 border-b border-sidebar-border">
        {!collapsed && (
          <Link href="/erp" className="flex items-center gap-2">
            <Factory className="h-6 w-6 text-sidebar-primary" />
            <span className="font-semibold text-sm">制造业 ERP</span>
          </Link>
        )}
        {collapsed && (
          <Link href="/erp" className="mx-auto">
            <Factory className="h-6 w-6 text-sidebar-primary" />
          </Link>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 space-y-1 px-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.route === "/erp"
              ? pathname === "/erp"
              : pathname.startsWith(item.route);

          return (
            <Link
              key={item.id}
              href={item.route}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-sidebar-border p-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center rounded-md py-2 text-sidebar-foreground/50 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>
    </aside>
  );
}
