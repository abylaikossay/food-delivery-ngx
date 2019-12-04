import {Category} from './category';

export class Meal {
  createdAt: string;
  deletedAt: string;
  updatedAt: string;
  id: number;
  category: Category;
  description: string;
  ingredients: string;
  isAddedBtn: boolean;
  isAddedToCart: boolean;
  price: number;
  quantity: number;
  totalPrice: number;
  tag: string;
  title: string;
  url: string;
}
