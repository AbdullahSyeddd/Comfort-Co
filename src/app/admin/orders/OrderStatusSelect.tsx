"use client";

import { useTransition } from "react";
import type { OrderStatus } from "@prisma/client";
import { updateOrderStatus } from "./actions";

const statuses: OrderStatus[] = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];

const statusStyles: Record<OrderStatus, string> = {
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  CONFIRMED: "bg-accent-50 text-accent-700 border-accent-200",
  SHIPPED: "bg-blue-50 text-blue-700 border-blue-200",
  DELIVERED: "bg-green-50 text-green-700 border-green-200",
  CANCELLED: "bg-red-50 text-red-700 border-red-200",
};

export default function OrderStatusSelect({
  orderId,
  status,
}: {
  orderId: number;
  status: OrderStatus;
}) {
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value as OrderStatus;
    startTransition(() => {
      updateOrderStatus(orderId, next);
    });
  };

  return (
    <select
      defaultValue={status}
      onChange={handleChange}
      disabled={isPending}
      className={`rounded-full border px-3 py-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent-100 disabled:opacity-60 ${statusStyles[status]}`}
    >
      {statuses.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
