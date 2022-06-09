import {InventoryItem} from "./InventoryItem";

export interface ProductItem {
  id: string;
  gender: string;
  productKey: string;
  productType?: string;
  brand: string;
  title: string;
  description: string;
  price: number;
  covers: string[];
  inventory?: InventoryItem[];
}
