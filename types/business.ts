export interface BusinessItem {
  id: string;
  name: string;
  type: 'product' | 'service' | 'other';
  description: string;
}

export interface BusinessInfo {
  name: string;
  description: string;
  items: BusinessItem[];
}