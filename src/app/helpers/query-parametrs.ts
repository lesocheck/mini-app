export interface IQueryParameters {
  offset: number;
  limit: number;
  sortBy: string;
  isAscending?: boolean;
}
export function getQueryParametersAPIContract(qp: IQueryParameters) {
  const orderBy = qp.isAscending ? `${qp.sortBy} asc` : `${qp.sortBy} desc`;
  return `_limit=${qp.limit}&_sort=${qp.sortBy}&_order=${orderBy}&_start=${qp.offset}`;
}
