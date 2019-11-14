import {Meal} from './meal';
import {User} from './user';

export class Order {
  createdAt: string;
  deletedAt: string;
  updatedAt: string;
  id: number;
  meals: [Meal];
  overallPrice: number;
  overallQuantity: number;
  paymentType: string;
  status: number;
  user: User;
}
