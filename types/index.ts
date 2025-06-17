export interface Product {
  id: number;
  name: string;
  sub: string;
  category: number;
  price: number;
  features: string;
  description: string;
  available: boolean;
  inventory: number;
  img: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface CartItem {
  id: number;
  quantity: number;
}

export interface StoreInfo {
  title: string;
  location: string;
  hours: string;
  address: string;
  illustration: string;
} 