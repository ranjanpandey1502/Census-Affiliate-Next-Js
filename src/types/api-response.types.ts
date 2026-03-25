import type {
  CountriesVisitType,
  DashboardMetricType,
  LineGraphStatisticsCartType,
  MonthlyVisitCountType,
} from "./dashboard.types";

export type SignUpResType = {
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  provider: string;
  role: string;
};

export type SignInResType = {
  success: true,
  access_token: string;
  refresh_token: string;
} | {
  success: false,
  msg: string,
  data: string
};

export type UserType = {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  id: number;
  provider: string;
  role: string;
  status: string;
  phone_no?: string;
};

export type UsersResType = {
  data: Array<UserType>;
  total: number;
  msg: string;
};

export type GetUserProfileResType = {
  data: UserType;
  msg: string;
};

export type UpdateUserStatusResType = {
  data: UserType;
  msg: string;
};

export type UpdateProfileResType = {
  msg: string;
  token: string;
};

export type AffiliateLinkType = {
  id: number;
  user_id: number;
  affiliate_slug: string;
  description?: string;
  is_active: string;
  createdAt: string;
  updatedAt: string;
};
export type AffiliateLinksResType = {
  msg: string;
  data: AffiliateLinkType[];
  total: number;
};

export type AffiliateLinkCreateType = {
  msg: string;
  data: AffiliateLinkType;
};

export type RegisteredUserType = {
  id: number;
  ip?: string;
  page: string;
  aff?: string;
  user_agent?: string;
  browser?: string;
  os?: string;
  device?: string;
  referrer?: string;
  ip_country?: string;
  ip_country_code?: string;
  language?: string;
  timestamp: string;
  first_name?: string;
  last_name?: string;
  email: string;
  username: string;
  user_id: number;
  createdAt: string;
  user: UserType;
};

export type RegisteredUserResType = {
  data: Array<RegisteredUserType>;
  total: number;
  msg: string;
};

export type ContactMessageType = {
  id: number;
  ip?: string;
  page: string;
  aff?: string;
  user_agent?: string;
  browser?: string;
  os?: string;
  device?: string;
  referrer?: string;
  ip_country?: string;
  ip_country_code?: string;
  language?: string;
  timestamp: string;
  createdAt: string;
  form_name?: string;
  name?: string;
  email?: string;
  contact_no?: string;
  message?: string;
  zoho_crm_id?: string;
  zoho_status?: string;
  user: UserType;
};

export type ContactMessageResType = {
  data: Array<ContactMessageType>;
  msg: string;
  total: number;
};

export type GeneralResType = {
  msg: string;
};

// dashboard
export type AffiliateDashboardAnalyticsResType = {
  msg: string;
  data: {
    metrics: DashboardMetricType;
    monthlyVisit: MonthlyVisitCountType;
  };
};

export type StatisticsResType = {
  msg: string;
  data: {
    visitLogs: LineGraphStatisticsCartType;
    contactMessages: LineGraphStatisticsCartType;
    registeredUsers: LineGraphStatisticsCartType;
  };
};

export type CountriesVisitResType = {
  msg: string;
  data: Array<CountriesVisitType>;
};

export type LeadsMetricsResType = {
  data: {
    completedThisMonth: number;
    completedThisWeek: number;
    completedToday: number;
    totalCompleted: number;
    totalRows: number;
  };
};
export type CommissionUser = {
  id: number;
  phone?: string;
  email?: string;
  affiliate_code: string;
  affiliate_user_id: number;
  createdAt: string;
  name: string;
  updatedAt: string;
};
export type CommissionLogType = {
  amount: number;
  commission_user_id?: number;
  commissionUser?: CommissionUser;
  createdAt: string;
  id: number;
  status: string;
  updatedAt: string;
};
export type CommissionLogResType = {
  msg: string;
  data: Array<CommissionLogType>;
  total: number;
};
export type CommissionMetricType = {
  affiliate_user_id: number;
  totalContacts: number;
  commission: {
    received: {
      amount: number;
      count: number;
    };
    pending: {
      amount: number;
      count: number;
    };
    thisMonth: {
      amount: number;
      count: number;
    };
    lastMonth: {
      amount: number;
      count: number;
    };
    monthlyChange: {
      amount: number;
      percentage: number;
      trend: string;
    };
  };
};
export type CommissionMetricResType = {
  msg: string;
  data: CommissionMetricType;
};
