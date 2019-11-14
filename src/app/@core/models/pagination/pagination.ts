import {Pageable} from './pageable';
import {Sort} from './sort';

export class Pagination<T> {

  content: T [];
  pageable: Pageable;
  totalElements: number;
  last: boolean;
  totalPages: number;
  size: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;

}
