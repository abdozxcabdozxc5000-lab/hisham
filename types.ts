export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  unit?: string; // e.g., "لفة", "علبة" if needed, though often part of name
}

export interface HeaderProps {
  onPrint: () => void;
}
