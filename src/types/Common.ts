import { Literal } from "sequelize/types/utils";

export interface Sort {
  key: string;
  direction: 'ASC' | 'DESC';
}

export interface FilterAttributes {
  [key: string]: any;
  sort?: Sort;
}

export interface Criteria {
  where: { [key: string]: any };
  order: (string | Literal)[][];
}

export interface PaginationResponse<ResultType> {
  count: number;
  next: string | null;
  prev: string | null;
  results: ResultType[];
}
