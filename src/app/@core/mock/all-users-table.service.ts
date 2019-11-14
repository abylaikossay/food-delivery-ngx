import { Injectable } from '@angular/core';
import { AllUsersTableData } from '../data/all-users-table';

@Injectable()
export class AllUsersTableService extends AllUsersTableData {

  data = [{
    id: 1,
    phoneNumber: '+7(777)224-56-03',
    registerDate: '01.10.2019 15:34:07',
    firstName: 'Otto',
    gender: 'Мужской',
    brthDate: '25.06.2000',
    age: '19',
    city: 'Алматы',
    bonuses: '1000',
    group: 'Пользователь',
    platform: 'iOS',
  }, {
    id: 1,
    phoneNumber: '+7(777)224-56-03',
    registerDate: '01.10.2019 /n 15:34:07',
    firstName: 'Otto',
    gender: 'Мужской',
    brthDate: '25.06.2000',
    age: '19',
    city: 'Алматы',
    bonuses: '1000',
    group: 'Пользователь',
    platform: 'iOS',
  },
  ];

  getData() {
    return this.data;
  }
}
