export const QUERY_KEYS_LIST = {
    USERS: "users",
    USER_DETAIL: (id: string) => ["user", id],
    PRODUCTS: "products",
    PRODUCT_DETAIL: (id: string) => ["product", id],
};