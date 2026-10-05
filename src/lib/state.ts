import { writable, derived } from "svelte/store";
import { browser } from "$app/environment";

export const isNavOpen = writable(false);
// export const vpWidth = writable(0);
export const vpb = writable(true);

export interface OrderTrayItem {
  productTitle: string;
  // e.g. "250gm" — matches the same normalized key used for price/image overrides.
  variantLabel: string;
  price: number;
  qty: number;
}

const TRAY_STORAGE_KEY = "charcha-order-tray";

function loadTray(): OrderTrayItem[] {
  if (!browser) return [];
  try {
    const raw = localStorage.getItem(TRAY_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTray(items: OrderTrayItem[]) {
  if (!browser) return;
  try {
    localStorage.setItem(TRAY_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // localStorage unavailable (private browsing, quota) — tray just won't persist
  }
}

function createOrderTray() {
  const { subscribe, update, set } = writable<OrderTrayItem[]>(loadTray());

  function matches(a: OrderTrayItem, productTitle: string, variantLabel: string) {
    return a.productTitle === productTitle && a.variantLabel === variantLabel;
  }

  return {
    subscribe,
    add(item: Omit<OrderTrayItem, "qty">, qty = 1) {
      update((items) => {
        const idx = items.findIndex((i) => matches(i, item.productTitle, item.variantLabel));
        const next =
          idx >= 0
            ? items.map((i, j) => (j === idx ? { ...i, qty: i.qty + qty } : i))
            : [...items, { ...item, qty }];
        saveTray(next);
        return next;
      });
    },
    setQty(productTitle: string, variantLabel: string, qty: number) {
      update((items) => {
        const next =
          qty <= 0
            ? items.filter((i) => !matches(i, productTitle, variantLabel))
            : items.map((i) => (matches(i, productTitle, variantLabel) ? { ...i, qty } : i));
        saveTray(next);
        return next;
      });
    },
    remove(productTitle: string, variantLabel: string) {
      update((items) => {
        const next = items.filter((i) => !matches(i, productTitle, variantLabel));
        saveTray(next);
        return next;
      });
    },
    clear() {
      saveTray([]);
      set([]);
    },
  };
}

export const orderTray = createOrderTray();
export const isTrayOpen = writable(false);
export const orderTrayCount = derived(orderTray, (items) => items.reduce((sum, i) => sum + i.qty, 0));
export const orderTrayTotal = derived(orderTray, (items) => items.reduce((sum, i) => sum + i.qty * i.price, 0));
