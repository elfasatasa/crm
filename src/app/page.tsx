'use client';

import { useMemo, useState } from "react";
import $api from "@/hooks/api";

/* ===== TYPES ===== */
export interface IProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export interface IRemainder {
  id: number;
  name: string;
  quantity: string;
}

export interface IOrder {
  id: number;
  products: IProduct[];
  paymentType: "cash" | "terminal" | "click" | "payme" | "alif";
}

export interface IDayReport {
  id: number;
  day: string;
  started: boolean;
  orders: IOrder[];
  remainder: IRemainder[];
  closeDay: boolean;
}

/* ===== MOCK ===== */
const MOCK_PRODUCTS: IProduct[] = [
  { id: 1, name: "Bubble big banana", category: "Bubble big", price: 35000, quantity: 0 },
  { id: 2, name: "Bubble big mango", category: "Bubble big", price: 35000, quantity: 0 },
  { id: 3, name: "Bubble small banana", category: "Bubble small", price: 25000, quantity: 0 },
  { id: 4, name: "Bubble small mango", category: "Bubble small", price: 25000, quantity: 0 },
];

/* ===== PAGE ===== */
export default function HomePage() {
  const [tab, setTab] = useState<"sell" | "remainder" | "report">("sell");
  const [openedCategory, setOpenedCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<IProduct[]>(MOCK_PRODUCTS);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [remainders, setRemainders] = useState<IRemainder[]>([]);
  const [paymentType, setPaymentType] = useState<IOrder["paymentType"] | "">("");

  /* ===== GROUP BY CATEGORY ===== */
  const productsByCategory = useMemo(() => {
    return products.reduce<Record<string, IProduct[]>>((acc, p) => {
      if (!acc[p.category]) acc[p.category] = [];
      acc[p.category].push(p);
      return acc;
    }, {});
  }, [products]);

  /* ===== TOTAL ===== */
  const totalPrice = useMemo(() => {
    return products.reduce((s, p) => s + p.price * p.quantity, 0);
  }, [products]);

  /* ===== ACTIONS ===== */
  const changeQty = (id: number, delta: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, quantity: Math.max(0, p.quantity + delta) }
          : p
      )
    );
  };

  const confirmOrder = () => {
    if (!paymentType || totalPrice === 0) return;

    setOrders((prev) => [
      ...prev,
      {
        id: Date.now(),
        paymentType,
        products: products.filter((p) => p.quantity > 0),
      },
    ]);

    setProducts((prev) => prev.map((p) => ({ ...p, quantity: 0 })));
    setPaymentType("");
  };

  /* ===== REPORT ===== */
  const reportProducts = useMemo(() => {
    const map: Record<string, number> = {};
    orders.forEach((o) =>
      o.products.forEach((p) => {
        map[p.name] = (map[p.name] || 0) + p.quantity;
      })
    );
    return map;
  }, [orders]);

  const reportMoney = useMemo(() => {
    const map: Record<string, number> = {};
    orders.forEach((o) => {
      const sum = o.products.reduce((s, p) => s + p.price * p.quantity, 0);
      map[o.paymentType] = (map[o.paymentType] || 0) + sum;
    });
    return map;
  }, [orders]);

  return (
    <main>
      {/* TOP TABS */}
      <div className="container" style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {["sell", "remainder", "report"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t as any)}
            style={{
              flex: 1,
              padding: 10,
              background: tab === t ? "#2a2a2a" : "#1a1a1a",
              borderRadius: 6,
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ===== SELL ===== */}
      {tab === "sell" && (
        <div className="container" style={{ paddingBottom: 90 }}>
          {Object.entries(productsByCategory).map(([cat, items]) => {
            const open = openedCategory === cat;

            return (
              <div key={cat} style={{ marginBottom: 14 }}>
                <button
                  onClick={() => setOpenedCategory(open ? null : cat)}
                  style={{
                    width: "100%",
                    padding: 14,
                    background: "#2a2a2a",
                    borderRadius: 8,
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 16,
                  }}
                >
                  <span>{cat}</span>
                  <span>{open ? "−" : "+"}</span>
                </button>

                {open && (
                  <div>
                    {items.map((p) => (
                      <div
                        key={p.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "10px 8px",
                          borderBottom: "1px solid #333",
                        }}
                      >
                        <div>
                          <div>{p.name}</div>
                          <small>{p.price.toLocaleString()}</small>
                        </div>

                        <div style={{ display: "flex", gap: 12 }}>
                          <button onClick={() => changeQty(p.id, -1)}>−</button>
                          <span>{p.quantity}</span>
                          <button onClick={() => changeQty(p.id, 1)}>+</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* FIXED BOTTOM */}
          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              background: "#141414",
              borderTop: "1px solid #333",
              padding: 10,
              display: "flex",
              gap: 8,
            }}
          >
            <strong style={{ minWidth: 80 }}>
              {totalPrice.toLocaleString()}
            </strong>

            <select
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value as any)}
              style={{
                flex: 1,
                padding: 8,
                background: "#2a2a2a",
                borderRadius: 6,
              }}
            >
              <option value="">payment</option>
              <option value="cash">cash</option>
              <option value="terminal">terminal</option>
              <option value="click">click</option>
              <option value="payme">payme</option>
              <option value="alif">alif</option>
            </select>

            <button
              onClick={confirmOrder}
              style={{
                padding: "8px 14px",
                background: "#4caf50",
                borderRadius: 6,
                color: "#000",
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* ===== REMAINDER ===== */}
      {tab === "remainder" && (
        <div className="container">
          {products.map((p) => (
            <div key={p.id} style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              <span style={{ flex: 1 }}>{p.name}</span>
              <input
                placeholder="остаток"
                onChange={(e) =>
                  setRemainders((prev) => [
                    ...prev.filter((r) => r.id !== p.id),
                    { id: p.id, name: p.name, quantity: e.target.value },
                  ])
                }
                style={{ background: "#2a2a2a", padding: 6, borderRadius: 6 }}
              />
            </div>
          ))}
        </div>
      )}

      {/* ===== REPORT ===== */}
      {tab === "report" && (
        <div className="container">
          <h4>Products</h4>
          {Object.entries(reportProducts).map(([k, v]) => (
            <div key={k}>{k} : {v}</div>
          ))}

          <h4 style={{ marginTop: 16 }}>Money</h4>
          {Object.entries(reportMoney).map(([k, v]) => (
            <div key={k}>{k} : {v.toLocaleString()}</div>
          ))}
        </div>
      )}
    </main>
  );
}
