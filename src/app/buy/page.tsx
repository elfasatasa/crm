// OrdersPage.tsx
'use client';

import React from "react";

export default function OrdersPage() {
  const order = {
    item: "Premium Subscription",
    amount: 21.63,
    currency: "$",
    date: "2025-12-31"
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-xl font-bold text-gray-800">Order Details</h1>
      <div className="flex justify-between">
        <span className="text-gray-600">Item:</span>
        <span className="font-semibold">{order.item}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Amount:</span>
        <span className="font-semibold">{order.amount} {order.currency}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Date:</span>
        <span className="font-semibold">{order.date}</span>
      </div>
    </div>
  );
}
