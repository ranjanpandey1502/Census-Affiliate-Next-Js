export const APP_PATHS = {
    // auth
    signInPage: "/login",
    singUpPage: "/register",
    forgotPassword: "/forgot-password",
    resetPassword: (token: string) => `/reset-password/${token}`,
    // admin and affiliate
    dashboard: "/dashboard",
    profile: "/profile",
    contactLeads: "/contact-leads",
    // admin only
    users: "/users",
    affiliateReport: (affiliateId: number) => `/affiliate-report/${affiliateId}`,
    manageUser: (id: number|string) => `/user/${id}`,
    wordPressUsers: "/wp-registered-users",
    // affiliate only
    affiliateLinks: '/affiliate-links',
    commissionPage: "/commission"

}