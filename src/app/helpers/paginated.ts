import {IQueryParameters} from "./query-parametrs";

export class Paginated<T> {
  result: Array<T>;
  query: IQueryParameters;
  readonly totalRecords: number;
  constructor(query: IQueryParameters, payload: Array<T> = [], totalRecords: number) {
    this.query = query;
    this.result = payload;
    this.totalRecords = totalRecords;
  }
  mapTo<M>(mapper: (item: T) => M) {
    return new Paginated<M>(
      this.query,
      this.result.map(t => mapper(t)),
      this.totalRecords
    );
  }
}
