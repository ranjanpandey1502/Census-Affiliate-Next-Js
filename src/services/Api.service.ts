import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
} from "axios";
import LocalStorageService from "./LocalStorage.service";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/utils/config";
import type {
  UpdateProfileResType,
  GeneralResType,
  SignInResType,
  SignUpResType,
  UsersResType,
  AffiliateLinksResType,
  AffiliateLinkCreateType,
  RegisteredUserResType,
  ContactMessageResType,
  AffiliateDashboardAnalyticsResType,
  StatisticsResType,
  CountriesVisitResType,
  GetUserProfileResType,
  UpdateUserStatusResType,
  LeadsMetricsResType,
  CommissionLogResType,
  CommissionMetricResType,
} from "@/types/api-response.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const TOKEN_INVALID_CODE = 403;
class APIService {
  isRefreshing = false;
  refreshSubscribers: ((token: string) => void)[] = [];
  serverAPI: AxiosInstance = axios.create({
    baseURL: API_URL,
  });
  constructor() {
    this.serverAPI.interceptors.request.use((config) => {
      const token = LocalStorageService.getStorageItem(ACCESS_TOKEN_KEY);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });

    // Handle expired token
    this.serverAPI.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & {
          _retry?: boolean;
        };
        if (
          error.response?.status === TOKEN_INVALID_CODE &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          if (!this.isRefreshing) {
            this.isRefreshing = true;

            try {
              const res = await this.refreshToken();
              const newToken = res?.data?.accessToken;

              if (newToken) {
                this.onRefreshed(newToken);
              }

              this.isRefreshing = false;
            } catch (refreshError) {
              this.isRefreshing = false;
              LocalStorageService.removeStorageItem(ACCESS_TOKEN_KEY);
              LocalStorageService.removeStorageItem(REFRESH_TOKEN_KEY);
              window.location.href = "/login";
              return Promise.reject(refreshError);
            }
          }

          return new Promise((resolve) => {
            this.subscribeTokenRefresh((token: string) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }

              resolve(this.serverAPI(originalRequest));
            });
          });
        }

        return Promise.reject(error);
      },
    );
  }
  subscribeTokenRefresh(cb: (token: string) => void) {
    this.refreshSubscribers.push(cb);
  }
  onRefreshed(token: string) {
    this.refreshSubscribers.forEach((cb) => cb(token));
    this.refreshSubscribers = [];
  }

  // auth routes
  loginUser = async (email: string, password: string) => {
    const res = await this.serverAPI.post<SignInResType>("/api/login", {
      email,
      password,
    });
    return res;
  };

  registerUser = async (
    email: string,
    username: string,
    first_name: string,
    last_name: string,
    password: string,
    phone_no?: string,
    referred?: string,
  ) => {
    const res = await this.serverAPI.post<SignUpResType>("/api/signup", {
      email,
      username,
      first_name,
      last_name,
      password,
      phone_no,
      referred,
    });
    return res;
  };

  getUsers = async (page: number, limit: number) => {
    const res = await this.serverAPI.get<UsersResType>("/api/users", {
      params: {
        page,
        limit,
      },
    });
    return res;
  };
  userNameExists = async (username: string) => {
    const res = await this.serverAPI.post<GeneralResType>(
      "/api/username-exists",
      {
        username,
      },
    );
    return res;
  };

  forgotPassword = async (email: string) => {
    const res = await this.serverAPI.post<GeneralResType>(
      "/api/forgot-password",
      {
        email,
      },
    );
    return res;
  };

  resetPassword = async (password: string, token: string) => {
    const res = await this.serverAPI.post<GeneralResType>(
      "/api/reset-password",
      {
        password,
        token,
      },
    );
    return res;
  };

  //

  activateAffiliateAccount = async (affiliateId: number) => {
    const res = await this.serverAPI.patch<GeneralResType>(
      `/api/activate-affiliate/${affiliateId}`,
    );
    return res;
  };

  updateProfile = async (
    first_name: string,
    last_name: string,
    contact_no?: string,
  ) => {
    const res = await this.serverAPI.put<UpdateProfileResType>("/api/profile", {
      first_name,
      last_name,
      contact_no,
    });

    return res;
  };

  updatePassword = async (
    current_password: string,
    new_password: string,
    confirm_password: string,
  ) => {
    const res = await this.serverAPI.put("/api/change-password", {
      current_password,
      new_password,
      confirm_password,
    });
    return res;
  };

  getAffiliateCommissionAdmin = async (
    affiliate_id: number,
    page: number,
    limit: number,
  ) => {
    const res = await this.serverAPI.get<CommissionLogResType>(
      `/api/affiliate-commission/${affiliate_id}`,
      {
        params: {
          page,
          limit,
        },
      },
    );
    return res;
  };
  getCommissionMetrics = async () => {
    const res = await this.serverAPI<CommissionMetricResType>(
      "/api/commission-metrics",
    );
    return res;
  };

  // Affiliate Links
  getAffiliateLinks = async (page: number, limit: number) => {
    const res = await this.serverAPI.get<AffiliateLinksResType>(
      "/api/affiliate-link",
      {
        params: {
          page,
          limit,
        },
      },
    );
    return res;
  };

  createAffiliateLink = async (
    affiliate_slug: string,
    description?: string | null,
  ) => {
    const res = await this.serverAPI.post<AffiliateLinkCreateType>(
      "/api/affiliate-link",
      {
        affiliate_slug,
        description,
      },
    );
    return res;
  };

  getContactLeads = async (page: number, limit: number) => {
    const res = await this.serverAPI.get<ContactMessageResType>(
      "/api/affiliate-contact-leads",
      {
        params: {
          page,
          limit,
        },
      },
    );
    return res;
  };

  getRegisteredUsers = async (page: number, limit: number) => {
    const res = await this.serverAPI.get<RegisteredUserResType>(
      "/api/registered-users",
      {
        params: {
          page,
          limit,
        },
      },
    );
    return res;
  };

  getAffiliateCommission = async (page: number, limit: number) => {
    const res = await this.serverAPI<CommissionLogResType>(
      "/api/commission-report",
      {
        params: {
          page,
          limit,
        },
      },
    );
    return res;
  };

  // admin

  getContactMessages = async (page: number, limit: number) => {
    const res = await this.serverAPI.get<ContactMessageResType>(
      "/api/contact-message",
      {
        params: {
          page,
          limit,
        },
      },
    );
    return res;
  };

  getAffiliateRegisteredUsers = async (page: number, limit: number) => {
    const res = await this.serverAPI.get<RegisteredUserResType>(
      "/api/affiliate-registered-users",
      {
        params: {
          page,
          limit,
        },
      },
    );
    return res;
  };
  // dashboard apis
  // affiliate
  getDashboardMetrics = async () => {
    const res = await this.serverAPI.get<AffiliateDashboardAnalyticsResType>(
      "/api/affiliate-dashboard-metric",
    );
    return res;
  };
  getStatistics = async (start: Date, end: Date) => {
    const res = await this.serverAPI.get<StatisticsResType>(
      "/api/statistics-metric",
      {
        params: {
          startDate: start,
          endDate: end,
        },
      },
    );
    return res;
  };

  getCountriesVisit = async () => {
    const res = await this.serverAPI.get<CountriesVisitResType>(
      "/api/affiliate-country-visit",
    );
    return res;
  };
  getAffiliateLeadsMetrics = async () => {
    const res = await this.serverAPI.get<LeadsMetricsResType>(
      "/api/affiliate-leads-metrics",
    );
    return res;
  };

  getAdminCommissionMetrics = async () => {
    const res = await this.serverAPI<CommissionMetricResType>(
      "/api/commission-metrics-admin",
    );
    return res;
  };

  // admin
  getAdminDashboardMetrics = async () => {
    const res = await this.serverAPI.get<AffiliateDashboardAnalyticsResType>(
      "/api/admin-dashboard-metric",
    );
    return res;
  };
  getAdminStatistics = async (start: Date, end: Date) => {
    const res = await this.serverAPI.get<StatisticsResType>(
      "/api/admin-statistics-metric",
      {
        params: {
          startDate: start,
          endDate: end,
        },
      },
    );
    return res;
  };

  getAdminCountriesVisit = async () => {
    const res = await this.serverAPI.get<CountriesVisitResType>(
      "/api/admin-country-visit",
    );
    return res;
  };
  getAdminLeadsMetrics = async () => {
    const res = await this.serverAPI.get<LeadsMetricsResType>(
      "/api/admin-leads-metrics",
    );
    return res;
  };
  getAffiliateLeadsMetricsForAdmin = async (id: number) =>{
    const res = await this.serverAPI.get<LeadsMetricsResType>(
      `/api/admin-leads-metrics/${id}`,
    );
    return res
  }

  getUser = async (id: number) => {
    const res = await this.serverAPI.get<GetUserProfileResType>(
      `/api/user/${id}`,
    );
    return res;
  };

  updateUserStatus = async (user_id: number, status: string) => {
    const res = await this.serverAPI.post<UpdateUserStatusResType>(
      `/api/change-status`,
      {
        user_id,
        status,
      },
    );
    return res;
  };

  getAffiliateDashboardMetricsForAdmin = async (affiliate_id: number) => {
    const res = await this.serverAPI.get<AffiliateDashboardAnalyticsResType>(
      `/api/affiliate-dashboard-metric-admin/${affiliate_id}`,
    );
    return res;
  };

  refreshToken = async () => {
    const refreshToken = LocalStorageService.getStorageItem(REFRESH_TOKEN_KEY);
    if (!refreshToken) return;
    try {
      const res = await this.serverAPI.post("/api/refresh", {
        refreshToken,
      });
      LocalStorageService.setStorageItem(
        ACCESS_TOKEN_KEY,
        res.data.accessToken,
      );
      return res;
    } catch (error) {
      console.trace(error);
    }
  };
}

const ApiService = new APIService();
export default ApiService;
