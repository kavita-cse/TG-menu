export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  icon: string;
  order: number;
  isActive: boolean;
}

export interface Dish {
  id: string;
  categoryId: string;
  name: string;
  price: number;
  description: string;
  fullDescription: string;
  ingredients: string[];
  preparationNote: string;
  tasteProfile: string;
  spiceLevel: 'mild' | 'medium' | 'spicy' | 'extra-spicy';
  isVeg: boolean;
  isPopular: boolean;
  isChefSpecial: boolean;
  isAvailable: boolean;
  prepTime: string;
  image: string;
  tags: string[];
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  category: 'food' | 'interior' | 'exterior' | 'dining';
}

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin';
}
