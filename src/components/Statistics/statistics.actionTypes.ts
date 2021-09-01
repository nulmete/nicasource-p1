export const STATISTICS_LOADING = "STATISTICS_LOADING";
export const STATISTICS_ERROR = "STATISTICS_ERROR";
export const STATISTICS_SUCCESS = "STATISTICS_SUCCESS";

type Cases = {
  new: string;
  active: number;
  critical: number;
  recovered: number;
  "1M_pop": string;
  total: number;
};

type Deaths = {
  new: string;
  "1M_pop": string;
  total: number;
};

type Tests = {
  "1M_pop": string;
  total: number;
};

export type Statistic = {
  continent?: string;
  country?: string;
  population?: number;
  cases?: Cases;
  deaths?: Deaths;
  tests?: Tests;
  day?: string;
  time?: string;
};

export type CountryError = {
  country: string;
};

export type StatisticsResponseError = CountryError | [];

export type StatisticsResponse = {
  errors: StatisticsResponseError;
  response: Statistic[];
};

interface StatisticsLoading {
  type: typeof STATISTICS_LOADING;
}

interface StatisticsError {
  type: typeof STATISTICS_ERROR;
  payload: StatisticsResponse;
}

interface StatisticsSuccess {
  type: typeof STATISTICS_SUCCESS;
  payload: StatisticsResponse;
}

export type StatisticsDispatchTypes =
  | StatisticsLoading
  | StatisticsError
  | StatisticsSuccess;
