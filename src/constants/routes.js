export const ROUTES = {
  USER: {
    HOME: "/",
    PRODUCT_LIST: "/products",
    PRODUCT_DETAIL: "/products/:id",
    CART: "/cart",
    CHECKOUT: "/checkout",
    // profile
    PROFILE: "/profile",
    USER_INFO: "/profile/user-info",
    ORDER_HISTORY: "/profile/order-history",
    FAVORITE_PRODUCTS: "/profile/favorite-products",
    CHANGE_PASSWORD: "/profile/change-password",
  },
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    PRODUCT_MANAGER: "/admin/products",
    CREATE_PRODUCT: "/admin/products/create",
    UPDATE_PRODUCT: "/admin/products/:id/update",
  },
  LOGIN: "/login",
  REGISTER: "/register",
};
