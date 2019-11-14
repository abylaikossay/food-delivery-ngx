import { Injectable } from '@angular/core';
import { CategoriesTableData } from '../data/categories-table';

@Injectable()
export class CategoriesTableService extends CategoriesTableData {

  data = [{
    id: 1,
    priority: 0,
    name: 'Обувь',
    parrentCategory: 'Товары',
    icon: '-',
  }, {
    id: 2,
    priority: 0,
    name: 'Услуги',
    parrentCategory: '-',
    icon: '-',
  },
  ];

  getData() {
    return this.data;
  }
}
