// Dashboard Chart Types
export type DashboardMetricType = {
  registeredUser: {
    total: number;
    changePercentage: number;
  };
  contactMessage: {
    total: number;
    changePercentage: number;
  };
};

export type MonthlyVisitCountType = {
  data: Array<number>;
};

export type LineGraphStatisticsCartType = Array<{
  name: string;
  data: Array<number>;
}>;

export type CountriesVisitType = {
  _count: {id: number}, ip_country_code: string | null
}