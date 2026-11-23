import React, { createContext, useContext, useState, useEffect } from 'react';
import { Category, Dish } from '../types';
import { categories as defaultCategories, dishes as defaultDishes } from '../data/menuData';

interface MenuContextType {
  categories: Category[];
  dishes: Dish[];
  setCategories: (cats: Category[]) => void;
  setDishes: (dishes: Dish[]) => void;
  getDishesByCategory: (categoryId: string) => Dish[];
  getDishById: (id: string) => Dish | undefined;
  getCategoryById: (id: string) => Category | undefined;
  searchDishes: (query: string) => Dish[];
  popularDishes: Dish[];
  chefSpecials: Dish[];
  addCategory: (cat: Category) => void;
  updateCategory: (cat: Category) => void;
  deleteCategory: (id: string) => void;
  addDish: (dish: Dish) => void;
  updateDish: (dish: Dish) => void;
  deleteDish: (id: string) => void;
}

const MenuContext = createContext<MenuContextType | null>(null);

const STORAGE_KEY_CATS = 'sk_categories';
const STORAGE_KEY_DISHES = 'sk_dishes';
// Bump this version when menuData.ts is updated — it clears stale localStorage
const DATA_VERSION = 'v3';

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const version = localStorage.getItem('sk_data_version');
      if (version !== DATA_VERSION) {
        localStorage.removeItem(STORAGE_KEY_CATS);
        localStorage.removeItem(STORAGE_KEY_DISHES);
        localStorage.setItem('sk_data_version', DATA_VERSION);
        return defaultCategories;
      }
      const saved = localStorage.getItem(STORAGE_KEY_CATS);
      return saved ? JSON.parse(saved) : defaultCategories;
    } catch { return defaultCategories; }
  });

  const [dishes, setDishes] = useState<Dish[]>(() => {
    try {
      const version = localStorage.getItem('sk_data_version');
      if (version !== DATA_VERSION) return defaultDishes;
      const saved = localStorage.getItem(STORAGE_KEY_DISHES);
      return saved ? JSON.parse(saved) : defaultDishes;
    } catch { return defaultDishes; }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CATS, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_DISHES, JSON.stringify(dishes));
  }, [dishes]);

  const getDishesByCategory = (categoryId: string) =>
    dishes.filter(d => d.categoryId === categoryId && d.isAvailable);

  const getDishById = (id: string) => dishes.find(d => d.id === id);

  const getCategoryById = (id: string) => categories.find(c => c.id === id);

  const searchDishes = (query: string) => {
    const q = query.toLowerCase();
    return dishes.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q) ||
      d.ingredients.some(i => i.toLowerCase().includes(q)) ||
      d.tags.some(t => t.toLowerCase().includes(q))
    );
  };

  const popularDishes = dishes.filter(d => d.isPopular && d.isAvailable).slice(0, 8);
  const chefSpecials = dishes.filter(d => d.isChefSpecial && d.isAvailable).slice(0, 6);

  const addCategory = (cat: Category) => setCategories(prev => [...prev, cat]);
  const updateCategory = (cat: Category) =>
    setCategories(prev => prev.map(c => c.id === cat.id ? cat : c));
  const deleteCategory = (id: string) =>
    setCategories(prev => prev.filter(c => c.id !== id));

  const addDish = (dish: Dish) => setDishes(prev => [...prev, dish]);
  const updateDish = (dish: Dish) =>
    setDishes(prev => prev.map(d => d.id === dish.id ? dish : d));
  const deleteDish = (id: string) =>
    setDishes(prev => prev.filter(d => d.id !== id));

  return (
    <MenuContext.Provider value={{
      categories, dishes, setCategories, setDishes,
      getDishesByCategory, getDishById, getCategoryById, searchDishes,
      popularDishes, chefSpecials,
      addCategory, updateCategory, deleteCategory,
      addDish, updateDish, deleteDish,
    }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error('useMenu must be used within MenuProvider');
  return ctx;
};
