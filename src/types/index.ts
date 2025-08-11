export interface Product {
  id: string;
  nombre: string;
  precio: number;
  stock: number;
  marca: string;
  categoria: string;
  descripcionCorta: string;
  descripcionLarga: string;
  envioSinCargo: boolean;
  edadDesde: number;
  edadHasta: number;
  foto: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export interface ProductFormData {
  nombre: string;
  precio: string;
  stock: string;
  marca: string;
  categoria: string;
  descripcionCorta: string;
  descripcionLarga: string;
  envioSinCargo: boolean;
  edadDesde: string;
  edadHasta: string;
  foto: string;
}

export interface ContactFormData {
  nombre: string;
  email: string;
  comentarios: string;
}

export interface ValidationErrors {
  [key: string]: string;
}
