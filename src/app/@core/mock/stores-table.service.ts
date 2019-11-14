import { Injectable } from '@angular/core';
import { StoresTableData } from '../data/stores-table';

@Injectable()
export class StoresTableService extends StoresTableData {

  data = [{
    id: 1,
    address: 'мкр. Самал-2, 111',
    city: 'Алматы',
    partners: 'Dostyk Plaza\n' +
      'Smart Plaza' +
      'Паркинг\n' +
      'Viled\n' +
      'Test Partner\n' +
      'test',
  }, {
    id: 1,
    address: 'мкр. Самал-2, 111',
    city: 'Алматы',
    partners: 'Dostyk Plaza\n\n' +
      'Smart Plaza' +
      'Паркинг\n' +
      'Viled\n' +
      'Test Partner\n' +
      'test',
  },
  ];

  getData() {
    return this.data;
  }
}
