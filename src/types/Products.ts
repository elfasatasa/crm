export interface IProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number; // сколько купил клиент (в заказе)
}
export interface IRemainder {
  id: number;
  name: string;
  quantity: string; // сколько осталось в конце дня
}
export interface IOrder {
  id: number;
  products: IProduct[]; // купленные товары
  paymentType: "cash" | "terminal" | "click" | "payme" | "alif"; // можно расширить
 
}

export interface IDayReport {
  id: number;
  day: string;            // "28.11.2025"
  started: boolean;       // начат ли день
  orders: IOrder[];       // список всех заказов
  remainder: IRemainder[]; // остатки на складе
  closeDay: boolean;      // закрыт ли день
}
