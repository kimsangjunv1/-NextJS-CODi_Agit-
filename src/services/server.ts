// src/services/client.ts
type RequestOptions = Omit<RequestInit, "body"> & {
    body?: any;
};

export const serverFetch = async (url: string, options: RequestOptions = {}) => {
    const baseUrl = process.env.NEXTAUTH_URL

    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
    };

    // 예: 토큰이 필요하면 붙이기
    // const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    // if (token) {
    //     headers["Authorization"] = `Bearer ${token}`;
    // }
    console.log("baseUrl + url", url)
    const response = await fetch(
        // baseUrl + url,
        url,
        {
            ...options,
            headers,
            body: options.body ? JSON.stringify(options.body) : undefined,
        }
    );
    console.log("response", response)

    if (!response.ok) {
        // 공통 에러 처리
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "API 요청 실패");
    }

    return response.json();
};